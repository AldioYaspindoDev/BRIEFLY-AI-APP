import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { userModel } from '../model/user.model.js';
import { generateToken, verifyToken } from '../utils/jwt.utils.js';

export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(404).json({
                message: "data kredensial harus di isi"
            });
        }

        const hashPassword = await argon2.hash(password);

        const user = await userModel.create({
            name: name,
            email: email,
            password: hashPassword
        });

        res.status(200).json({
            success: true,
            message: "Selamat ! kamu berhasil register silahkan login",
            data: user
        });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({
            success: false,
            message: "Gagal ! kamu gagal register cobalah untuk menginput data yang benar"
        });

    }
}

export const GetAllUser = async (req, res) => {
    try {
        const user = await userModel.findAll();

        res.status(200).json({
            success: true,
            message: "Berhasil mendapatkan data user",
            data: user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Gagal mendapatkan data user"
        });
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: "data kredensial harus di isi"
            });
        }

        const user = await userModel.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({
                message: "Email atau password salah"
            });
        }

        const verifyPassword = await argon2.verify(user.password, password);
        if(!verifyPassword){
            return res.status(400).json({
                message: "Email atau password salah"
            });
        }

        const token = generateToken({
            id: user.id,
            name: user.name,
            email: user.email
        });

        res.status(200).json({
            success: true,
            message: "Selamat ! kamu berhasil login",
            token,
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Gagal ! kamu gagal login"
        });
    }
}