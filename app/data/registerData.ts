import { Register } from "./interface/register";

export default async function registerData(data: Register[] | Register){
   // normalize payload: if caller passed an array with one item, send that item
   const payload = Array.isArray(data) && data.length === 1 ? data[0] : data;

   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
   });

   const text = await response.text();
   let body: any;
   try {
     body = text ? JSON.parse(text) : null;
   } catch {
     body = text;
   }

   if (!response.ok) {
     throw new Error(`Failed to register: ${response.status} ${response.statusText} - ${JSON.stringify(body)}`);
   }

   return body;
}