"use client";

import registerData from "@/app/data/registerData";
import { useState } from "react";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const result = await registerData([{
                name,
                email,
                password
            }]);

            console.log("berhasil register:", result);
        } catch (error) {
            console.error("gagal register:", error);
        } finally {
            setLoading(false);
        }
    }

    return(
        <section>
            <div>
                <h1>
                    Register
                </h1> 
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input 
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                                required
                                placeholder="Input Your Name"
                        />
                    </div>

                    <div>
                        <input 
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Input Your Email"
                        />
                    </div>

                    <div>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Input Your Password"
                        />
                    </div>

                    <div>
                        <button 
                            type="submit"
                            disabled={loading}
                            >
                                {loading? "Memproses" : "Dafter Sekarang"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}