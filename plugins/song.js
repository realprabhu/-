const { cmd } = require('../command');
const fg = require('api-dylux'); // Import api-dylux for API requests
const yts = require('yt-search'); // Import yt-search for YouTube search
const fs = require('fs'); // File System module for renaming

// 🎶--------SONG-DOWNLOAD COMMAND-------//
cmd({
    pattern: "song",
    alias: ["ytmp3", "splay"],
    desc: "Download songs from YouTube",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("*🚫 Please provide a valid song name or YouTube URL... 🎶*");

        console.log("User Query:", q);

        // React with 🔍 and show searching text
        await conn.sendMessage(from, { react: { text: "🔍", key: mek.key } });
        reply("*🔎 Searching for your song... Please wait!*");

        // Make the API request to download the song
        const response = await fg.get(`https://api.example.com/download?url=${encodeURIComponent(q)}`); // Replace with your API endpoint
        
        if (response.success) {
            const { title, audio_url, thumbnail, duration, views, likes, upload_date } = response;

            // Prepare the song details
            const desc = `*⭐ -Sᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ- ⭐*

> ꜱᴇɴᴅɪɴɢ ᴍᴏʀᴇ ᴅᴇᴛᴀɪʟꜱ ꜰᴏʀ ʏᴏᴜʀ ꜱᴏɴɢ... 🎶

╭─────────────✑
◉│ 🎵 *Tɪᴛʟᴇ*: ${title}
◉│ ⏱️ *Dᴜʀᴀᴛɪᴏɴ*: ${duration}
◉│ 🔔 *Vɪᴇᴡꜱ*: ${views}
◉│ 👍 *Lɪᴋᴇꜱ*: ${likes}
◉│ 📅 *Uᴘʟᴏᴀᴅᴇᴅ Oɴ*: ${upload_date}
╰─────────────✑

*🎧 Eɴᴊᴏʏ Yᴏᴜʀ Sᴏɴɢ!*

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ Ｗʜɪꜱᴘᴇʀ ᴹᴰ🧚‍♀️`;

            // Send the song thumbnail and details
            await conn.sendMessage(from, { image: { url: thumbnail }, caption: desc }, { quoted: mek });

            // React with 📥 and show downloading text
            await conn.sendMessage(from, { react: { text: "📥", key: mek.key } });
            reply("*📥 Downloading your song... Please wait!*");

            // Temporarily download the audio file to rename it
            const tempFilePath = './temp_audio.mp3';
            const renamedFilePath = './Ｃʜᴀʀᴜᴋᴀ ᵀᴹ🧚‍♀️.mp3';

            // Download the audio file
            const axios = require('axios');
            const writer = fs.createWriteStream(tempFilePath);
            const download = await axios({
                method: 'get',
                url: audio_url,
                responseType: 'stream',
            });
            download.data.pipe(writer);

            writer.on('finish', async () => {
                // Rename the downloaded file
                fs.renameSync(tempFilePath, renamedFilePath);

                // Send the renamed file
                await conn.sendMessage(from, {
                    audio: { url: renamedFilePath }, // Use the renamed file
                    mimetype: 'audio/mp3',
                    caption: `🎶 *${title}*`
                }, { quoted: mek });

                // Delete the renamed file after sending
                fs.unlinkSync(renamedFilePath);

                // React with ✅ when upload is complete
                await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
                reply("*✅ Song upload completed. Enjoy!*");
            });

            writer.on('error', (error) => {
                console.log("Download Error:", error);
                reply("*❌ Failed to download the song. Please try again later.*");
            });

        } else {
            reply("*❌ Failed to fetch the song. Please try again later.*");
        }

    } catch (e) {
        console.log("Error:", e);
        reply(`*❌ Error: ${e.message ? e.message : "Something went wrong!"}*`);
    }
});
