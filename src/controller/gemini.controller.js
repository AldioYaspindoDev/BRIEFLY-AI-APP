import { MODEL_AI, ai } from "../config/geminiKey.js"

export const GenerateText = async (req,res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({
                success: false,
                error: "Prompt is required"
            });
        }

        const response = await ai.models.generateContent({
            model: MODEL_AI,
            contents: [
                {
                    parts: [
                        { text: prompt }
                    ]
                }
            ]
        });

        res.status(200).json({
            result: response.text
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const GenerateFromImage = async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({
                success: false,
                error: "Prompt is required"
            });
        }

        const file = req.file ?? (req.files && req.files[0]);

        if (!file) {
            return res.status(400).json({
                success: false,
                error: "Image file is required"
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
                                    mimeType: file.mimetype
                            }
                        }
                    ]
                }
            ]
        });

        res.status(200).json({
            result: response.text
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const GenerateFromDocument = async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({
                success: false,
                error: "Prompt is required"
            });
        }

        const file = req.file ?? (req.files && req.files[0]);

        if (!file) {
            return res.status(400).json({
                success: false,
                error: "File is required"
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
                                mimeType: file.mimetype
                            }
                        }
                    ]
                }
            ]
        });

        res.status(200).json({
            result: response.text
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const GenerateFromAudio = async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({
                success: false,
                error: "Prompt is required"
            });
        }

        const file = req.file ?? (req.files && req.files[0]);

        if (!file) {
            return res.status(400).json({
                success: false,
                error: "File is required"
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
                                mimeType: file.mimetype
                            }
                        }
                    ]
                }
            ]
        });

        res.status(200).json({
            result: response.text
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
    