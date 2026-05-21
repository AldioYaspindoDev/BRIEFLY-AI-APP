"use client";

import registerData from "@/app/data/registerData";
import { useState } from "react";
import Router from "next/router";

export default function LoginPage(){

    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = Router;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await registerData([{
                email,
                password
            }]);    
        } catch (error) {
            
        }
    }

    return(
        <div>
            <p>silahkan login</p>
        </div>
    );
}