const axios = require("axios");
const { cmd } = require("../command");

const OMDB_API_KEY = "450c4718"; // Using your provided API key

cmd({
    pattern: "movie",
    desc: "Search for movies and get details",
    category: "search",
    filename: __filename,
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        if (!q) {
            return reply("❌ Please provide a movie name or IMDb ID to search (e.g., `.movie Inception` or `.movie tt3896198`).");
        }

        await m.react("🎥");

        // Construct API URL (detect IMDb ID or title query)
        const apiUrl = q.startsWith("tt")
            ? `https://www.omdbapi.com/?i=${q}&apikey=${OMDB_API_KEY}`
            : `https://www.omdbapi.com/?t=${encodeURIComponent(q)}&apikey=${OMDB_API_KEY}`;

        // Fetch movie data
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.Response === "False") {
            return reply(`⚠️ No results found for "${q}". Please try another movie.`);
        }

        // Extract movie details
        const { Title, Year, Genre, Director, Actors, Plot, imdbRating, Poster } = data;

        // Prepare movie information message
        const movieMessage = `🎥 **Ｍᴏᴠɪᴇ Ｄᴇᴛᴀɪʟꜱ**:

🎬 **Ｔɪᴛʟᴇ:** ${Title}
📅 **Ｙᴇᴀʀ:** ${Year}
🎭 **Ｇᴇɴʀᴇ:** ${Genre}
🎞 **Ｄɪʀᴇᴄᴛᴏʀ:** ${Director}
👨‍👩‍👧‍👦 **Ａᴄᴛᴏʀs:** ${Actors}
⭐ **Ｉᴍᴅʙ Ｒᴀᴛɪɴɢ:** ${imdbRating}
📖 **Ｐʟᴏᴛ:** ${Plot}`;

        // Send the poster image with the movie details
        if (Poster && Poster !== "N/A") {
            await conn.sendMessage(from, { image: { url: Poster }, caption: movieMessage }, { quoted: mek });
        } else {
            reply(movieMessage); // Send only text if no poster is available
        }
    } catch (error) {
        console.error("Movie search error:", error);
        reply("❌ An error occurred while searching for the movie. Please try again later.");
    }
});
