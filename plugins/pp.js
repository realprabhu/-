const fs = require('fs');
const { cmd } = require('../command');

// 🔄--------SET PROFILE PHOTO--------//
cmd({
    pattern: "pp",
    alias: ["profilepic", "setprofile"],
    desc: "Set bot's profile picture",
    category: "admin",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, isAdmin, isCreator, reply }) => {
    try {
        // Check if the user is authorized to set the profile picture
        if (!isAdmin && !isCreator) {
            return reply("🚫 You are not authorized to use this command!");
        }

        // Ensure an image is provided
        if (!quoted || quoted.type !== "imageMessage") {
            return reply("> ⚠️ Please reply to an image to set it as the profile picture.");
        }

        // Download the quoted image
        const media = await conn.downloadAndSaveMediaMessage(quoted, "profile.jpg");

        // Set the profile photo
        await conn.updateProfilePicture(from, { url: media });

        // Delete the local image after setting
        fs.unlinkSync(media);

        // Confirm success
        reply("> ✅ Profile picture updated successfully!");
    } catch (error) {
        console.error("Error setting profile picture:", error);
        reply("> ❌ An error occurred while setting the profile picture. Please try again.");
    }
});
