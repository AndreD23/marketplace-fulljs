import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import jimp from "jimp";

import { Category, ICategory } from "../models/Category";
import { User } from "../models/User";
import { Ad, AdImage } from "../models/Ad";
import { matchedData, validationResult } from "express-validator";

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
        img: `${process.env.BASE_URL}/uploads/images/${c.slug}/${c.slug}.png`,
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

    let { title, price, priceNegotiable, description, idCategory, token } =
      matchedBody;

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
      state: user.state,
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
  getList: async (req: Request, res: Response) => {},
  getItem: async (req: Request, res: Response) => {},
  edit: async (req: Request, res: Response) => {},
};
