import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkIfExist } from "../helpers/helpers.js";

export const register = async (req, res) => {
  try {
    const { email, firstName, lastName, phone, userType } = req.body;

    const { exist } = await checkIfExist(phone);

    if (exist) {
      return res.status(400).json({
        message: `User exists`,
        variant: "error"
      });
    }

    const newUser = new user({
      email,
      firstName,
      lastName,
      phone,
      userType
    });

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    console.log(token);

    newUser.token = token;

    await newUser.save();
    return res.json({
      message: "User created successfully",
      variant: "success",
      data: { firstName, lastName, phone, userType }
    });
  } catch (err) {
    console.log("err", err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    console.log('Running');
    const { email, password } = req.body;

    const { userFound, exist } = await checkIfExist(email);

    console.log(userFound, exist)

    if (!exist) {
      return res.status(400).json({
        message: `Incorrect Email`,
        variant: "error"
      });
    }

    const isMatch = bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(404).json({
        message: `Incorrect Password`,
        variant: "error"
      });
    }

    delete userFound.password;

    res.status(201).json({
      userFound,
      loggedIn: true
    });
  } catch (err) {
    console.log(err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};
