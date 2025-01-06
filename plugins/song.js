const { cmd } = require('../command');
const nayan = require('nayan-videos-downloader'); // Import the nayan-media package
const ytsr = require('yt-search'); // YouTube search results package
const { sleep } = require('../lib/functions'); // Optional: For adding delays if needed

// Register the "ytsongs" command to download YouTube songs by search
cmd({
    pattern: "song",
    desc: "Download YouTube songs by search term",
    category: "download",  // Category for download commands
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) {
            return reply("❌ Please provide a search query. Example: `.ytsongs Shape of You`");
        }

        // React to indicate processing
        await m.react("⏳");

        // Search for YouTube videos based on the query
        const searchResults = await ytsr(q, { limit: 1 });

        if (!searchResults.items.length) {
            return reply(`⚠️ No results found for "${q}". Please try a different search term.`);
        }

        // Get the first video from the search results
        const video = searchResults.items[0];
        const videoUrl = video.url;
        const videoTitle = video.title;
        const videoArtist = video.author.name || "Unknown Artist";

        // Download the song using nayan-media
        const result = await nayan.downloadYoutube(videoUrl);

        if (result.status === "error") {
            return reply("❌ Error: Could not fetch the song. Please try again later.");
        }

        // Fetch song details
        const songTitle = result.title;
        const songArtist = result.artist || "Unknown Artist";
        const songDuration = result.duration || "Unknown Duration";
        const songUrl = result.link;

        // Style the song details with your brand name and emojis
        let songDetails = `
*[Ｗʜɪꜱᴘᴇʀ ᴹᴰ🧚‍♀️]*

🎶 *Song Details:*
- *🎵 Title*: ${songTitle}
- *👤 Artist*: ${songArtist}
- *⏳ Duration*: ${songDuration}

🔗 *[Download Song]*(${songUrl})

> Ｐᴏᴡᴇʀᴇᴅ Ｂʏ  Ｃʜᴀʀᴜᴋᴀ ᵀᴹ🧚‍♀️
        `;

        // Send the styled song details message
        await reply(songDetails);
        
        // Send the downloaded song as a file
        await conn.sendMessage(from, { audio: { url: songUrl }, mimetype: 'audio/mp4' }, { quoted: m });
        reply("🎶 The song is ready! Please check your message.");
    } catch (e) {
        console.error(e);
        reply("❌ Something went wrong. Please try again later.");
    }
});
