const MovieInfo = require('movie-info');
const { cmd } = require('../command');

// Register the "movie" command
cmd({
    pattern: "movie",
    desc: "Search for movies and get details",
    category: "search",
    filename: __filename,
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) {
            return reply("❌ Please provide a movie name to search (e.g., `.movie Inception`).");
        }

        await m.react("🎥");

        // Create an instance of MovieInfo
        const movie = new MovieInfo();

        // Search for movie by name
        const result = await movie.search(q);

        if (result.error) {
            return reply(`⚠️ No results found for "${q}". Please try another movie.`);
        }

        // Extract movie details from result
        const { Title, Year, Genre, Director, Actors, Plot, imdbRating, imdbID, Poster } = result;

        if (!Poster || Poster === "N/A") {
            return reply("❌ No thumbnail available for this movie.");
        }

        // Prepare the movie information message
        const movieMessage = `🎥 **Ｍᴏᴠɪᴇ Ｄᴇᴛᴀɪʟꜱ**:

🎬 **Ｔɪᴛʟᴇ:** ${Title}
📅 **Ｙᴇᴀʀ:** ${Year}
🎭 **Ｇᴇɴʀᴇ:** ${Genre}
🎞 **Ｄɪʀᴇᴄᴛᴏʀ:** ${Director}
👨‍👩‍👧‍👦 **Ａᴄᴛᴏʀs:** ${Actors}
⭐ **Ｉᴍᴅʙ Ｒᴀᴛɪɴɢ:** ${imdbRating}
📖 **Ｐʟᴏᴛ:** ${Plot}
🔗 **Ｉᴍᴅʙ Ｌɪɴᴋ:** [IMDB Link](https://www.imdb.com/title/${imdbID})`;

        // Send the thumbnail and details
        await conn.sendMessage(from, { image: { url: Poster }, caption: movieMessage }, { quoted: mek });

    } catch (error) {
        console.error('Movie search error:', error);
        reply("❌ An error occurred while searching for the movie. Please try again later.");
    }
});
