
var access_key = '6orO8TB9RRot89tK';
var userInput = "Cheese";

const poisonsList = [
    {"name":"ACE-inhibitors","link":"https://www.petpoisonhelpline.com/poison/ace-inhibitors/","category":"Medications","alternateNames":[" angiotensin-converting enzyme inhibitor","enalapril","captopril","lisinopril","ramipril","imidapril","benazepril","Enacard","Lotensin","Capoten","Vasotec","Prinivel","Zestril","fosinopril","moexipril","perindopril","quinapril","trandolapril "],"toxicityLevel":"1"},
    {"name":"Acetaminophen","link":"https://www.petpoisonhelpline.com/poison/acetaminophen/","category":"medications","alternateNames":["Tylenol","paracetamol","APAP","Percocet","Panadol","Excedrin","Feverall"],"toxicityLevel":"3"},
    {"name":"Acids","link":"https://www.petpoisonhelpline.com/poison/acids/","category":"household items","alternateNames":["acid","acidic","battery","batteries","battery fluid","drain cleaner","toilet bowl cleaner","sulfuric acid","danger","hydrochloric acid","acetic acid","metal cleaners","pH","anti-rust compounds","hair wave neutralizers","drain cleaners"],"toxicityLevel":"4"},
    {"name":"Alcohol","link":"https://www.petpoisonhelpline.com/poison/alcohol/","category":"foods","alternateNames":["alcohol","mixed drinks","beer","liquor","ethanol","unbaked bread dough","yeast","wine","spirits","cocktails"],"toxicityLevel":"2"},
    {"name":"Alkalis","link":"https://www.petpoisonhelpline.com/poison/alkalis/","category":"household items","alternateNames":["alkaline","pH","base","sodium hypochlorite","bleach","dishwasher detergent","batteries","dry cell batteries","cement","drain cleaner","hair relaxer","lye","oven cleaner","danger","caustic","hydroxide"],"toxicityLevel":"4"},
    {"name":"Ambien","link":"https://www.petpoisonhelpline.com/poison/ambien/","category":"medications","alternateNames":["Lunesta","Ambien","zolpidem","eszopiclone","zaleplon","Sonata"],"toxicityLevel":"2"},
    {"name":"Amphetamines","link":"https://www.petpoisonhelpline.com/poison/amphetamines/","category":"medications","alternateNames":["ADD medication","ADHD medication","methylphenidate","ecstasy","methylphenidate","dextroamphetamine","amphetamine","Adderall","D-amphetamine","Dexedrine","methamphetamine","Desoxyn","lisdexamfetamine","Vyvanse"],"toxicityLevel":"4"},
    {"name":"Antibiotics","link":"https://www.petpoisonhelpline.com/poison/antibiotic/","category":"medications","alternateNames":["neosporin","triple antibiotic","bacitracin","neomycin","polymyxin","topical","enrofloxacin","ampicillin","amoxicillin","Clavamox","Baytril","Keflex","cephalosporins","isoniazid"],"toxicityLevel":"4"},
    {"name":"Antidepressants","link":"https://www.petpoisonhelpline.com/poison/antidepressants/","category":"medications","alternateNames":["SSRIs","antidepressants","selective serotonin reuptake inhibitors","Cymbalta","Effexor","Prozac","Reconcile","fluoxetine","citalopram","escitalopram","paroxetine","sertraline","Celexa","Lexapro","Paxil","Zoloft","selective norepinephrine re-uptake inhibitors","SNRIs","duloxetine","nefazodone","Serzone","venlafaxine"],"toxicityLevel":""},
    {"name":"Antihistamines","link":"https://www.petpoisonhelpline.com/poison/antihistamine/","category":"medications","alternateNames":["Benadryl","Caldryl","Dermamycin","Ziradryl","diphenhydramine","DPH"],"toxicityLevel":"4"}
];

//generateBtn.addEventListener("click", writeItem);

        // $.ajax({ 
        //     type: 'GET',
        //     url: 'https://chompthis.com/api/v2/food/branded/name.php?api_key=6orO8TB9RRot89tK&name=' + userInput,
        //     dataType: 'json',
        //     success: function(data) {
                
        //         for (i=0; i< data.items.length; i++){
        //             console.log(data.items[i])
        //             console.log(data.items[i].ingredients)
        //         }
        //     }         
        // });

let requestURL = 'https://chompthis.com/api/v2/food/branded/name.php?api_key=6orO8TB9RRot89tK&name=' + userInput;

fetch(requestURL)
.then((response) => {
    return response.json();
})
.then((data) => {

    let foodItems = data.items;

    // Select certain items (1 = ???)
    // Determine if each item has toxins
    // Comparing ingred. list against our poison list
    let foodItem = foodItems[0];
    let toxicityLevel = determineFoodToxicity(foodItem);
    return toxicityLevel;
})

// Return toxicity level 0, 1, 2, 3
// Unknown, mild, moderate, severe
function determineFoodToxicity(foodItem) {
    // Parse the ingredients list string into ingredients
    let ingredients = parseIngredientsString(foodItem.ingredients);

    // Object of all the poisons names + alternate name with values of toxicity level
    let processedPoisons = createPoisonSet(poisonsList);

    let mostToxic = 0;
    for (var i = 0; i < ingredients.length; i++) {
        let ingredient = ingredients[i];
        // Check if in poisons
        if (Object.hasOwn(processedPoisons, ingredient)) {
            mostToxic = Math.max(mostToxic, processedPoisons[ingredient]);
        }
    }
    return mostToxic;
}

function createPoisonSet(specificPoisonsList) {
    let poisonSet = {}
    specificPoisonsList.forEach(poison => {
        let toxicity = poison.toxicityLevel;
        poison.name = toxicity;
            poison.alternateNames.forEach(name => {
            poisonSet[name] = toxicity;
        })
    });

    return poisonSet;
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
