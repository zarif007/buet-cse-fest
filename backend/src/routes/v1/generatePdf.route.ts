import express from "express";

const router = express.Router();

import GeneratePdfController from "../../controllers/generatePdf.controller";

router
  .route("/")
  .post(GeneratePdfController.generatePdf);

// router
//   .route("/:id")

export default router;