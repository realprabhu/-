const { cmd } = require('../command');
const fetch = require('node-fetch');

cmd({
    pattern: "google",
    desc: "🌐 Perform a Google search 🔎",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { args, reply }) => {
    if (!args.length) {
        return reply("❌ Please provide a search query! Example: `.google Node.js` 🌐");
    }

    const query = encodeURIComponent(args.join(" "));
    const url = `https://www.google.com/search?q=${query}`;

    try {
        // Fetch Google search results
        const response = await fetch(url);
        const html = await response.text();

        // Extract search results using regex
        const regex = /<a href="\/url\?q=([^&]+)&amp;.*?">(.*?)<\/a>/g;
        let match;
        let results = [];
        while ((match = regex.exec(html)) !== null) {
            const link = decodeURIComponent(match[1]);
            const title = match[2].replace(/<.*?>/g, ""); // Remove HTML tags
            results.push({ title, link });
            if (results.length >= 5) break; // Limit to top 5 results
        }

        if (results.length > 0) {
            let responseText = `🌍 *Google Search Results for:* 🔍 _${args.join(" ")}_\n\n`;
            results.forEach((result, index) => {
                responseText += `⭐ ${index + 1}. *${result.title}*\n🔗 ${result.link}\n\n`;
            });
            reply(responseText.trim());
        } else {
            reply(`⚠️ No results found for: "${args.join(" ")}" 🌐`);
        }
    } catch (error) {
        console.error('Error:', error);
        reply("❌ An error occurred while searching. Please try again later.");
    }
});
