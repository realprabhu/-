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
        await m.react("🧚‍♀️")
        const userName = m.pushName || sender.split('@')[0]; // Get the requester's WhatsApp name

        // Define your bot menu
        const menu = `
*⭐ - Whisper MD 🧚‍♀️ - ⭐*

Hello ${userName} 👋

0️⃣1️⃣ Ｓᴇᴀʀᴄʜ Ｍᴇɴᴜ 🌻
╭─────────────✑
◉│ *1*    *.ᴇɪᴋɪ*
◉│ *2*    *.ɴᴘᴍ*
◉│ *3*    *.ᴍᴏʙɪᴇ*
◉│ *4*    *.ᴡᴇᴀᴛʜᴇʀ*
◉│ *5*    *.ɢᴏᴏɢʟᴇ*
◉│ *6*    *.ʏᴛꜱᴇᴀʀᴄʜ*
╰─────────────✑

0️⃣2️⃣ Ｇᴇɴᴇʀᴀʟ Ｍᴇɴᴜ 🌻
╭─────────────✑
◉│ *1*    *.ᴘɪɴɢ*
◉│ *2*    *.ꜱʏꜱᴛᴇᴍ*
╰─────────────✑

0️⃣3️⃣ Ｏᴡɴᴇʀ Ｍᴇɴᴜ 🌻
╭─────────────✑
◉│ *1*    *.ʀᴇꜱᴛᴀʀᴛ*
◉│ *2*    *.ꜱᴇᴛᴛɪɴɢꜱ*
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
