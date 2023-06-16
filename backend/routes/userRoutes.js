import express from "express";

import { testapi } from "../controllers/userController.js";

const router = express.Router();

router.get("/", testapi);

export default router;
