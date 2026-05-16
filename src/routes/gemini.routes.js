import { GenerateText, 
    GenerateFromImage,
    GenerateFromDocument,
    GenerateFromAudio,
    MainChatModel
} from "../controller/gemini.controller.js";
import express from "express";
import multer from "multer";

export const geminiRouter = express.Router();

const upload = multer();

geminiRouter.post("/generate-text", GenerateText);
geminiRouter.post("/main-model", MainChatModel);
geminiRouter.post("/generate-image", upload.any(), GenerateFromImage);
geminiRouter.post("/generate-document", upload.any(), GenerateFromDocument);
geminiRouter.post("/generate-audio", upload.any(), GenerateFromAudio);