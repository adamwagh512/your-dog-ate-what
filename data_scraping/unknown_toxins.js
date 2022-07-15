// Used to make a list of toxins that needed their data to be manually determined and entered
import { poisonsList } from './poison_list.js';

console.log(poisonsList)
let unknowns = poisonsList.filter(poison => poison.toxicityLevel === '');
console.log(unknowns);
unknowns.forEach((unknown) => console.log(JSON.stringify(unknown)));