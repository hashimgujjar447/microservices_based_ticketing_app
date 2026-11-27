import express, { Request, Response } from "express";
import { Router } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError, validateRequest } from "@mh01tickets/common";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
const router = Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be of 4 to 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log("Creating a user");

    const isUserAlreadyExist = await User.findOne({
      email: email,
    });
    if (isUserAlreadyExist) {
      throw new BadRequestError("Email is in use");
    }

    const user = User.build({
      email: email,
      password: password,
    });
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY!,
    );

    req.session = {
      jwt: userJwt,
    };
    res.status(201).send(user);
  },
);

export { router as signupRouter };
