const { cmd } = require('../command'); // Import your command registration method
const googleIt = require('google-it'); // Import google-it package

cmd({
    pattern: "google",
    desc: "🌐 Perform a Google search and get top results 🔎",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { args, reply }) => {
    if (!args.length) {
        return reply("❌ *Error:* Please provide a search query!\n\nExample: `.google Node.js` 🌐");
    }

    const query = args.join(" "); // Combine user input into a search query

    try {
        // Perform Google search using google-it
        const results = await googleIt({ query });

        if (results && results.length > 0) {
            // Prepare the response with top 5 results
            let response = `🌍 *Google Search Results for:* 🔍 _${query}_\n\n`;
            results.slice(0, 5).forEach((result, index) => {
                response += `⭐ ${index + 1}. *${result.title}*\n🔗 ${result.link}\n📄 ${result.snippet}\n\n`;
            });

            reply(response.trim()); // Send the formatted response
        } else {
            reply(`⚠️ No results found for: "${query}".\n\n💡 *Tip:* Try a different or simpler query! 🌐`);
        }
    } catch (error) {
        console.error(error);
        reply("❌ *Error:* Unable to complete the search. Please check your connection or try again later! 🔧");
    }
});
