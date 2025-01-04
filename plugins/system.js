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

// Register the "status" command to show the bot's uptime and platform
cmd({
    pattern: "system",
    desc: "Show bot uptime and platform information",
    category: "info",  // Category for general information
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        // Get system information
        const uptime = formatUptime(process.uptime());  // Bot uptime
        const platform = os.platform();  // Platform (e.g., 'linux', 'win32', etc.)
        const architecture = os.arch();  // Architecture (e.g., 'x64', 'arm', etc.)
        
        // Prepare the status message
        const statusMessage = `
        🕒 **Bot Uptime**: ${uptime}
        💻 **Platform**: ${platform} ${architecture}
        🛠 **Developed by**: Charuka Mahesh (Queen Chethi)
        `;
        
        // Send the status message
        reply(statusMessage);
    } catch (e) {
        console.error(e);
        reply(`Error occurred: ${e}`);
    }
});
