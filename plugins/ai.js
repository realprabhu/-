const axios = require('axios');
const { cmd } = require('../command');

// Define your OpenAI API key here
const OPENAI_API_KEY = "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";

// Define the AI command
cmd({
  pattern: "ai",
  desc: "Ask anything to OpenAI",
  category: "ai",
  filename: __filename,
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("❌ Please provide a query to ask OpenAI!");

    reply("🧠 Thinking...");

    // Make a request to OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: q }],
        temperature: 0.7,
        max_tokens: 150,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`, // Use the API key directly
        },
      }
    );

    const replyMessage = response.data.choices[0].message.content;
    reply(replyMessage || "⚠️ No response received from OpenAI.");
  } catch (error) {
    console.error(error);
    reply("❌ Error: Unable to process your request. Please try again later.");
  }
});
