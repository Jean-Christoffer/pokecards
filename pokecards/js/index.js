import FetchWrapper from "./components/helpers.js";
import { variables2 } from "./components/cssSelectors.js";
import { capitalize, showSnackBar } from "./components/helpers.js";

const loader = document.querySelector('.loader')

window.addEventListener('load',()=>{
    loading()
})

function loading(){
    loader.classList.add('hidden-loader')
    loader.addEventListener('transitionend',()=>{
       
    })
}
function addLoader(){
    loader.classList.remove('hidden-loader')
}
let totalAmountOfItems = 32

// in my opinion this saves a lot of space when it comes to querySelector
const selected = variables2.map(value => document.querySelector(value));
const [ search, container,snackBar,nextPage, previousPage] = selected;

//fetches the api based on the fetchwrapper class, makes it easier to read
const getPokemonList = async (page)=>{
        const API = new FetchWrapper('https://pokeapi.co/api/v2/');
        const data = await API.get(`pokemon?limit=${totalAmountOfItems}&offset=${(page - 1) * totalAmountOfItems}`);
        return data;
};

//gets pokemon image from the url inside the array fetched from the pokemonList
const getPokemonImage = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.sprites.front_default;
};

let currentPage = 1

//render page function that puts everything together using try catch since this is the last step
   function renderPokemon(query, data, imageFunction){
        //search function thats filters the displayed list based on user input
        const cleaner = query.trim().toLocaleLowerCase().replaceAll(' ', '');
        const filtered = data.results.filter(pokemon => pokemon.name
        .toLocaleLowerCase().includes(cleaner));
            
        container.textContent = ''
        //using createElement instead of innerHTML due to it being a public API where everyone can contribute
        filtered.map(async (pokemon) => {
            const imageUrl =  await imageFunction(pokemon.url);

            const divContainer = document.createElement('div')
            divContainer.className = 'pokemon-business-card'

            const pokemonTitle = document.createElement('h2')
            pokemonTitle.classList.add('pokemon-title-card')
            pokemonTitle.textContent = `${capitalize(pokemon.name)}`
            divContainer.appendChild(pokemonTitle)

            const imgWrapper = document.createElement('div')
            imgWrapper.classList.add('img-wrapper')
            const pokemonImg = document.createElement('img')
            pokemonImg.src = `${imageUrl}`
            imgWrapper.appendChild(pokemonImg)
            divContainer.appendChild(imgWrapper)

            const pokemonLink = document.createElement('a')
            pokemonLink.href = `details.html?id=${pokemon.name}`
            pokemonLink.classList.add('info-link')
            pokemonLink.textContent = 'Info'
            divContainer.appendChild(pokemonLink)

            container.appendChild(divContainer)
           
        });
    }

async function render(query = ''){
    try {
        const data = await getPokemonList(currentPage);
        renderPokemon(query, data, getPokemonImage);
        loading() 
    } catch(error){
        console.error(error)
        showSnackBar(snackBar,'currently experiencing issues with the API, try again later')
    }
};

/*
Increases or decreases the currentPage variable which gets passed as a parameter to the offset in the api call
this allows you to flip trough the next page of items. instead of having 1000 pokemon on the page i have a max of 32 and the offset allows me to
go to the next page of 32 pokemons out of the forexample 1000 pokemons in the api result. 
 */

nextPage.addEventListener('click',() => {
    currentPage ++
    addLoader()
    render()

})

previousPage.addEventListener('click',()=>{
    currentPage --
    addLoader()
    render()
   
})

//fires up the render function on keyup with the users search input as parameter
search.addEventListener('keyup',()=>{
    render(search.value);

});

render()



