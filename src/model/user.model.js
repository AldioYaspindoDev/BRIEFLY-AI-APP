import { DataTypes } from "sequelize";
import { dataBase } from "../config/dataBase.config.js";

export const userModel = dataBase.define('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    name: {
        type : DataTypes.STRING,
        allowNull: false
    },

    email: {
        type : DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        select: false
    } 
    
}, { timestamps: true });