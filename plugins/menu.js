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
        const menu = `[1/5, 19:40] ᴄʜᴀʀᴜᴋᴀ🌏: *⭐ -Ｗʜɪꜱᴘᴇʀ ᴹᴰ🧚‍♀️- ⭐*

Hello ${pushname} 👋

0️⃣1️⃣ Ｓᴇᴀʀᴄʜ Ｍᴇɴᴜ 🌻
╭─────────────✑
◉│ *1*    *.ᴡɪᴋɪ*
◉│ *2*    *.ɴᴘᴍ*
◉│ *3*    *.ᴍᴏᴠɪᴇ*
◉│ *4*    *.ᴡᴇᴀᴛʜᴇʀ*
◉│ *5*    *.ɢᴏᴏɢʟᴇ*
◉│ *6*    *.ʏᴛꜱᴇᴀʀᴄʜ*
╰─────────────✑

0️⃣2️⃣ Ｇᴇɴᴀʀᴀʟ Ｍᴇɴᴜ 🌻

╭─────────────✑
◉│ *1*    *.ᴘɪɴɢ*
◉│ *2*    *.ꜱʏꜱᴛᴇᴍ*
◉│ *3*    *.ʀᴇꜱᴛᴀʀᴛ*
╰─────────────✑

> Ｐᴏᴡᴇʀᴇᴅ Ｂʏ  Ｃʜᴀʀᴜᴋᴀ ᵀᴹ🧚‍♀️
[1/6, 22:21] ᴄʜᴀʀᴜᴋᴀ🌏: *⭐ -Ｗʜɪꜱᴘᴇʀ ᴹᴰ🧚‍♀️- ⭐*

Hello ${pushname} 👋

0️⃣1️⃣ Ｓᴇᴀʀᴄʜ Ｍᴇɴᴜ 🌻
╭─────────────✑
◉│ *1*    *.ᴡɪᴋɪ*
◉│ *2*    *.ɴᴘᴍ*
◉│ *3*    *.ᴍᴏᴠɪᴇ*
◉│ *4*    *.ᴡᴇᴀᴛʜᴇʀ*
◉│ *5*    *.ɪᴘ*
◉│ *6*    *.ɢᴏᴏɢʟᴇ*
◉│ *7*    *.ʏᴛꜱᴇᴀʀᴄʜ*
╰─────────────✑

0️⃣2️⃣ Ｇᴇɴᴀʀᴀʟ Ｍᴇɴᴜ 🌻

╭─────────────✑
◉│ *1*    *.ᴘɪɴɢ*
◉│ *2*    *.ꜱʏꜱᴛᴇᴍ*
◉│ *3*    *.ʀᴇꜱᴛᴀʀᴛ*
╰─────────────✑

> Ｐᴏᴡᴇʀᴇᴅ Ｂʏ  Ｃʜᴀʀᴜᴋᴀ ᵀᴹ🧚‍♀️
        `;

        // Send the menu
        reply(menu);
    } catch (error) {
        console.error("Error in menu command:", error);
        reply("> ❌ An error occurred while displaying the menu.");
    }
});
