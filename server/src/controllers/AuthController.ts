import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { State } from "../models/State";

export const AuthController = {
  /**
   * Handles the login request.
   *
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {Promise<void>}
   */
  login: async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() });
      return;
    }

    // Data sanitized and validated.
    const data = matchedData(req);

    // Check if the user exists.
    const user = await User.findOne({
      email: data.email,
    });
    if (!user) {
      res.json({
        error: { email: { msg: "E-mail e/ou senha incorretos" } },
      });
      return;
    }

    // Check if the password is correct.
    const match = await bcrypt.compare(data.password, user.passwordHash);
    if (!match) {
      res.json({
        error: { email: { msg: "E-mail e/ou senha incorretos" } },
      });
      return;
    }

    // Generate a token.
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    // Update the user's token.
    await User.updateOne({ _id: user._id }, { token });

    res.json({ token });
  },

  /**
   * Registers a user.
   *
   * @param {Request} req - The request object containing user data.
   * @param {Response} res - The response object to send back the result.
   * @returns {Promise<void>}
   */
  register: async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() });
      return;
    }

    // Data sanitized and validated.
    const data = matchedData(req);

    // Check if the email is already in use.
    const anotherUser = await User.findOne({
      email: data.email,
    });
    if (anotherUser) {
      res.json({
        error: { email: { msg: "E-mail já existe" } },
      });
      return;
    }

    // Check if the state is a valid ObjectId.
    if (!mongoose.Types.ObjectId.isValid(data.state)) {
      res.json({
        error: { state: { msg: "Código de estado inválido" } },
      });
      return;
    }

    // Check if the state exists.
    const state = await State.findById(data.state);
    if (!state) {
      res.json({
        error: { state: { msg: "Estado não existe" } },
      });
      return;
    }

    // Hash the password.
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Generate a token.
    const payload = (Date.now() + Math.random()).toString();
    const token = await bcrypt.hash(payload, 10);

    // Create a new user.
    try {
      await User.create({
        name: data.name,
        email: data.email,
        passwordHash,
        token,
        state: data.state,
      });
    } catch (e) {
      res.json({
        error: { state: { msg: "Erro ao criar usuário" } },
      });
      return;
    }

    res.json({ token });
  },
};
