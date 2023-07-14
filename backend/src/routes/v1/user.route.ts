import express from "express";

const router = express.Router();

import UserController from "../../controllers/user.controller";

router
  .route("/")
  .get(UserController.getUser)
  .post(UserController.addNewUser);


export default router;