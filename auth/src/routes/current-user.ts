import express from "express";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { currentUser, requireAuth } from "@mh01tickets/common";

const router = Router();

router.get("/api/users/current-user", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
