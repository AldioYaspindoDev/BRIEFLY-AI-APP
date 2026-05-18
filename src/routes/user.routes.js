import { Register, GetAllUser, Login } from "../controller/user.controller.js";
import express from "express";

export const userRt = express.Router();

userRt.post("/register", Register);
userRt.post("/login", Login);
userRt.get("/", GetAllUser);