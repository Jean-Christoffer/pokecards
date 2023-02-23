import FetchWrapper from "./components/helpers.js";
import selectorsDetailsPage  from "./components/cssSelectors.js"; 
import {capitalize,showSnackBar } from "./components/helpers.js";

const selected = selectorsDetailsPage.map(value => document.querySelector(value));
const [pokeName, pokemonImage, randomPokemon,
     abilityList, search,  form, hp,snackBar] = selected;

const loader = document.querySelector('.loader')
function loading(){
    loader.classList.remove('hidden-loader')
}
function loadingComplete(){
    loader.classList.add('hidden-loader')
}

const queryString = document.location.search;
const params  = new URLSearchParams(queryString);
const id = params.get("id");

let sum = 1;
let pokemonName;
let result = id;

//fetches pokemon based on query string from index page, pokemonName from search form or random result from sum variable
const getPokemon = async ()=>{
    const API = new FetchWrapper(`https://pokeapi.co/api/v2`);
    const data = await API.get(`/pokemon/${result ?? '1'}`);
    return data;
};

// fetches a random pokemon between 1 - 500
randomPokemon.addEventListener('click', ()=>{
    
    sum = Math.floor(Math.random() * 501);
    sum <= 0 ? sum = 1 : sum; //prevents 0 which does not exist, might be a better way to do this.
    result = sum;
    render();

});

//updates the pokemonName variable and fetches the pokemon based on the result
form.addEventListener('submit', (event)=>{
    event.preventDefault();

    search.value.length === 0 ? showSnackBar(snackBar,'Pokemon not found') :
    (pokemonName = search.value.toLowerCase().trim().replaceAll(' ', ''), //replacing spaces so that writing example Mew Two will show Mewtwo instead of throwing an error
    search.value = '', //resets the search input
    result = pokemonName, //updates the name variable
    render()); //render the page with the new pokemon

});

//renders the pokemon card. using createElement instead of innerHTML due to security reasons. its a public API
function renderPokemon(data) {
    abilityList.textContent = '';

    pokemonImage.src = data.sprites.other.dream_world.front_default;
    pokeName.textContent = data.name;
    document.title = `${capitalize(data.name)}`; 
    hp.textContent = `HP: ${data.stats.filter(stat => stat.stat.name.includes('hp'))
    .map(stat => stat.base_stat)}`;

    data.abilities.forEach(ability => {
        const p = document.createElement('li');
        p.textContent = `${capitalize(ability.ability.name)}`;
        p.classList.add = 'ability-info';
        abilityList.appendChild(p);
    });
}

// render function that calls the fetch function, render function.
async function render(){
    try {
        loading()
        const data = await getPokemon();
        renderPokemon(data);
    } catch (error) {
        console.error(error);
        showSnackBar(snackBar,'currently experiencing issues with the API, try again later')
    } finally{
        loadingComplete() //removes the loader after all the promises are resolved or rejected.
    }
};

render();




