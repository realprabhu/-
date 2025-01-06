const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID,
ALIVE_MSG: process.env.ALIVE_MSG || "", // YOUR MSG HERE
ALIVE_IMG: process.env.ALIVE_IMG || "", // YOUR IMG HERE
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true", // PUT true OR false HERE..


};
