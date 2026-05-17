import { Register, GetAllUser } from "../controller/user.controller.js";
import express from "express";

export const userRt = express.Router();

userRt.post("/register", Register);
userRt.get("/", GetAllUser);