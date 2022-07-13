export { populateAboutUsSection };

const TEAM_CONTAINER_ID = 'team-container';
const TEAM_MEMBERS = [
    {
        name: 'Kurt Bixby',
        firstName: 'Kurt',
        github: 'kurtbixby',
        mainImage: './assets/images/kurt1.jpg',
        iconImage: './assets/images/kurt1.jpg'
    },
    {
        name: 'Marian Fediuc',
        firstName: 'Marian',
        github: 'marianfediuc',
        mainImage: './assets/images/Marian_travel.JPG',
        iconImage: './assets/images/Marian_travel.JPG'
    },
    {
        name: 'Sierra Nutt',
        firstName: 'Sierra',
        github: 'SierraNN',
        mainImage: './assets/images/sierra1.png',
        iconImage: './assets/images/sierra1.png'
    },
    {
        name: 'Adam Wagh',
        firstName: 'Adam',
        github: 'adamwagh512',
        mainImage: './assets/images/penny.jpg',
        iconImage: './assets/images/adam.jpg'
    },
    {
        name: 'Callie Williams',
        firstName: 'Callie',
        github: 'calliebwill',
        mainImage: './assets/images/callie-dog.JPEG',
        iconImage: './assets/images/Callie.jpg'
    }
]

function populateAboutUsSection(teamContainer) {
    let memberOrder = shuffle([0, 1, 2, 3, 4]);
    let columns = teamContainer.children('.column');

    columns.each((index, element) => {
        let member = TEAM_MEMBERS[memberOrder[index]];
        let imgs = $(element).find('img');
        $(imgs[0]).attr('src', member.mainImage).attr('alt', `Picture of ${member.firstName}`);
        $(imgs[1]).attr('src', member.iconImage).attr('alt', `Picture of ${member.firstName}`);
        let ps = $(element).find('p');
        $(ps[0]).text(member.name);
        let a = $('<a>');
        a.attr('href', `https://github.com/${member.github}`);
        a.text(member.github);
        $(ps[1]).text('GitHub: ').append(a);
        // $(element).find('a').text(member.github).attr('href', ``);
    })
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}
