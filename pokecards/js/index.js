import FetchWrapper from "./components/helpers.js";
import { variables2 } from "./components/cssSelectors.js";
import { capitalize, showSnackBar } from "./components/helpers.js";


const selected = variables2.map(value => document.querySelector(value));
const [ search, container,snackBar] = selected;

//fetches the api based on the fetchwrapper class, makes it easier to read
const getPokemonList = async ()=>{
        const API = new FetchWrapper('https://pokeapi.co/api/v2/');
        const data = await API.get(`pokemon?limit=300&offset=0`);
        return data;
};

//gets pokemon image from the url inside the pokemonList
const getPokemonImage = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.sprites.front_default;
};

//search function which renders the page based on the search input value, it filters the results in real time
 async function render(query = ''){
    try{
        const data = await getPokemonList();

        const cleaner = query.trim().toLocaleLowerCase();
        const filtered = data.results.filter(pokemon => pokemon.name
        .toLocaleLowerCase().includes(cleaner));
        container.textContent = ''
            //avoiding innerHTML due to it being a public API where everyone can contribute
        filtered.map(async (pokemon) => {
            const imageUrl = await getPokemonImage(pokemon.url);

            const divContainer = document.createElement('div')
            divContainer.className = 'pokemon-business-card'

            const pokemonTitle = document.createElement('h2')
            pokemonTitle.textContent = `${capitalize(pokemon.name)}`
            divContainer.appendChild(pokemonTitle)

            const imgWrapper = document.createElement('div')
            const pokemonImg = document.createElement('img')
            pokemonImg.src = `${imageUrl}`
            imgWrapper.appendChild(pokemonImg)
            divContainer.appendChild(imgWrapper)

            const pokemonLink = document.createElement('a')
            pokemonLink.href = `details.html?id=${pokemon.name}`
            pokemonLink.className = 'info-link'
            pokemonLink.textContent = 'Info'
            divContainer.appendChild(pokemonLink)

            container.appendChild(divContainer)
           
        });
    } catch(error){
        console.error(error)
        showSnackBar(snackBar,'currently experiencing issues with the API, try again later')
    }


};

search.addEventListener('keyup',()=>{
    render(search.value);
});

render();



