import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import multer from 'multer';
import { geminiRouter } from './routes/gemini.routes.js';
import { userRt } from './routes/user.routes.js';

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

// API
app.use("/gemini", geminiRouter);
app.use("/user", userRt);

export default app;