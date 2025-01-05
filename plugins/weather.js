const weather = require("weather-js");
const { cmd } = require('../command');

// Register the "weather" command
cmd({
    pattern: "weather",
    desc: "Get weather information for a specific location",
    category: "search", // Category for search-related commands
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) {
            return reply("❌ Please provide a location to search for weather (e.g., `.weather Colombo`).");
        }

        await m.react("🌤️");

        // Search for weather information
        weather.find({ search: q, degreeType: "C" }, function (err, result) {
            if (err || !result || result.length === 0) {
                return reply(`⚠️ No weather information found for "${q}". Please try another location.`);
            }

            const location = result[0].location;
            const current = result[0].current;

            // Prepare the weather information message
            const weatherMessage = `🌤️ **Ｗᴇᴀᴛʜᴇʀ Ｉɴꜰᴏʀᴍᴀᴛɪᴏɴ ꜰᴏʀ ${location.name}**:

🌡️ Ｔᴇᴍᴘᴇʀᴀᴛᴜʀᴇ: ${current.temperature}°C
☁️ Ｃᴏɴᴅɪᴛɪᴏɴ: ${current.skytext}
💨 Ｗɪɴᴅ: ${current.winddisplay}
💦 Ｈᴜᴍɪᴅɪᴛʏ: ${current.humidity}%
📅 Ｄᴀᴛᴇ: ${current.date}
⏰ Ｔɪᴍᴇ: ${current.observationtime}

🌍 **Ｒᴇɢɪᴏɴ:** ${location.region}, ${location.country}
📍 **Ｌᴀᴛ/Ｌᴏɴ:** ${location.lat}, ${location.long}

Ｐᴏᴡᴇʀᴇᴅ ʙʏ Ｗʜɪꜱᴘᴇʀ ᴹᴰ🧚‍♀️`;

            // Send the weather information
            reply(weatherMessage);
        });
    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while fetching weather information. Please try again later.");
    }
});
