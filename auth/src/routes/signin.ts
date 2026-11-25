import express, { Request, Response } from "express";
import { Router } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";
const router = Router();

router.post(
  "/api/users/signin",

  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const matchedPassword = await Password.toCompare(
      existingUser.password,
      password,
    );

    if (!matchedPassword) {
      throw new BadRequestError("Invalid credentials");
    }
    console.log(existingUser);

    const userJwt = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!,
    );

    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(existingUser);
  },
);

export { router as signinRouter };
