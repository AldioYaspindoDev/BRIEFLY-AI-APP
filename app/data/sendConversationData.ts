import { Conversation } from "./interface/conversation";

export default async function sendConversationData(conversation: Conversation[]) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gemini/main-model`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            conversation: conversation,
        }),
    });

    if(!response.ok){
        throw new Error('gagal mengirim data conversation ke server')
    }
    return response.json();
}