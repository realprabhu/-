const TikTokScraper = require('tiktok-scraper');
const { cmd } = require('../command');

// 🔍--------TIKTOK-SEARCH--------//
cmd({
    pattern: "tts",
    alias: ["ttsearch", "tiksearch"],
    desc: "Search TikTok videos",
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("> ᴘʟᴇᴀꜱᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ Qᴜᴇʀʏ...⭐");

        // React with 🔍 and show searching text
        await conn.sendMessage(from, { react: { text: "🔍", key: mek.key } });
        reply("> ꜱᴇᴀʀᴄʜɪɴɢ ꜰᴏʀ ʏᴏᴜʀ ʀᴇϙᴜᴇꜱᴛ... 🔎");

        // Perform TikTok search
        const results = await TikTokScraper.search(q, { number: 5 });
        if (!results || !results.items || !results.items.length) {
            return reply("> ɴᴏ ʀᴇꜱᴜʟᴛꜱ ꜰᴏᴜɴᴅ ᴏɴ ᴛɪᴋᴛᴏᴋ!❌");
        }

        // Prepare the results message
        let searchMessage = `*⭐ -ᴛᴏᴘ 5 ᴛɪᴋᴛᴏᴋ ᴠɪᴅᴇᴏ ꜱᴇᴀʀᴄʜ ʀᴇꜱᴜʟᴛꜱ- ⭐*\n\n`;
        results.items.slice(0, 5).forEach((video, index) => {
            searchMessage += `╭─────────────✑\n`;
            searchMessage += `◉ *${index + 1}. ${video.text}*\n\n`;

            searchMessage += `01• *ᴠɪᴇᴡꜱ🧿*: ${video.stats.diggCount} \n`;
            searchMessage += `02• *ʟɪᴋᴇs👍*: ${video.stats.diggCount} \n`;
            searchMessage += `03• *ᴄᴏᴍᴍᴇɴᴛs💬*: ${video.stats.commentCount} \n`;
            searchMessage += `04• *ᴅᴏᴡɴʟᴏᴀᴅ ʟɪɴᴋ🔗*: ${video.videoUrl} \n\n`;  // Video link
            searchMessage += `╰─────────────✑\n`;
        });

        // Append powered by branding
        searchMessage += `\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ ✨ *Whisper MD 🧚‍♀️* ✨\n`;

        // Send the search results with a video thumbnail
        await conn.sendMessage(from, {
            image: { url: results.items[0].imageUrl },  // Using the thumbnail of the first search result
            caption: searchMessage
        }, { quoted: mek });

        // React with ✅ when the results are sent
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });
        reply("> ʀᴇꜱᴜʟᴛꜱ ꜱᴇɴᴛ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ... ✅");

    } catch (e) {
        console.error("Error:", e);
        reply("> ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ꜱᴇᴀʀᴄʜɪɴɢ. ᴘʟᴇᴀꜱᴇ ᴛʀʏ ᴀɢᴀɪɴ ʟᴀᴛᴇʀ.❌");
    }
});
