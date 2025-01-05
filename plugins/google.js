const { cmd } = require('../command'); // Import your command registration method
const googleIt = require('google-it'); // Import google-it package

cmd({
    pattern: "google",
    desc: "🌐 Search Google for a topic 🔍",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { args, reply }) => {
    if (!args.length) {
        return reply("❌ *Error:* Please provide a search query! Example: `.google Node.js` 🌐");
    }

    const query = args.join(" "); // Combine user arguments as search query

    try {
        const results = await googleIt({ query });

        if (results.length) {
            let response = `🌍 *Google Search Results for:* 🔍 _${query}_\n\n`;
            results.slice(0, 5).forEach((result, index) => {
                response += `⭐ ${index + 1}. *${result.title}*\n🔗 ${result.link}\n📄 ${result.snippet}\n\n`;
            });

            reply(response.trim());
        } else {
            reply(`⚠️ No results found for: "${query}".\n\n💡 *Tip:* Try searching for simpler or related terms! 🌐`);
        }
    } catch (e) {
        console.error(e);
        reply("❌ *Error:* Unable to perform the Google search. Please try again later! 🔧");
    }
});
