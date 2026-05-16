import { MODEL_AI, ai } from "../config/geminiKey.js";

export const GenerateText = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                error: "Prompt is required",
            });
        }

        const response = await ai.models.generateContent({
            model: MODEL_AI,
            contents: [
                {
                    parts: [{ text: prompt }],
                },
            ],
        });

        res.status(200).json({
            result: response.text,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

export const GenerateFromImage = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                error: "Prompt is required",
            });
        }

        const file = req.file ?? (req.files && req.files[0]);

        if (!file) {
            return res.status(400).json({
                success: false,
                error: "Image file is required",
            });
        }

        const base64Image = file.buffer.toString("base64");

        const response = await ai.models.generateContent({
            model: MODEL_AI,
            contents: [
                {
                    parts: [
                        { text: prompt },
                        {
                            inlineData: {
                                data: base64Image,
                                mimeType: file.mimetype,
                            },
                        },
                    ],
                },
            ],
        });

        res.status(200).json({
            result: response.text,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const GenerateFromDocument = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                error: "Prompt is required",
            });
        }

        const file = req.file ?? (req.files && req.files[0]);

        if (!file) {
            return res.status(400).json({
                success: false,
                error: "File is required",
            });
        }

        const base64Image = file.buffer.toString("base64");

        const response = await ai.models.generateContent({
            model: MODEL_AI,
            contents: [
                {
                    parts: [
                        { text: prompt ?? "tolong buatkan dari dokumen berikut." },
                        {
                            inlineData: {
                                data: base64Image,
                                mimeType: file.mimetype,
                            },
                        },
                    ],
                },
            ],
        });

        res.status(200).json({
            result: response.text,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const GenerateFromAudio = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                error: "Prompt is required",
            });
        }

        const file = req.file ?? (req.files && req.files[0]);

        if (!file) {
            return res.status(400).json({
                success: false,
                error: "File is required",
            });
        }

        const base64Audio = file.buffer.toString("base64");

        const response = await ai.models.generateContent({
            model: MODEL_AI,
            contents: [
                {
                    parts: [
                        { text: prompt ?? "tolong buatkan dari transkript." },
                        {
                            inlineData: {
                                data: base64Audio,
                                mimeType: file.mimetype,
                            },
                        },
                    ],
                },
            ],
        });

        res.status(200).json({
            result: response.text,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const MainChatModel = async (req, res) => {
    try {
        const { conversation } = req.body;

        if (!Array.isArray(conversation)) {
            return res.status(400).json({
                success: false,
                error: "Conversation must be an array of messages",
            });
        }

        const contents = conversation.map(( { role, text } ) => ({
            role,
            parts: [{ text }]
        }))

        const response = await ai.models.generateContent({
            model: MODEL_AI,
            contents,
            config: {
                temperature: 2.0,
                systemInstruction: ` Anda adalah "Briefly AI", seorang pakar Digital Marketer, Copywriter Andal, dan Content Strategist papan atas. Tugas utama Anda adalah membantu tim marketing, kreator konten, dan pemilik bisnis untuk mengubah instruksi singkat (brief) menjadi konten pemasaran yang matang, kreatif, berorientasi pada konversi, dan berkinerja tinggi. 
                
                KEMAMPUAN UTAMA ANDA:
                1. Menghasilkan ide konten media sosial (Instagram, TikTok, LinkedIn, dll).
                2. Menulis caption yang menarik dengan struktur yang jelas (Hook, Body, Call to Action/CTA).
                3. Menyusun email promosi yang memiliki Open Rate dan Click-Through Rate (CTR) tinggi.
                4. Menganalisis dan membedah tren teks iklan untuk meningkatkan konversi penjualan.

                ATURAN GAYA BAHASA (TONE OF VOICE):
                Anda harus mampu menyesuaikan gaya bahasa berdasarkan permintaan pengguna secara fleksibel. Jika pengguna tidak menentukan gaya bahasa, gunakan gaya bahasa yang "Profesional, Kreatif, dan Persuasif".
                - Profesional: Formal, menggunakan data/argumen logis, cocok untuk B2B atau LinkedIn.
                - Casual/Santai: Menggunakan bahasa sehari-hari yang akrab, cocok untuk audiens Gen Z atau UMKM produk harian.
                -   Emosional/Persuasif: Fokus pada pain points (masalah) audiens dan memberikan solusi yang mendesak (scarcity/urgency).

                BATASAN STRICT (GUARDRAILS):
                1. Anda HANYA diperbolehkan menjawab pertanyaan dan menyelesaikan tugas yang berkaitan dengan dunia marketing, copywriting, branding, konten media sosial, dan strategi iklan.
                2. Jika pengguna memberikan pertanyaan atau tugas di luar topik marketing (misalnya: coding, rumus matematika rumit, resep masakan, atau sains murni), Anda harus menolak dengan halus, profesional, dan mengarahkan mereka kembali ke fungsi utama Anda sebagai asisten marketing.
                3. Selalu berikan output tulisan yang bersih, scannable (mudah dibaca cepat menggunakan bullet points jika diperlukan), dan langsung siap digunakan oleh pengguna.`,
            },
        });

        res.status(200).json({
            success: true,
            result: response.text
        });
    } catch (error) { 
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Gagal memproses permintaan. Pastikan format input benar dan coba lagi.",
        });
    }
};
