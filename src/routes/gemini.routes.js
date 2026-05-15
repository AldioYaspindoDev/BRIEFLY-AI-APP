import { GenerateText, 
    GenerateFromImage,
    GenerateFromDocument,
    GenerateFromAudio
} from "../controller/gemini.controller.js";
import express from "express";
import multer from "multer";

export const geminiRouter = express.Router();

const upload = multer();

geminiRouter.post("/generate-text", GenerateText);
geminiRouter.post("/generate-image", upload.any(), GenerateFromImage);
geminiRouter.post("/generate-document", upload.any(), GenerateFromDocument);
geminiRouter.post("/generate-audio", upload.any(), GenerateFromAudio);