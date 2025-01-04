// ping.js

const { cmd } = require('../command');
const { sleep } = require('../lib/functions');

// Register the "ping" command to check bot latency
cmd({
    pattern: "ping",
    desc: "Check bot latency",
    category: "info",  // Category for general information
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        await m.react("🌏");

        // Record the start time
        const startTime = Date.now();

        // Send a message to calculate the round trip time (RTT)
        const pingMessage = await reply("Ｐɪɴɢɪɴʜ...");

        // Calculate the round trip time (RTT)
        const pingTime = Date.now() - startTime;

        // Prepare the status message with latency
        const statusMessage = `> Ｗʜɪꜱᴘᴇʀ ᴹᴰ🧚‍♀️

╭─────────────✑

 Ｒᴇꜱᴘᴏɴꜱᴇ ꜱᴘᴇᴇᴅ ɪꜱ : ${pingTime}ms

╰─────────────✑

🌻ᴅᴇᴠᴇʟᴏᴘᴇᴅ ʙʏ Ｃʜᴀʀᴜᴋᴀ✨

✨ʟᴀꜱᴛ ᴜᴘᴅᴀᴛᴇ 2025/01/05🌻

> Ｐᴏᴡᴇʀᴇᴅ Ｂʏ  Ｃʜᴀʀᴜᴋᴀ ᵀᴹ🧚‍♀️
        `;

        // Send the status message
        await pingMessage.edit(statusMessage);
    } catch (e) {
        console.error(e);
        reply(`Error occurred: ${e}`);
    }
});
