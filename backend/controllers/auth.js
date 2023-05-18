import AsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../models/User.js";

//register
export const register = AsyncHandler(async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400);
  }
});

//Login
export const Login = AsyncHandler(async (req, res) => {
  const {username, password} = req.body;
  try {
    const user = await User.findOne({ username});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordmatch = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordmatch) return res.status(401).json({message:"wrong password"});

    const { password: _, ...otherDetails } = user._doc;
    res.status(200).json(otherDetails);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
