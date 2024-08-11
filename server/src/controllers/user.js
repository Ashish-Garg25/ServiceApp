import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkIfExist, sendPushNotification } from "../helpers/helpers.js";
import twilio from "twilio";

const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

export const register = async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      userType,
      phone_verified,
      isPrivacyChecked,
      isPromotionalChecked
    } = req.body;

    const { exist } = await checkIfExist(phone);

    if (exist) {
      return res.status(400).json({
        message: `User exists`,
        variant: "error"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      userType,
      phone_verified,
      isPrivacyChecked,
      isPromotionalChecked
    });

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    console.log("token ===", token);

    newUser.token = token;

    await newUser.save();

    delete newUser.password;

    return res.json({
      message: "User created successfully",
      variant: "success",
      data: newUser
    });
  } catch (err) {
    console.log("err", err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  console.log("gggg");
  try {
    const { email, password } = req.body;

    console.log(req.body);

    const { userFound, exist } = await checkIfExist(email);

    console.log(userFound, exist);

    if (!exist) {
      return res.status(400).json({
        message: `Incorrect Email`,
        variant: "error"
      });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    console.log(isMatch, password);

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

export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.json({
        status: res.status,
        message: "Phone number is required"
      });
    }

    const verification = await client.verify.v2
      .services(process.env.SERVICE_ID)
      .verifications.create({
        channel: "sms",
        to: phone
      });

    console.log(verification.status);

    return res.json(verification);
  } catch (err) {
    console.log(err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { phone, code } = req.body;

    if (!phone || !code) {
      return res.json({
        status: res.status,
        message: "Phone number and code is required"
      });
    }

    const verification = await client.verify.v2
      .services(process.env.SERVICE_ID)
      .verificationChecks.create({
        code: code,
        to: phone
      });

    console.log(verification.status);
    return res.json(verification);
  } catch (err) {
    console.log(err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req.user;

    const userFound = await user.findById(userId);

    if (!userFound) {
      return res.status(400).json({
        message: "Login again!",
        variant: "error"
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, userFound.password);

    if (!isMatch) {
      return res.status(404).json({
        message: `Incorrect Old Password`,
        variant: "error"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    userFound.password = hashedPassword;

    userFound.save();

    return res.json({ variant: "success", msg: "Password reset successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};

function generateUniqueCode() {
  const currentDate = new Date();

  const year = currentDate.getFullYear().toString().slice(-2);
  const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const day = ("0" + currentDate.getDate()).slice(-2);
  const hours = ("0" + currentDate.getHours()).slice(-2);

  const firstFourDigits = year + month + day + hours;

  const randomDigits = ("0" + Math.floor(Math.random() * 100)).slice(-2);

  const uniqueCode = firstFourDigits + randomDigits;

  return uniqueCode;
}

export const sendCode = async (req, res) => {
  try {
    const { email } = req.body;

    const { userFound, exist } = await checkIfExist(email);

    if (!exist) {
      return res.status(400).json({
        message: `Incorrect Email`,
        variant: "error"
      });
    }

    const code = generateUniqueCode();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "--",
        pass: "--"
      }
    });

    const mailOptions = {
      from: '"Mr. Tasker" <sales@mrtasker.com>',
      to: email,
      subject: "Password Reset",
      text: `Please enter the code ${code} in app to proceed with password reset.`
    };

    await transporter.sendMail(mailOptions);

    userFound.code = code;

    userFound.save();
  } catch (err) {
    console.log(err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { code, newPassword } = req.body;
    const { userId } = req.user;

    const userFound = await user.findById(userId);

    if (!userFound) {
      return res.status(400).json({
        message: "Login again!",
        variant: "error"
      });
    }

    if (userFound.code !== code) {
      return res.json({ status: res.status, message: "Incorrect Code" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    userFound.password = hashedPassword;
    userFound.save();

    return res.json({ variant: "success", msg: "Password reset successfully" });
  } catch (err) {
    console.log(err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.user;

    const { registrationToken } = req.body;
    const userExist = await user.findById(userId);

    if (registrationToken) userExist.registrationToken = registrationToken;
    await userExist.save();

    await sendPushNotification(registrationToken, {
      title: `Welcome to Mr. Tasker`,
      body: `We're thrilled to have you on board. Explore all the features we offer and start managing your tasks with ease.`
    });

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

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.user;
    const {
      profilePic,
      businessName,
      gender,
      dob,
      phone,
      address,
      country,
      city,
      state,
      zipCode,
      isPrimary
    } = req.body;

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
    if (businessName) userExist.businessName = businessName;
    if (gender) userExist.gender = gender;
    if (dob) userExist.dob = dob;
    if (phone) userExist.phone = phone;

    // ADDRESS UPDATE
    if (address) {
      const location = {
        address1: address,
        city,
        state,
        country,
        zipCode,
        isPrimary
      };

      userExist.address.push(location);
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

export const getAddress = async (req, res) => {
  try {
    const { userId } = req.user;
    const response = await user.findById(userId);

    return res.json(response);
  } catch (err) {
    console.log("err", err);
    res.json({ status: res.status, message: "Something went wrong" });
  }
};
