// system.js

const os = require('os');
const { cmd } = require('../command');
const { sleep } = require('../lib/functions');

// Function to get the bot's uptime in a readable format
function formatUptime(uptime) {
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
}

// Function to get RAM usage in MB
function getRamUsage() {
    const totalMemory = os.totalmem(); // Total RAM in bytes
    const freeMemory = os.freemem(); // Free RAM in bytes
    const usedMemory = totalMemory - freeMemory; // Used RAM in bytes
    const usedMemoryMB = (usedMemory / 1024 / 1024).toFixed(2); // Convert to MB
    const totalMemoryMB = (totalMemory / 1024 / 1024).toFixed(2); // Convert to MB
    const freeMemoryMB = (freeMemory / 1024 / 1024).toFixed(2); // Convert to MB
    return { usedMemoryMB, totalMemoryMB, freeMemoryMB };
}

// Register the "system" command to show the bot's uptime, platform, RAM usage, and hosting site
cmd({
    pattern: "system",
    desc: "Show bot uptime, platform information, RAM usage, and hosting site",
    category: "info",  // Category for general information
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        await m.react("⚙️");
        // Get system information
        const uptime = formatUptime(process.uptime());  // Bot uptime
        const platform = os.platform();  // Platform (e.g., 'linux', 'win32', etc.)
        const architecture = os.arch();  // Architecture (e.g., 'x64', 'arm', etc.)
        const { usedMemoryMB, totalMemoryMB, freeMemoryMB } = getRamUsage(); // RAM usage
        const hostingSite = "Heroku";  // Hosting site (You can change this as needed)
        
        // Prepare the status message
        const statusMessage = `> Ｗʜɪꜱᴘᴇʀ ᴹᴰ🧚‍♀️

╭─────────────✑

🆙 Ｕᴘᴛɪᴍᴇ : ${uptime}

✨Ｐʟᴀᴛꜰᴏʀᴍ : ${platform} ${architecture}

💾 ＲＡＭ : ${usedMemoryMB} MB / ${totalMemoryMB} MB (Free: ${freeMemoryMB} MB)

🌐 Ｈᴏsᴛɪɴɢ : ${hostingSite}

╰─────────────✑

🌻ᴅᴇᴠᴇʟᴏᴘᴇᴅ ʙʏ Ｃʜᴀʀᴜᴋᴀ✨

✨ʟᴀꜱᴛ ᴜᴘᴅᴀᴛᴇ 2025/01/05🌻

> Ｐᴏᴡᴇʀᴇᴅ Ｂʏ  Ｃʜᴀʀᴜᴋᴀ ᵀᴹ🧚‍♀️
        `;
        
        // Send the status message
        reply(statusMessage);
    } catch (e) {
        console.error(e);
        reply(`Error occurred: ${e}`);
    }
});
