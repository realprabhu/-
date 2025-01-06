const axios = require("axios");
const cheerio = require("cheerio");
const { cmd } = require("../command");

// Command to search for APK files
cmd({
    pattern: "apk",
    desc: "Search for APKs on APKPure",
    category: "utilities",
    filename: __filename,
}, 
async (conn, mek, m, { args, reply, from }) => {
    if (args.length === 0) {
        return reply("❌ Please provide an app name. Example: `.apk WhatsApp`");
    }

    const query = args.join(" ");
    const url = `https://apkpure.com/search?q=${encodeURIComponent(query)}`;

    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        // Extract app details
        const results = [];
        $(".search-dl .search-title").each((i, element) => {
            const title = $(element).text().trim();
            const link = "https://apkpure.com" + $(element).find("a").attr("href");
            results.push({ title, link });
        });

        if (results.length === 0) {
            return reply(`❌ No results found for "${query}".`);
        }

        // Format results
        let message = `╭───❰ 📱 *APK Search Results* ❱───✧\n`;
        results.slice(0, 5).forEach((app, index) => {
            message += `├─ 🏷️ *${index + 1}. ${app.title}*\n`;
            message += `├─ 🔗 [Download Link](${app.link})\n`;
        });
        message += `╰───────────────────────✧\n\n > Powered by Ｗʜɪꜱᴘᴇʀ ᴹᴰ🧚‍♀️`;

        await conn.sendMessage(from, { text: message }, { quoted: mek });

    } catch (e) {
        console.error("Error fetching APK details:", e);
        reply("❌ An error occurred while searching for APKs. Please try again later.");
    }
});
