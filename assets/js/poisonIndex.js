import { poisonsList } from "./data/poison_list.js";

const poisonIndexHolder = $('#poison-index-holder');

// Initializes the poison index
function init() {
    buildPoisonIndex(poisonsList);
    $('.letter-section h2').on('click', (event) => {
        $(event.currentTarget).parent().toggleClass('is-open');
    });
}

// The main create function
// Makes the index from the supplied poison list
function buildPoisonIndex(poisonList) {
    let poisonElements = {};
    poisonList.forEach((poison) => {
        // Build element
        let poisonElement = buildPoisonElement(poison);
        let poisonStartingChar = poison.name[0];

        // If the poisons starts with a number, group it into #
        if ('0' <= poisonStartingChar && poisonStartingChar <= '9') {
            poisonStartingChar = '#';
        }

        // Group each element into its letter
        // If we don't have a pool for this letter, make one
        if (!Object.hasOwn(poisonElements, poisonStartingChar)) {
            poisonElements[poisonStartingChar] = [];
        }
        // Push the newly created element into that pool
        poisonElements[poisonStartingChar].push(poisonElement);
    })

    // Object.entries returns an array of [key, value] for all properties in the object
    // Letter is the grouping and poisons is an array of poison elements to be appended
    for (const [letter, poisons] of Object.entries(poisonElements)) {
        let letterSection = buildLetterSectionElement(letter);
        $(letterSection).children('ul').append(poisons);
        poisonIndexHolder.append(letterSection);
    }
}

// Build element = create element + populate element
function buildPoisonElement(poison) {
    let poisonElement = createEmptyPoisonElement();
    populatePoisonElement(poisonElement, poison);
    return poisonElement;
}

function createEmptyPoisonElement() {
    // Add classes and the like to these
    let listItem = $('<li>').addClass('columns is-mobile is-gapless p-3');
    let poisonName = $('<p>').addClass('column is-half has-text-centered');
    let toxicity = $('<p>').addClass('column is-half has-text-centered');

    return listItem.append(poisonName, toxicity);
}

function populatePoisonElement(poisonElement, poison) {
    $(poisonElement.children('p')[0]).text(poison.name);

    // Add class depending on toxicity
    // This functionality is never exploited
    let severityString = '';
    let severityClass = '';
    switch(poison.toxicityLevel) {
        case '1':
            severityString = 'Mild Toxicity';
            severityClass = 'mild-hazard';
            break;
        case '2':
        case '3':
            severityString = 'Moderate Toxicity';
            severityClass = 'moderate-hazard';
            break;
        case '4':
        case '5':
            severityString = 'Severe Toxicity';
            severityClass = 'severe-hazard';
            break;
        default:
            severityString = 'Unknown Toxicity';
            severityClass = 'unknown-hazard';
            break;
    }
    $(poisonElement.children('p')[1]).text(severityString).addClass(severityClass);
}

// No populate function, because populate is just one line
function buildLetterSectionElement(letter) {
    let sectionElement = createEmptyLetterSectionElement();
    sectionElement.children('h2').text(letter);
    return sectionElement;
}

function createEmptyLetterSectionElement() {
    // Add classes and the like to these
    let section = $('<section>').addClass('has-text-centered letter-section');
    let letter = $('<h2>').addClass('title is-size-6');
    let list = $('<ul>');

    return section.append(letter, list);
}

init()
