const SUPERHERO_TOKEN = "5556900414399603";
const BASE_URL = `https://www.superheroapi.com/api.php/${SUPERHERO_TOKEN}`;
const NewHeroBtn = document.getElementById("newHero");
const searchbutton = document.getElementById("searchbutton");
const searchInput = document.getElementById("searchinput");
const imagediv = document.getElementById("imagediv");

const getSuperHero = (id, name) => {
  fetch(`${BASE_URL}/${id}`)
    .then((response) => response.json())
    .then((json) => {
      const superHero = json;
      showHeroInfo(superHero);
    });
};

const statEmoji = {
  intelligence: "🧠",
  strength: " 💪 ",
  speed: "⚡",
  durability: "🏋️‍♀️",
  power: "💢",
  combat: "⚔",
};

const showHeroInfo = (character) => {
  const name = `<h2 class="hero-name">${character.name}</h2>`;
  const img = `<img src="${character.image.url}" width="300" height=300"/>`;

  const stats = Object.keys(character.powerstats)
    .map((stat) => {
      return `<p class="attributes">${statEmoji[stat]} ${stat.toUpperCase()}: ${
        character.powerstats[stat]
      }</p>`;
    })
    .join(",");
  imagediv.innerHTML = `${name}  ${img} ${stats}`;
};

const searchHero = (name) => {
  console.log(searchInput.value);
  fetch(`${BASE_URL}/search/${name}`)
    .then((response) => response.json())
    .then((json) => {
      const hero = json.results[0];
      showHeroInfo(hero);
    });
};

const getRandom = () => {
  const numberOfHero = 731;
  return Math.floor(Math.random() * numberOfHero) + 1;
};

NewHeroBtn.onclick = () => {
  getSuperHero(getRandom());
};
searchbutton.onclick = () => searchHero(searchInput.value);
