const { cmd } = require('../command');

// 📝 Menu Command
cmd({
    pattern: "menu",
    desc: "Displays the bot's menu",
    category: "general",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const userName = m.pushName || sender.split('@')[0]; // Get the requester's WhatsApp name

        // Define your bot menu
        const menu = `
╭─────────────✑
      Ｗʜɪꜱᴘᴇʀ ᴹᴰ🧚‍♀️
╰─────────────✑

Hello, *${userName}*! 👋  
Here are my commands:

⭐ General:
• .menu - Show this menu
• .alive - Check if the bot is active

🔍 Search:
• .ytsearch <query> - YouTube Search
• .wiki <query> - Wikipedia Search
• .ttsearch <query> - TikTok Search
• .weather <city> - Weather Info
• .moviesearch <movie name> - Search for movie details

🛠️ Utilities:
• .system - Show system info
• .ping - Bot latency check

🌟 Developed by:
Charuka Mahesh

Powered by Ｗʜɪꜱᴘᴇʀ ᴹᴰ🧚‍♀️
        `;

        // Send the menu
        reply(menu);
    } catch (error) {
        console.error("Error in menu command:", error);
        reply("> ❌ An error occurred while displaying the menu.");
    }
});
