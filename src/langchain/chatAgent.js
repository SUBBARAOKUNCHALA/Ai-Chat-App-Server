import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
dotenv.config();

const chatModel = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.1-8b-instant", 
  temperature: 0.7,
});


export const runAIChat = async (userMessage) => {
  const res = await chatModel.invoke(userMessage);
  //console.log("Subbu res from chat Agent",res)
  return res.content;
};
