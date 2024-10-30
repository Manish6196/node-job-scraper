// scraper.js
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const BASE_URL = 'https://quotes.toscrape.com/'; // Example URL for jobs

async function scrapeQuotes() {
  try {
    const { data } = await axios.get(BASE_URL);
    const $ = cheerio.load(data);
    const quotes = [];

    $('.quote').each((index, card) => {
      const text = $(card).find('.text').text().trim();
      const author = $(card).find('.author').text().trim();
      const tags = [];
      $(card)
        .find('.tag')
        .each((index, tag) => {
          tags.push($(tag).text().trim());
        });

      quotes.push({ text, author, tags });
    });

    fs.writeFileSync('quotes.json', JSON.stringify(quotes, null, 2));
    console.log('Quotes data has been saved to quotes.json');
  } catch (error) {
    console.error('Error scraping data:', error);
  }
}

scrapeQuotes();
