import FetchHelper from "./components/helpers.js";
import { selectorsIndexPage } from "./components/cssSelectors.js";
import { capitalize, showSnackBar } from "./components/helpers.js";

const loader = document.querySelector('.loader')
function loading(){
    loader.classList.remove('hidden-loader')
}
function loadingComplete(){
    loader.classList.add('hidden-loader')
}

let totalAmountOfItems = 50


const selected = selectorsIndexPage.map(value => document.querySelector(value));
const [ search, container,snackBar,nextPage, previousPage] = selected;


const getPokemonList = async (page)=>{
        const API = new FetchHelper('https://pokeapi.co/api/v2/');
        const data = await API.get(`pokemon?limit=${totalAmountOfItems}&offset=${(page - 1) * totalAmountOfItems}`);
        return data;
};


const getPokemonImage = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.sprites.front_default;
};

let currentPage = 1


   function renderPokemon(query, data, imageFunction){

        const cleaner = query.trim().toLocaleLowerCase().replaceAll(' ', '');
        const filtered = data.results.filter(pokemon => pokemon.name
        .toLocaleLowerCase().includes(cleaner));
            
        container.textContent = ''

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
        loading()
        const data = await getPokemonList(currentPage);
        renderPokemon(query, data, getPokemonImage);   
        buttonDisabled()

    } catch(error){
        console.error(error)
        showSnackBar(snackBar,'currently experiencing issues with the API, try again later')
    } finally{
        loadingComplete()
    }
};



nextPage.addEventListener('click',() => {
    currentPage ++
    render()

})

function buttonDisabled(){
    if(currentPage === 1){
        previousPage.disabled = true
        previousPage.classList.add('button-disabled')
    }else{
        previousPage.disabled = false
        previousPage.classList.remove('button-disabled')
    }
}

previousPage.addEventListener('click',()=>{
    currentPage --
    render()

})




search.addEventListener('keyup',()=>{
    render(search.value);

});

render()



