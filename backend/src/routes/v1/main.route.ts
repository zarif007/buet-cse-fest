import express from "express";
const router = express.Router();

import { getHome } from "../../controllers/main.controller";

import GeneratePdfRoute from "./generatePdf.route";
import UserRoute from "./user.route";


import { rateLimiter } from "../../middleware/rateLimiter";

/*   
    @route      ALL /api/v1/
    @detail     This is the main hit point for the API version 1
*/
router.get("/", getHome);

/*   
    @route      GET /api/v1/generatepdf/{route}
    @detail     This is every router hit point for the generatepdf endpoints
*/
router.use("/generatepdf", rateLimiter, GeneratePdfRoute);

/*   
    @route      GET /api/v1/user/{route}
    @route      POST /api/v1/user/          {name,email}
    @detail     This is every router hit point for the user endpoints
*/
router.use("/user", rateLimiter, UserRoute);


export default router;
