const { cmd } = require('../command'); // Import your command registration method
const googleIt = require('google-it'); // Import google-it package

// Register the "google" command
cmd({
    pattern: "google",
    desc: "🌐 Search for a topic on Google 🔎",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { args, reply }) => {
    if (!args.length) {
        return reply("❌ Please provide a search term for Google! 🌐");
    }

    const query = args.join(" "); // Combine all arguments as the search query

    try {
        // Perform Google search
        const results = await googleIt({ query });

        if (results.length) {
            // Prepare the first 5 results
            let response = `🌍 *Google Search Results for:* 🔎 _${query}_\n\n`;
            results.slice(0, 5).forEach((result, index) => {
                response += `⭐ ${index + 1}. *${result.title}*\n🔗 ${result.link}\n📄 ${result.snippet}\n\n`;
            });

            reply(response.trim());
        } else {
            reply("⚠️ No results found for your search query. Try another one! 🌐");
        }
    } catch (e) {
        console.error(e);
        reply("❌ An error occurred while performing the Google search. Please try again later! 🔧");
    }
});
