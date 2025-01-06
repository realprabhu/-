const { fetchJson } = require('../lib/functions');
const {cmd} = require('../command');

cmd({
  pattern: "ai",
  desc: "ai chat bot",
  category: "tools",
  filename: __filename
  
},
    async(conn, mek, m,{from}
)
