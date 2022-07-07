// Used on https://www.petpoisonhelpline.com/poisons/
let poisons = document.querySelectorAll('.open-close li');

for (var i = 2; i < poisons.length; i++) {
  let poison = poisons[i];
  let name = poison.children[0].textContent;
  let link = poison.children[0].children[0].getAttribute('href');
  let category = poison.children[1].textContent;
  
  let object = {name: name, link: link, category: category};
  console.log(JSON.stringify(object));
}