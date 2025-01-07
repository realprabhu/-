const { cmd } = require('../command');
const { isOwner } = require('../helpers'); // Assuming you have a helper to check if the user is the owner

cmd({
    pattern: "settings",
    desc: "View and adjust bot settings",
    category: "owner",
    filename: __filename,
},
async (conn, mek, m, { from, reply, isOwner }) => {
    if (!isOwner) return;  // Only the owner can use this command

    const settingsMessage = `
╭─❰  *⦿ WHISPER MD SETTINGS ⦿*  ❱─╮  
│  
│ ✦ **ADJUST YOUR SETTINGS WITH EASE!**  
│   USE THE \`UPDATE\` COMMAND OR \`SETVAR\` FOR SETTINGS. 🧚‍♀️  
│  
╰───────────────╯  

┏━【 AUTO_READ_STATUS 】━┓  
┃  
┃ • \`SETVAR AUTO_READ_STATUS: TRUE\` ✅ *(ENABLES AUTO-READ)*  
┃ • \`SETVAR AUTO_READ_STATUS: FALSE\` ❎ *(DISABLES AUTO-READ)*  
┃  
┗━━━━━━━━━━━━━━━━━━━━━━━┛  

┏━【 MODE 】━┓  
┃  
┃ • \`SETVAR MODE: PUBLIC\` 🌐 *(BOT AVAILABLE FOR EVERYONE)*  
┃ • \`SETVAR MODE: PRIVATE\` 🔒 *(BOT RESTRICTED TO SPECIFIC USERS)*  
┃  
┗━━━━━━━━━━━┛  

┏━【 CHAT OPTIONS 】━┓  
┃  
┃ • \`SETVAR MODE: INBOX\` ✉️ *(RESPONDS ONLY IN PRIVATE CHATS)*  
┃ • \`SETVAR MODE: GROUPS\` 👥 *(RESPONDS ONLY IN GROUP CHATS)*  
┃  
┗━━━━━━━━━━━━━━━━━━━┛  

┏━【 ALIVE SETTINGS 】━┓  
┃  
┃ • \`SETVAR ALIVE_MSG: <YOUR_MESSAGE>\` 💬 *(CUSTOMIZE THE ALIVE MESSAGE)*  
┃ • \`SETVAR ALIVE_IMG: <IMAGE_URL>\` 🖼️ *(SET THE ALIVE IMAGE)*  
┃  
┗━━━━━━━━━━━━━━━━━━━━━━┛  
    `;

    // Send the settings message
    await reply(settingsMessage);

    // React with a checkmark (⚙️) after sending the message
    await m.react('⚙️');
});
