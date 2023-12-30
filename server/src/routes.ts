import express = require("express");
import { AuthController } from "./controllers/AuthController";
import { UserController } from "./controllers/UserController";
import { AdController } from "./controllers/AdController";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { AuthValidator } from "./validators/AuthValidator";

const router = express.Router();

router.get("/ping", (req, res) => {
  res.send("pong");
});

// Auth
router.post("/auth/login", AuthValidator.login, AuthController.login);
router.post("/auth/register", AuthValidator.register, AuthController.register);

// User
router.get("/states", AuthMiddleware.private, UserController.getStates);
router.get("/user/me", AuthMiddleware.private, UserController.info);
router.put("/user/me", AuthMiddleware.private, UserController.edit);

// Ads
router.get("/ad/categories", AdController.getCategories);
router.post("/ad/add", AuthMiddleware.private, AdController.add);
router.get("/ad/list", AdController.getList);
router.get("/ad/item", AdController.getItem);
router.post("/ad/:id", AuthMiddleware.private, AdController.edit);

export default router;