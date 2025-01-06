const { cmd } = require('../command');

// 📝 Menu Command
cmd({
    pattern: "menu",
    desc: "Displays the bot's menu with an image",
    category: "general",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const userName = m.pushName || sender.split('@')[0]; // Get the requester's WhatsApp name

        // Define your bot menu
        const menu = `
*⭐ - Whisper MD 🧚‍♀️ - ⭐*

Hello ${userName} 👋

0️⃣1️⃣ Ｓᴇᴀʀᴄʜ Ｍᴇɴᴜ 🌻
╭─────────────✑
◉│ *1*    *.wiki*
◉│ *2*    *.npm*
◉│ *3*    *.movie*
◉│ *4*    *.weather*
◉│ *5*    *.google*
◉│ *6*    *.ytsearch*
╰─────────────✑

0️⃣2️⃣ Ｇᴇɴᴇʀᴀʟ Ｍᴇɴᴜ 🌻
╭─────────────✑
◉│ *1*    *.ping*
◉│ *2*    *.system*
◉│ *3*    *.restart*
╰─────────────✑

> Ｐᴏᴡᴇʀᴇᴅ Ｂʏ Ｃʜᴀʀᴜᴋᴀ ᵀᴹ 🧚‍♀️
        `;

        // Image URL
        const imageURL = 'https://raw.githubusercontent.com/Charuka56/Queen-Chethi-V1/refs/heads/main/plugins/cyberpunk.jpeg';

        // Send the image with the menu as caption
        await conn.sendMessage(from, { image: { url: imageURL }, caption: menu });
    } catch (error) {
        console.error("Error in menu command:", error);
        reply("> ❌ An error occurred while displaying the menu.");
    }
});
