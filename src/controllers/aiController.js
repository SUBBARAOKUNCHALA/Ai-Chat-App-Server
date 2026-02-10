import { runAIChat } from "../langchain/chatAgent.js";

export const aiChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const reply = await runAIChat(message);
    //console.log("Subbu res from chat controllers",reply)

    res.json({
      role: "assistant",
      reply,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });

  }
};
