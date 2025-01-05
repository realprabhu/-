const { cmd } = require('../command'); // Import your command registration method
const wiki = require('wikipedia'); // Import wikipedia package

// Register the "wiki" command
cmd({
    pattern: "wiki",
    desc: "Search for a topic on Wikipedia",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { args, reply }) => {
    if (!args.length) {
        return reply("Please provide a topic to search on Wikipedia!");
    }

    const query = args.join(" "); // Combine all arguments as the search query

    try {
        await m.react("🔍");
        // Fetch summary from Wikipedia
        const page = await wiki.page(query); 
        const summary = await page.summary();

        if (summary.extract) {
            reply(`*Wikipedia Search*\n\n📚 *Title:* ${summary.title}\n\n${summary.extract}\n\n🔗 [Read more on Wikipedia](${summary.content_urls.desktop.page})Ｗʜɪꜱᴘᴇʀ ᴹᴰ🧚‍♀️`);
        } else {
            reply("Sorry, I couldn't find anything on that topic.");
        }
    } catch (e) {
        console.error(e);
        reply("An error occurred while searching Wikipedia.");
    }
});
