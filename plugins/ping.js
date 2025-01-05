// ping.js

const { cmd } = require('../command');

// Register the "ping" command to check bot latency
cmd({
    pattern: "ping",
    desc: "Check bot latency",
    category: "info", // Category for general information
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        await m.react("🏓");

        // Record the start time
        const startTime = Date.now();

        // Send a temporary response to calculate latency
        await reply("🏓 ᴘɪɴɢɪɴɢ...");

        // Calculate the round trip time (RTT)
        const pingTime = Date.now() - startTime;

        // Prepare the status message with latency
        const statusMessage = `> Ｗʜɪꜱᴘᴇʀ ᴹᴰ🧚‍♀️

╭─────────────✑

🏓 ᴘᴏɴɢ! ʟᴀᴛᴇɴᴄʏ : ${pingTime}ms

╰─────────────✑

🌻ᴅᴇᴠᴇʟᴏᴘᴇᴅ ʙʏ Ｃʜᴀʀᴜᴋᴀ✨

✨ʟᴀꜱᴛ ᴜᴘᴅᴀᴛᴇ 2025/01/05🌻

> Ｐᴏᴡᴇʀᴇᴅ Ｂʏ  Ｃʜᴀʀᴜᴋᴀ ᵀᴹ🧚‍♀️
        `;

        // Send the final response
        reply(statusMessage);
    } catch (e) {
        console.error(e);
        reply(`Error occurred: ${e}`);
    }
});
