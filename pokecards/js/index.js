import FetchWrapper from "./components/helpers.js";
import { variables2 } from "./components/cssSelectors.js";
import { capitalize, showSnackBar } from "./components/helpers.js";

let totalAmountOfItems = 32


const nextPage = document.querySelector('.next')
const previousPage = document.querySelector('.previous')


const selected = variables2.map(value => document.querySelector(value));
const [ search, container,snackBar] = selected;

//fetches the api based on the fetchwrapper class, makes it easier to read
const getPokemonList = async (page)=>{
        const API = new FetchWrapper('https://pokeapi.co/api/v2/');
        const data = await API.get(`pokemon?limit=${totalAmountOfItems}&offset=${(page - 1) * totalAmountOfItems}`);
        return data;
};

//gets pokemon image from the url inside the pokemonList
const getPokemonImage = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.sprites.front_default;
};

let currentPage = 1

//search function which renders the page based on the search input value, it filters the results in real time
 async function render(query = ''){
    try{
        const data = await getPokemonList(currentPage);

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



nextPage.addEventListener('click',() => {
    currentPage ++
    render()
})

previousPage.addEventListener('click',()=>{
    currentPage --
    render()
})

search.addEventListener('keyup',()=>{
    render(search.value);

});

render();



