import { poisonsList } from "./data/poison_list.js";
export { determineInputToxicity };

var access_key = '6orO8TB9RRot89tK';
const POISON_SET = createPoisonSet(poisonsList);

function determineInputToxicity(eatenInput) {
    let requestURL = 'https://chompthis.com/api/v2/food/branded/name.php?api_key=6orO8TB9RRot89tK&name=' + eatenInput;

    // Search through poison list
    let poisonListMatch = determineFoodToxicity({ingredients: eatenInput});
    console.debug(poisonListMatch)
    if (poisonListMatch != 0) {
        return Promise.resolve(poisonListMatch);
    }

    return fetch(requestURL)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let foodItems = data.items;
    
        // Select certain items (1 = ???)
        // Determine if each item has toxins
        // Comparing ingred. list against our poison list
        let maxToxicity = 0;
        for (var i = 0; i < 5; i++) {
            let foodItem = foodItems[i];
            let toxicityLevel = determineFoodToxicity(foodItem);
            maxToxicity = Math.max(maxToxicity, toxicityLevel);
        }
        console.log(maxToxicity)
        return maxToxicity;
    })
}

// Return toxicity level 0, 1, 2, 3
// Unknown, mild, moderate, severe
function determineFoodToxicity(foodItem) {
    console.log(foodItem)
    // Parse the ingredients list string into ingredients
    let ingredients = parseIngredientsString(foodItem.ingredients);

    // Object of all the poisons names + alternate name with values of toxicity level

    let mostToxic = 0;
    for (var i = 0; i < ingredients.length; i++) {
        let ingredient = ingredients[i].toLowerCase();
        console.debug('Ingredient: ' + ingredient)
        // Check if in poisons
        if (POISON_SET[ingredient]) {
            console.debug('known poison')
            mostToxic = Math.max(mostToxic, POISON_SET[ingredient]);
        }
    }
    return mostToxic;
}

// Return an array of ingredients
function parseIngredientsString(ingredientsString) {
    let something = ingredientsString.replace(/[\[\]\(\).]/g, ',');
    let fewerCommas = something.replace(/,+/g, ',');
    let ingredients = fewerCommas.split(',');
    let fullyParsed = [];

    ingredients.forEach(ingredient => {
        if (ingredient.length != 0) {
            fullyParsed.push(ingredient.trim());
        }
    })

    return fullyParsed;
}

function createPoisonSet(specificPoisonsList) {
    let poisonSet = {}
    for (var i = 0; i < specificPoisonsList.length; i++) {
        let poison = specificPoisonsList[i];
        let toxicity = poison.toxicityLevel;
        if (toxicity == '') {
            continue;
        }
        let names = [];
        names.push(poison.name);
        names.forEach((name) => {
            let lowercase = name.toLowerCase();
            if (!poisonSet[lowercase]) {
                poisonSet[lowercase] = toxicity;
            }
        })
    }

    return poisonSet;
}