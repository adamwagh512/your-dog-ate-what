// import { knownToxins } from './known_toxins.js'
import { filteredToxins } from './filtered_toxins.js'

import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import Console from 'node:console';
import fs from 'node:fs';
import { filter } from 'domutils';

// console.log(knownToxins);

// This section was used to filter the master list down into something more manageable and relevant to our goals

// let wantedCategories = new Set(['foods', 'household items', 'metals', 'medications']);

// let categories = knownToxins.map(toxin => toxin.category.toLowerCase());
// let deDupedCategories = categories.reduce(function (allCategories, category) {
//     if (category in allCategories) {
//         allCategories[category]++;
//     } else {
//         allCategories[category] = 1;
//     }
//     return allCategories;
// }, {})
// console.log(deDupedCategories);
// // console.log(deDupedCategories.join(', '));

// let filteredToxins = knownToxins.filter(toxin => wantedCategories.has(toxin.category.toLowerCase()));
// console.log(filteredToxins);
// console.log(JSON.stringify(filteredToxins));

// filteredToxins.forEach(async toxin => {
// })

// https://qoob.cc/web-scraping/
// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
const sleep = ms => new Promise(r => setTimeout(r, ms));

const logger = new console.Console({
    stdout: fs.createWriteStream("./fullScrapedToxins.txt"),
    stderr: fs.createWriteStream("./errStdErr.txt")
});


for(var i = 0; i < filteredToxins.length; i++) {
    await sleep(1000);
    console.debug(`Scraping ${filteredToxins[i].name}`);
    scrapeToxin(filteredToxins[i]);
}

// scrapeToxin(filteredToxins[0]);

let toxicityMeterToxins = [];
let otherToxins = [];
// Function to load in the master toxins list and grab all of the alternate names and toxicity levels from the website linked in the data
async function scrapeToxin(toxin) {
    let url = toxin.link;
    // fetch(url)
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    // })
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);
    // console.debug($.html());
    let toxicityLevelImg = $('.toxi-range');
    if (toxicityLevelImg === undefined) {
        console.debug(`No meter for ${toxin.name}`);
        otherToxins.push(toxin);
    }

    console.debug(toxicityLevelImg);
    let imageUrl = toxicityLevelImg.data('image');
    console.debug(imageUrl);
    let toxicityLevel = 0;

    if (imageUrl !== undefined) {
        toxicityLevel = imageUrl.substring(imageUrl.length - 5, imageUrl.length - 4);
    } else {
        let bgImage = $('.toxi-level').css('background-image');
        let bgIUrl = bgImage.substring(5, bgImage.length - 2);
        toxicityLevel = bgIUrl.substring(bgIUrl.length - 5, bgIUrl.length - 4);
    }
    
    let alternateNames = $('.altenate-text').text();
    console.debug(alternateNames);

    toxin['alternateNames'] = alternateNames.split(', ');
    toxin['toxicityLevel'] = toxicityLevel;

    logger.log(JSON.stringify(toxin));

    // const data = await response.json();
    // console.log(data);

    // if find
    // toxicityMeterToxins.push(toxin);
    // else
    // otherToxins.push(toxin);
}