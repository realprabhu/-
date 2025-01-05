const { cmd } = require('../command');
const BingSearch = require('bing-search-api');
const { sleep } = require('../lib/functions');

// Register the "bingsearch" command to perform Bing search
cmd({
    pattern: "bingsearch",
    desc: "Search on Bing and return results",
    category: "search",  // Category for search-related commands
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        // Ensure the query exists
        if (!q) {
            return reply("❌ Please provide a search query!");
        }
        
        await m.react("🔍");
        
        // Perform Bing search using the query
        BingSearch.search({ query: q, count: 5, safesearch: 'Moderate' })
            .then(async (results) => {
                if (results.length === 0) {
                    return reply("⚠️ No results found for your search query. Try another one! 🌐");
                }
                
                let message = `🔍 **Search Results for: ${q}**\n\n`;
                
                // Loop through the first 5 results and format them
                results.forEach((result, index) => {
                    message += `\n${index + 1}. [${result.name}](${result.url})\n${result.snippet}\n`;
                });
                
                // Send the results back
                reply(message);
            })
            .catch((error) => {
                console.error(error);
                reply("❌ An error occurred while searching. Please try again later.");
            });
        
    } catch (e) {
        console.error(e);
        reply("❌ Something went wrong. Please try again later.");
    }
});
