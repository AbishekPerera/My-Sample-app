import express from "express";
import jwt from "jsonwebtoken";

import {
  adduser,
  deleteUserById,
  getById,
  getall,
  login,
  testapi,
  updateUserById,
} from "../controllers/userController.js";

const router = express.Router();

//auth user midleware
const authuser = async (req, res, next) => {
  const token = req.headers.authorization;

  const myKey = process.env.myKey;

  if (!token) {
    res.status(401).json({ message: "token not found" });
    return;
  } else {
    try {
      const requser = jwt.verify(token, myKey);
      req.requser = requser;
      next();
    } catch (e) {
      res.status(401).json({ message: "unauthorized" });
      return;
    }
  }
};

router.get("/test", testapi);
router.post("/", authuser, adduser);
router.get("/", authuser, getall);
router.get("/:id", authuser, getById);
router.put("/:id", authuser, updateUserById);
router.delete("/:id", authuser, deleteUserById);
router.post("/login", login);

export default router;
