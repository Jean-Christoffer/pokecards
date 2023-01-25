import FetchWrapper from "./components/helpers.js";
import { variables2 } from "./components/cssSelectors.js";
import { capitalize } from "./components/helpers.js";

const selected = variables2.map(value => document.querySelector(value));
const [ search, container] = selected;

const getPokemonList = async ()=>{
        const API = new FetchWrapper('https://pokeapi.co/api/v2/');
        const data = await API.get(`pokemon?limit=300&offset=0`);
        return data;
};

const getPokemonImage = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.sprites.front_default;
};

 async function render(query = ''){
    const data = await getPokemonList();

    const cleaner = query.trim().toLocaleLowerCase();
    const filtered = data.results.filter(pokemon => pokemon.name
    .toLocaleLowerCase().includes(cleaner));
    container.innerHTML = '';

    filtered.map(async (pokemon) => {
        const imageUrl = await getPokemonImage(pokemon.url);
        container.insertAdjacentHTML("beforeend",
        `<div class="pokemon-business-card">
        <h2>${capitalize(pokemon.name)}</h2>
        <div class="img-wrapper">
            <img src="${imageUrl}">
        </div>
        <a href="index.html?id=${pokemon.name}" class = "info-link">Info</a>
        </div>`);
    });

};

search.addEventListener('keyup',()=>{
    render(search.value);
});

render();


