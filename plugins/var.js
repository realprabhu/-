const { cmd } = require('../command');
const EnvVar = require('../lib/mongodbenv');

cmd({
    pattern: "getvars",
    alias: ["envlist", "showenv"],
    desc: "Retrieve all environment variables",
    category: "owner",
    filename: __filename,
},
async (conn, mek, m, { reply, isOwner }) => {
    if (!isOwner) {
        return reply("❌ *You don't have permission to use this command.*");
    }

    try {
        // Fetch all environment variables from the database
        const allEnvVars = await EnvVar.find({});

        // Check if there are any variables
        if (!allEnvVars || allEnvVars.length === 0) {
            return reply("🔍 *No environment variables found in the database.*");
        }

        // Format the variables into a readable message
        let envMessage = "🔧 *Environment Variables:*\n\n";
        allEnvVars.forEach((env) => {
            envMessage += `🧚‍♀️ *${env.key}*: ⚙️ ${env.value}\n`;
        });

        // Reply with the formatted list
        reply(envMessage + `\n\n> Powered By Charuka™`);
    } catch (err) {
        console.error("Error retrieving environment variables:", err.message);
        reply("⚠️ *An error occurred while retrieving the environment variables.*\n\nPlease check the logs for details.");
    }
});
