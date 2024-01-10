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
    const { email, password } = req.body;

    const { userFound, exist } = await checkIfExist(email);

    console.log(userFound, exist);

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

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const { profilePic, phone, address, country, city, state, zipCode } =
      req.body;

    const { exist } = await checkIfExist(phone);

    if (exist) {
      return res.status(400).json({
        message: `Phone already exists`,
        variant: "error"
      });
    }

    const userExist = await user.findById(userId);

    if (!userExist) {
      return res.status(400).json({
        message: `No user found with provided ID`,
        variant: "error"
      });
    }

    if (profilePic) userExist.profilePic = profilePic;
    if (phone) userExist.phone = phone;

    // ADDRESS UPDATE
    if(address){
      const location = {
        address1: address,
        city,
        state,
        country,
        zipCode
      };

      userExist.address.push(location)
    }

    await userExist.save();

    return res.json({
      message: "Details updated successfully",
      variant: "success",
      data: userExist
    });
  } catch (err) {
    console.log("err", err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};
