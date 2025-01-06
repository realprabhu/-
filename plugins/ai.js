const axios = require('axios');
const { cmd } = require('../command');

// Register the "ai" command
cmd({
    pattern: "ai",
    desc: "Interact with ChatGPT API for AI responses",
    category: "ai",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("*🚫 Please provide a query for the AI.*");

        // Make the API request
        const response = await axios.get(`https://chatgptforprabath-md.vercel.app/api/gptv1?q=${encodeURIComponent(q)}`);
        
        if (response.data && response.data.data) {
            // Send the AI response
            return reply(`*🤖 AI Response:*\n\n${response.data.data}`);
        } else {
            return reply("*⚠️ No valid response from the API.*");
        }
    } catch (error) {
        console.error("Error:", error);
        reply(`*❌ Error: ${error.message ? error.message : "Something went wrong"}*`);
    }
});
