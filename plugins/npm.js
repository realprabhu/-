const axios = require('axios');
const { cmd } = require('../command');
const { sleep } = require('../lib/functions');

// Register the "npmsearch" command to search for npm packages
cmd({
    pattern: "npm",
    desc: "Search for npm packages based on query",
    category: "search",  // Category for search-related commands
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) {
            return reply("❌ Please provide a search query (e.g., `.npmsearch weather`).");
        }

        await m.react("🔍");

        // Make a request to npm registry search API
        const searchUrl = `https://registry.npmjs.org/-/v1/search`;
        const params = {
            text: q,
            size: 5, // Number of results to show
        };

        axios.get(searchUrl, { params })
            .then(async (response) => {
                const data = response.data;

                if (data.objects.length === 0) {
                    return reply(`⚠️ No results found for "${q}". Try a different query.`);
                }

                let searchResults = `🔍 **Search results for "${q}"**:\n\n`;

                data.objects.forEach((result, index) => {
                    const pkgName = result.package.name;
                    const pkgDescription = result.package.description || "No description available.";
                    const pkgLink = result.package.links.npm;

                    searchResults += `
${index + 1}. **${pkgName}** 🎉
   - Description: ${pkgDescription} 📋
   - Link: [${pkgName} on npm](${pkgLink}) 🌐\n`;
                });

                // Send the search results
                reply(searchResults);
            })
            .catch((error) => {
                console.error(error);
                reply("❌ Error occurred while searching npm. Please try again later.");
            });
    } catch (e) {
        console.error(e);
        reply("❌ Something went wrong. Please try again later.");
    }
});
