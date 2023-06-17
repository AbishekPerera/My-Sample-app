import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const testapi = (req, res) => {
  res.status(200).json({ message: "api is ok" });
};

//add user
export const adduser = async (req, res) => {
  const { name, pass } = req.body;
  const requser = req.requser;

  const salt = await bcrypt.genSalt(10);
  const hashedpw = await bcrypt.hash(pass, salt);

  //   console.log(requser);

  const newUser = new user({
    name: name,
    pass: hashedpw,
    createdby: requser.user,
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

//getall
export const getall = async (req, res) => {
  //   res.send("ela");

  try {
    const allUSers = await user.find();
    res.status(200).json(allUSers);
  } catch (e) {
    res.status(400).json({ message: "bad request" });
  }
};

export const getById = async (req, res) => {
  const id = req.params.id;

  try {
    const gotuser = await user.findById(id);
    res.status(200).json(gotuser);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export const updateUserById = async (req, res) => {
  const id = req.params.id;
  const requser = req.requser;
  const { name, pass } = req.body;

  try {
    let updatedUser;

    if (pass != null) {
      const salt = await bcrypt.genSalt(10);
      const hashedpw = await bcrypt.hash(pass, salt);

      updatedUser = await user.findByIdAndUpdate(id, {
        name,
        pass: hashedpw,
        updatedby: requser.user,
      });
    } else {
      updatedUser = await user.findByIdAndUpdate(id, {
        name,
        updatedby: requser.user,
      });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//delete user

export const deleteUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await user.findByIdAndDelete(id);

    res.status(200).json(deletedUser);
  } catch (e) {
    res.status(503).json({ message: e.message });
  }
};
