const { cmd } = require('../command'); // Command handler
const axios = require('axios'); // HTTP client
const ytdl = require('ytdl-core'); // YouTube downloader
const fs = require('fs'); // File system module

cmd({
    pattern: "song",
    alias: ["ytmp3", "splay"],
    desc: "Download songs from YouTube with details",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("*🚫 Please provide a valid YouTube URL or song name... 🎶*");

        console.log("User Query:", q);

        // Search for the video details if not a URL
        let videoURL = q;
        if (!ytdl.validateURL(q)) {
            reply("*🔍 Searching for your song... Please wait!*");
            const searchResponse = await axios.get(`https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`);
            const searchHTML = searchResponse.data;
            const videoID = searchHTML.match(/"videoId":"(.*?)"/)?.[1];
            if (!videoID) return reply("*❌ No results found for your query.*");
            videoURL = `https://www.youtube.com/watch?v=${videoID}`;
        }

        // Validate the video URL
        if (!ytdl.validateURL(videoURL)) {
            return reply("*❌ Invalid YouTube URL. Please provide a correct one.*");
        }

        // Fetch video details
        const videoInfo = await ytdl.getInfo(videoURL);
        const { title, lengthSeconds, viewCount, likes, uploadDate, thumbnails } = videoInfo.videoDetails;
        const duration = new Date(lengthSeconds * 1000).toISOString().substr(11, 8);

        // Send video details to the user
        const description = `*⭐ -Sᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ- ⭐*

> ꜱᴇɴᴅɪɴɢ ʏᴏᴜʀ ꜱᴏɴɢ.. 🎶

╭─────────────✑
◉│ *1*    *ᴛɪᴛʟᴇ🎶:* ${title}
◉│ *2*    *ᴅᴜʀᴀᴛɪᴏɴ⏰:* ${duration}
◉│ *3*    *ᴠɪᴇᴡꜱ🔔:* ${viewCount}
◉│ *4*    *ʟɪᴋᴇꜱ👍:* ${likes || "N/A"}
◉│ *5*    *ᴜᴘʟᴏᴀᴅᴇᴅ📅:* ${uploadDate}
╰─────────────✑

*ᴇɴᴊᴏʏ ʏᴏᴜʀ ꜱᴏɴɢ!*

> ᴘᴏᴡᴇʀᴇᴅ ʙʏ Ｃʜᴀʀᴜᴋᴀ ᵀᴹ🧚‍♀️`;

        await conn.sendMessage(from, { image: { url: thumbnails[thumbnails.length - 1].url }, caption: description }, { quoted: mek });

        // Start downloading the audio
        const tempFilePath = './temp_audio.mp3';
        const writer = fs.createWriteStream(tempFilePath);

        reply("*📥 Downloading your song... Please wait!*");
        ytdl(videoURL, {
            quality: 'highestaudio',
            filter: 'audioonly'
        }).pipe(writer);

        writer.on('finish', async () => {
            // Send the downloaded audio
            await conn.sendMessage(from, {
                audio: { url: tempFilePath },
                mimetype: 'audio/mp3',
                caption: `${title} - Song`
            }, { quoted: mek });

            // React with ✅ when upload is complete
            await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
            reply("*✅ Song upload completed. Enjoy!*");

            // Clean up the file
            fs.unlinkSync(tempFilePath);
        });

        writer.on('error', (error) => {
            console.log("Download Error:", error);
            reply("*❌ Failed to download the song. Please try again later.*");
        });

    } catch (e) {
        console.log("Error:", e);
        reply(`*❌ Error: ${e.message ? e.message : "Something went wrong"}*`);
    }
});
