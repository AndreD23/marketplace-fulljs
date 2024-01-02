import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import jimp from "jimp";

import { Category, ICategory } from "../models/Category";
import { User } from "../models/User";
import { Ad, AdImage } from "../models/Ad";
import { matchedData, validationResult } from "express-validator";
import mongoose, { PipelineStage } from "mongoose";
import { ObjectId } from "mongodb";
import { BASE } from "../config";
import { State } from "../models/State";

const addImage = async (buffer: Buffer, categorySlug: string) => {
  const newName = `${uuid()}.jpg`;
  const year = new Date().getFullYear().toString();
  let month = (new Date().getMonth() + 1).toString();
  // Check month length
  if (month.length === 1) {
    month = `0${month}`;
  }
  const path = `uploads/images/${categorySlug}/${year}/${month}/${newName}`;
  const tmpImg = await jimp.read(buffer);
  tmpImg.cover(500, 500).quality(90).write(`./public/${path}`);
  return path;
};

const validMimeTypes = ["image/jpeg", "image/jpg", "image/png"];

interface AdFilters {
  status: boolean;
  title?: { $regex: string; $options: string };
  idCategory?: mongoose.Types.ObjectId;
  idState?: mongoose.Types.ObjectId;
}

export const AdController = {
  /**
   * Retrieves all categories from the database and returns them as a response.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   */
  getCategories: async (req: Request, res: Response) => {
    const cats = await Category.find();
    const categories: ICategory[] = [];

    for (const i in cats) {
      const c = cats[i].toObject();
      categories.push({
        ...c,
        img: `${BASE}/uploads/images/${c.slug}/${c.slug}.png`,
      });
    }

    res.json({ categories });
  },

  /**
   * Adds a new advertisement to the database.
   *
   * @param {Request} req - The request object received from the client.
   * @param {Response} res - The response object to send back to the client.
   */
  add: async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() });
      return;
    }

    const matchedBody = matchedData(req);

    let { title, price, priceNegotiable, description, idCategory } =
      matchedBody;

    const token = req.query.token ? req.query.token : req.body.token;

    const user = await User.findOne({ token }).exec();

    if (!user) {
      res.json({ error: "Token inválido" });
      return;
    }

    const category: ICategory = await Category.findById(idCategory).exec();
    if (!category) {
      res.json({ error: "Categoria inexistente" });
      return;
    }

    price = price ? price : 0;

    const adImages: AdImage[] = [];

    const images = req.files?.images;

    if (images) {
      // Single image
      if (!Array.isArray(images)) {
        // Check mime type
        if (!validMimeTypes.includes(images.mimetype)) {
          res.json({ error: "Arquivo não suportado" });
          return;
        }

        const url = await addImage(images.data, category.slug);
        adImages.push({ url, default: false });
      }

      // Multiple images
      if (Array.isArray(images)) {
        for (const image of images) {
          // Check mime type
          if (!validMimeTypes.includes(image.mimetype)) {
            res.json({ error: "Arquivo não suportado" });
            return;
          }

          const url = await addImage(image.data, category.slug);
          adImages.push({ url, default: false });
        }
      }
    }

    if (adImages.length > 0) {
      adImages[0].default = true;
    }

    const newAd = await Ad.create({
      idUser: user._id,
      idState: user.state,
      idCategory: idCategory,
      images: adImages,
      title,
      description: description || "",
      price,
      priceNegotiable: priceNegotiable ? Boolean(priceNegotiable) : false,
      views: 0,
      status: true,
      createdAt: new Date(),
    });

    res.json({ id: newAd._id });
  },

  /**
   * Retrieves a list of ads based on the provided filters.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   */
  getList: async (req: Request, res: Response): Promise<void> => {
    const { sort, limit = 8, offset = 0, q, idCategory, idState } = req.query;
    const filters: AdFilters = { status: true };

    const order = sort === "desc" ? -1 : 1;

    if (q) {
      filters.title = { $regex: q.toString(), $options: "i" };
    }

    if (idCategory) {
      if (!mongoose.Types.ObjectId.isValid(idCategory.toString())) {
        res.json({
          error: { state: { msg: "Código de categoria inválida" } },
        });
        return;
      }

      filters.idCategory = new ObjectId(idCategory.toString());
    }

    const request: PipelineStage[] = [
      {
        $match: filters,
      },
      {
        $lookup: {
          from: "users",
          localField: "idUser",
          foreignField: "_id",
          as: "adOwner",
        },
      },
      {
        $unwind: "$adOwner",
      },
      {
        $lookup: {
          from: "categories",
          localField: "idCategory",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          price: { $first: "$price" },
          priceNegotiable: { $first: "$priceNegotiable" },
          description: { $first: "$description" },
          views: { $first: "$views" },
          status: { $first: "$status" },
          idCategory: { $first: "$idCategory" },
          idUser: { $first: "$idUser" },
          category: { $first: "$category.slug" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          adOwner: { $first: "$adOwner" },
          images: { $first: "$images" },
        },
      },
      {
        $project: {
          title: 1,
          price: 1,
          priceNegotiable: 1,
          description: 1,
          views: 1,
          status: 1,
          idCategory: 1,
          idUser: 1,
          category: 1,
          createdAt: 1,
          updatedAt: 1,
          adOwner: {
            name: "$adOwner.name",
            email: "$adOwner.email",
            idState: "$adOwner.idState",
          },
          images: {
            $map: {
              input: "$images",
              as: "image",
              in: {
                url: {
                  $concat: [BASE, "/", "$$image.url"],
                },
                default: "$$image.default",
              },
            },
          },
          defaultImg: {
            $arrayElemAt: [
              {
                $map: {
                  input: {
                    $filter: {
                      input: "$images",
                      as: "img",
                      cond: { $eq: ["$$img.default", true] },
                    },
                  },
                  as: "img",
                  in: {
                    url: { $concat: [BASE, "/", "$$img.url"] },
                    default: "$$img.default",
                  },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $sort: {
          createdAt: order,
        },
      },
    ];

    if (idState) {
      if (!mongoose.Types.ObjectId.isValid(idState.toString())) {
        res.json({
          error: { state: { msg: "Código de estado inválido" } },
        });
        return;
      }

      request.push({
        $match: {
          "adOwner.idState": new ObjectId(idState.toString()),
        },
      });
    }

    const requestCount: PipelineStage[] = [...request];
    requestCount.push({
      $group: {
        _id: null,
        total: { $sum: 1 },
      },
    });

    const adsTotal = await Ad.aggregate(requestCount).exec();
    const total = adsTotal[0]?.total || 0;

    const adsData = await Ad.aggregate(request)
      .skip(Number(offset))
      .limit(Number(limit))
      .exec();

    res.json({ total, data: adsData });
  },

  /**
   * Retrieves an item by its ID and returns its data.
   *
   * @param {Request} req - The express request object.
   * @param {Response} res - The express response object.
   */
  getItem: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { other = null } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.json({ error: "Anúncio inexistente" });
      return;
    }

    const ad = await Ad.findById(id).exec();

    if (!ad) {
      res.json({ error: "Anúncio inexistente" });
      return;
    }

    ad.views++;
    await ad.save();

    const adData = ad.toObject();

    adData.images = adData.images.map((image: AdImage) => ({
      ...image,
      url: `${BASE}/${image.url}`,
    }));

    const user = await User.findById(adData.idUser)
      .select("name email idState")
      .exec();
    if (!user) {
      res.json({ error: "Usuário inexistente" });
      return;
    }

    adData.user = user;

    const category = await Category.findById(adData.idCategory).exec();
    if (!category) {
      res.json({ error: "Categoria inexistente" });
      return;
    }

    adData.category = category;

    const state = await State.findById(user.idState).exec();
    if (!state) {
      res.json({ error: "Estado inexistente" });
      return;
    }

    adData.state = state;

    if (other) {
      adData.otherAds = await Ad.find({
        idUser: adData.idUser,
        _id: { $ne: adData._id },
      })
        .limit(3)
        .exec();
    }

    res.json({ data: adData });
  },

  edit: async (req: Request, res: Response) => {},
};
