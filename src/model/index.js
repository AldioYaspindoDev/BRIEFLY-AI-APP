import { dataBase } from "../config/dataBase.config.js";
import { userModel } from "./user.model.js";
import { chatSession } from "./chatSession.model.js";
import { chatMessage } from "./chatMessage.model.js";

const initDB = async () => {
    try {
        await dataBase.sync({
            alter:true
        });
        console.log("Database Berhasil di Konfigurasikan");
    } catch (error) {
        console.error("Database Gagal di Konfigurasikan", error.chatMessage);
    }
}

export { dataBase, userModel, chatMessage, chatSession, initDB };