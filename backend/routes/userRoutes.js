import express from "express";

import { adduser, login, testapi } from "../controllers/userController.js";

const router = express.Router();

router.get("/", testapi);
router.post("/", adduser);
router.post("/login", login);

export default router;
