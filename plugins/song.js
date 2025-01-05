const { cmd } = require('../command'); // Command handler
const yts = require('yt-search'); // YouTube search package
const ytdl = require('ytdl-core'); // YouTube download core
const fs = require('fs'); // File system module

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

        // Perform YouTube search if the query is not a URL
        const search = await yts(q);
        if (!search.videos || search.videos.length === 0) {
            return reply("*❌ No results found for your query. Please try again.*");
        }

        const video = search.videos[0]; // Get the first result
        const { title, url, timestamp, views, ago, thumbnail, duration } = video;

        // Prepare the song details
        const desc = `*⭐ -Sᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ- ⭐*

> ꜱᴇɴᴅɪɴɢ ᴍᴏʀᴇ ᴅᴇᴛᴀɪʟꜱ ꜰᴏʀ ʏᴏᴜʀ ꜱᴏɴɢ... 🎶

╭─────────────✑
◉│ 🎵 *Tɪᴛʟᴇ*: ${title}
◉│ ⏱️ *Dᴜʀᴀᴛɪᴏɴ*: ${duration || timestamp}
◉│ 🔔 *Vɪᴇᴡꜱ*: ${views}
◉│ 📅 *Uᴘʟᴏᴀᴅᴇᴅ Oɴ*: ${ago}
╰─────────────✑

*🎧 Eɴᴊᴏʏ Yᴏᴜʀ Sᴏɴɢ!*

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ Ｗʜɪꜱᴘᴇʀ ᴹᴰ🧚‍♀️`;

        // Send the song thumbnail and details
        await conn.sendMessage(from, { image: { url: thumbnail }, caption: desc }, { quoted: mek });

        // React with 📥 and show downloading text
        await conn.sendMessage(from, { react: { text: "📥", key: mek.key } });
        reply("*📥 Downloading your song... Please wait!*");

        // Download the song using ytdl-core
        const audioStream = ytdl(url, {
            quality: 'highestaudio',
            filter: 'audioonly'
        });

        const tempFilePath = './temp_audio.mp3';
        const renamedFilePath = './Ｃʜᴀʀᴜᴋᴀ ᵀᴹ🧚‍♀️.mp3';

        const writer = fs.createWriteStream(tempFilePath);
        audioStream.pipe(writer);

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

    } catch (e) {
        console.log("Error:", e);
        reply(`*❌ Error: ${e.message ? e.message : "Something went wrong"}`);
    }
});
