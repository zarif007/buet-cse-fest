import express from "express";
const router = express.Router();

import { getHome } from "../../controllers/main.controller";

// import StudentRoute from "./student.route";


import { rateLimiter } from "../../middleware/rateLimiter";

/*   
    @route      ALL /api/v1/
    @detail     This is the main hit point for the API version 1
*/
router.get("/", getHome);

/*   
    @route      GET /api/v1/student/{route}
    @detail     This is every router hit point for the student endpoints
*/
// router.use("/student", rateLimiter, StudentRoute);


export default router;
