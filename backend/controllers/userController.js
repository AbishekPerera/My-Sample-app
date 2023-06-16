import user from "../models/user.js";

export const testapi = (req, res) => {
  res.status(200).json({ message: "api is ok" });
};
