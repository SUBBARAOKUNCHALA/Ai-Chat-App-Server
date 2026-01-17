import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// const chatModel = new ChatOpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   temperature: 0.5,
// });

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4o-mini",  // FREE MODEL
  temperature: 0.7
});

// ✅ NAMED EXPORT
export const runAIChat = async (userMessage) => {
  const response = await chatModel.invoke([
    new SystemMessage("You are a helpful AI assistant."),
    new HumanMessage(userMessage),
  ]);

  return response.content;
};
