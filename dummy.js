import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
dotenv.config();

console.log("Groq key exists:", !!process.env.GROQ_API_KEY);

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.1-8b-instant",
});

const res = await model.invoke("Reply with exactly: WORKING");
console.log(res.content);
