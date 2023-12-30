import { Request, Response } from "express";

import State from "../models/State";
import { User } from "../models/User";
import Ad from "../models/Ad";
import { PipelineStage } from "mongoose";

export const UserController = {
  getStates: async (req: Request, res: Response) => {
    const states = await State.find();
    res.json({ states });
  },
  info: async (req: Request, res: Response) => {
    const token = req.query.token ? req.query.token : req.body.token;
    const user = await User.findOne({ token }, "-passwordHash -token -__v");
    const state = await State.findById(user.state);

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
  edit: async (req: Request, res: Response) => {
    const { name, email, state, password } = req.body;
    const data: any = {};

    if (name) data.name = name;
    if (email) data.email = email;
    if (state) data.state = state;
    if (password) data.password = password;

    await User.findOneAndUpdate({ _id: req.body.user._id }, data);

    res.json({ status: true });
  },
};
