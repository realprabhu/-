const axios = require('axios');

async function wikiSearch(query) {
    try {
        const response = await axios.get('https://en.wikipedia.org/w/api.php', {
            params: {
                action: 'query',
                format: 'json',
                list: 'search',
                srsearch: query,
                utf8: 1
            }
        });

        const searchResults = response.data.query.search;
        if (searchResults.length === 0) {
            return `No results found for "${query}".`;
        }

        let result = `🌐 *Wikipedia Search Results for:* _${query}_\n\n`;
        searchResults.slice(0, 5).forEach((item, index) => {
            result += `*${index + 1}. ${item.title}*\n${item.snippet.replace(/<\/?[^>]+(>|$)/g, '')}...\nhttps://en.wikipedia.org/wiki/${item.title.replace(/ /g, '_')}\n\n`;
        });

        return result;
    } catch (error) {
        return `Error fetching Wikipedia data. Please try again later.`;
    }
}

module.exports = wikiSearch;
