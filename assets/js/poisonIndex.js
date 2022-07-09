import { poisonsList } from "./data/poison_list.js";

const poisonIndexHolder = $('#poison-index-holder');


// Add on click for the poison sections

function buildPoisonIndex(poisonList) {
    let poisonElements = {};
    poisonsList.forEach((poison) => {
        // Build element
        let poisonElement = buildPoisonElement(poison);
        let poisonStartingChar = poison.name[0];

        // If the poisons starts with a number, group it into #
        if ('0' <= poisonStartingChar && poisonStartingChar <= '9') {
            poisonStartingChar = '#';
        }
        // Group each element into its letter
        if (!poisonElements.hasOwn(poisonStartingChar)) {
            poisonElements[poisonStartingChar] = [];
        }
        poisonElements[poisonStartingChar].push(poisonElement);
    })

    // Object.entries returns an array of [key, value] for all properties in the object
    for (const [letter, poisons] of Object.entries(poisonElements)) {
        let letterSection = buildLetterSectionElement(letter);
        $(letterSection).children('ul').append(poisons);
        poisonIndexHolder.append(letterSection);
    }
}

function buildPoisonElement(poison) {
    let poisonElement = createEmptyPoisonElement();
    populatePoisonElement(poisonElement, poison);
    return poisonElement;
}

function createEmptyPoisonElement() {
    // Add classes and the like to these
    let listItem = $('<li>');
    let poisonName = $('<p>');
    let toxicity = $('<p>');

    return listItem.append(poisonName, toxicity);
}

function populatePoisonElement(poisonElement, poison) {
    $(poisonElement.children('p')[0]).text(poison.name);

    // Add class depending on 
    let severityString = '';
    let severityClass = '';
    switch(poison.toxicityLevel) {
        case 1:
            poisonString = 'Mild Toxicity';
            severityClass = 'mild-hazard';
            break;
        case 2:
        case 3:
            poisonString = 'Moderate Toxicity';
            severityClass = 'moderate-hazard';
            break;
        case 4:
        case 5:
            poisonString = 'Severe Toxicity';
            severityClass = 'severe-hazard';
            break;
    }
    $(poisonElement.children('p')[1]).text(severityString).addClass(severityClass);
}

function buildLetterSectionElement(letter) {
    let sectionElement = createEmptyLetterSectionElement();
    sectionElement.children('h2').text(letter);
    return letterSection;
}

function createEmptyLetterSectionElement() {
    // Add classes and the like to these
    let section = $('<section>');
    let letter = $('<h2>');
    let list = $('<ul>');

    return section.append(letter, list);
}