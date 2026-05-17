import { DataTypes } from "sequelize";
import { dataBase } from "../config/dataBase.config.js";
import { chatSession } from "./chatSession.model.js";

export const chatMessage = dataBase.define('chatMessage', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    sender: {
        type: DataTypes.ENUM('user', 'model'),
        allowNull: false
    },

    text: {
        type: DataTypes.TEXT, 
        allowNull: false
    }
}, { timestamps: true });

chatSession.hasMany(chatMessage, {
    foreignKey: 'sessionId',
    onDelete: 'CASCADE'
});

chatMessage.belongsTo(chatSession, {
    foreignKey: 'sessionId'
});