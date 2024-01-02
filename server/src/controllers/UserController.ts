import { Request, Response } from "express";

import { State } from "../models/State";
import { User } from "../models/User";
import { Ad } from "../models/Ad";
import mongoose, { PipelineStage } from "mongoose";
import { matchedData, validationResult } from "express-validator";
import bcrypt from "bcrypt";

interface EditMeBody {
  name?: string;
  email?: string;
  idState?: string;
  passwordHash?: string;
}

export const UserController = {
  getStates: async (req: Request, res: Response) => {
    const states = await State.find();
    res.json({ states });
  },

  /**
   * Retrieves user information and associated ads.
   * @param req - The request object.
   * @param res - The response object.
   * @returns {Promise<void>}
   */
  info: async (req: Request, res: Response): Promise<void> => {
    const token = req.query.token ? req.query.token : req.body.token;
    const user = await User.findOne({ token }, "-passwordHash -token -__v");
    const state = await State.findById(user.idState);

    // Search Ad with aggregate of categories
    const request: PipelineStage[] = [
      {
        $match: {
          idUser: user._id,
        },
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
        $project: {
          title: 1,
          price: 1,
          priceNegotiable: 1,
          description: 1,
          views: 1,
          status: 1,
          idCategory: 1,
          idUser: 1,
          category: "$category.slug",
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ];

    const ads = await Ad.aggregate(request).exec();

    res.json({
      user: {
        ...user.toJSON(),
        state: state.name,
      },
      ads,
    });
  },

  /**
   * Edit the user's information based on the request body.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>}
   */
  editMe: async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() });
      return;
    }

    const matchedBody = matchedData(req);

    const { name, email, idState, password } = matchedBody;

    const token = req.query.token ? req.query.token : req.body.token;

    const data: EditMeBody = {};

    if (name) data.name = name;

    if (email) {
      // Check if email already exists
      const otherUser = await User.findOne({
        email: email,
        _id: { $ne: req.body.user._id },
      });

      if (otherUser) {
        res.json({ error: "E-mail já cadastrado." });
        return;
      }

      data.email = email;
    }

    if (idState) {
      // Check if the state is a valid ObjectId.
      if (!mongoose.Types.ObjectId.isValid(idState)) {
        res.json({
          error: { state: { msg: "Código de estado inválido" } },
        });
        return;
      }

      // Check if the state exists.
      const stateCheck = await State.findById(idState).exec();
      if (!stateCheck) {
        res.json({
          error: { state: { msg: "Estado não existe" } },
        });
        return;
      }

      data.idState = idState;
    }

    if (password) {
      // Hash the password.
      data.passwordHash = await bcrypt.hash(password, 10);
    }

    const userTest = await User.find({ token: token }).exec();
    console.log(userTest)

    try {
      await User.findOneAndUpdate({ token }, data);
    } catch (e) {
      res.json({ error: "Ocorreu um erro ao atualizar o usuário." });
      return;
    }

    res.json({ status: true });
  },
};
