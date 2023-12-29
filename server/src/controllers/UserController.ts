import { Request, Response } from "express";

import State from "../models/State";
import User from "../models/User";

export const UserController = {
  getStates: async (req: Request, res: Response) => {
    const states = await State.find();
    res.json({ states });
  },
  info: async (req: Request, res: Response) => {
    const user = await User.findById(req.body.user._id);
    res.json({ user });
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
