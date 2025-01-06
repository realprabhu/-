const axios = require('axios');
const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');

// Register the "npmsearch" command to search for npm packages
cmd({
    pattern: "ai",
    desc: "Search for npm packages based on query",
    category: "ai",  // Category for search-related commands
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) => {
    try {
        let data=
 }catch(e){
   console.log('e')
    reply(`${e}`)
}
