import FetchWrapper from "./components/helpers.js";
import variables  from "./components/cssSelectors.js"; 
import { capitalize } from "./components/helpers.js";

const selected = variables.map(value => document.querySelector(value));
const [pokeName, pokemonImage, randomPokemon, abilityList, search,  form, hp] = selected;

const queryString = document.location.search;
const params  = new URLSearchParams(queryString);
const id = params.get("id");

let sum = 2;
let pokemonName;
let result = id;

const pokeDex = async ()=>{
    const API = new FetchWrapper(`https://pokeapi.co/api/v2`);
    const data = await API.get(`/pokemon/${result ?? '1'}`);
    return data;
};

randomPokemon.addEventListener('click', ()=>{
    
    sum = Math.floor(Math.random() * 301);
    sum <= 0 ? sum = 1 : sum;
    result = sum;
    updatePokemon();

});

form.addEventListener('submit', (event)=>{
    event.preventDefault();

    search.value.length === 0 ? alert('Please enter a pokemon') :
    (pokemonName = search.value.toLowerCase().trim(),
    search.value = '',
    result = pokemonName,
    updatePokemon());

});

function updateUI(data) {
    abilityList.innerHTML = '';

    pokemonImage.src = data.sprites.other.dream_world.front_default;
    pokeName.textContent = data.name; 
    hp.textContent = `HP: ${data.stats.filter(stat => stat.stat.name.includes('hp'))
    .map(stat => stat.base_stat)}`;

    data.abilities.forEach(ability => {
        const p = document.createElement('li');
        p.textContent = `${capitalize(ability.ability.name)}`;
        p.classList.add = 'ability-info';
        abilityList.appendChild(p);
    });
}

async function updatePokemon(){
    try {
        const data = await pokeDex();
        updateUI(data); 
    } catch (error) {
        console.error('Trouble fetching data :(', error);
    };
};

updatePokemon();





