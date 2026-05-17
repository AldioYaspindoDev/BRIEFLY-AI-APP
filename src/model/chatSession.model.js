import { DataTypes } from "sequelize";
import { dataBase } from "../config/dataBase.config.js";
import { userModel } from "./user.model.js";

export const chatSession = dataBase.define('chatSession', {
    id: {
        type : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type : DataTypes.STRING,
        defaultValue: 'New Conversation'
    },
}, { timestamps: true });

userModel.hasMany(chatSession, { foreignKey: 'userId', onDelete: 'CASCADE'});
chatSession.belongsTo(userModel, { foreignKey: 'userId'});