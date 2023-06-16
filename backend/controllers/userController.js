import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const testapi = (req, res) => {
  res.status(200).json({ message: "api is ok" });
};

//add user
export const adduser = async (req, res) => {
  const { name, pass } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedpw = await bcrypt.hash(pass, salt);

  const newUser = new user({
    name: name,
    pass: hashedpw,
  });

  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login user
export const login = async (req, res) => {
  const { name, pass } = req.body;

  const myKey = process.env.myKey;

  try {
    const existingUser = await user.findOne({ name });

    if (!existingUser) {
      res.status(404).json({ message: "username or password invalid" });
      return;
    } else {
      const isValid = await bcrypt.compare(pass, existingUser.pass);

      if (isValid) {
        const token = jwt.sign({ user: existingUser.name }, myKey);
        res.status(200).json({ token: token });
      } else {
        res.status(401).json({ message: "username or password invalid" });
      }
    }
  } catch (e) {
    res.status(500).json({ message: "something went wrong", error: e.message });
  }
};
