import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

export const AuthMiddleware = {
  /**
   * Middleware function to check for a valid token in the request.
   * If no token is found in the request query or body, it responds with a JSON object { notallowed: true }.
   * If an empty token is found, it also responds with a JSON object { notallowed: true }.
   * If a valid user is found with the provided token, it calls the next middleware function.
   * Otherwise, it responds with a JSON object { notallowed: true }.
   *
   * @param {Request} req - The Express Request object.
   * @param {Response} res - The Express Response object.
   * @param {NextFunction} next - The Express NextFunction object.
   */
  private: async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.token && !req.body.token) {
      res.json({ notallowed: true });
      return;
    }

    const token = req.query.token ? req.query.token : req.body.token;

    if (token === "") {
      res.json({ notallowed: true });
      return;
    }

    const user = await User.findOne({ token });
    if (!user) {
      res.json({ notallowed: true });
      return;
    }

    next();
  },
};
