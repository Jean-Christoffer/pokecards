import FetchWrapper from "./components/fetchHelper.js"

const search = document.querySelector('.search')
const container = document.querySelector('.pokemon-container')

const getPokemonList = async ()=>{
        const API = new FetchWrapper('https://pokeapi.co/api/v2/')
        const data = await API.get(`pokemon?limit=10&offset=0`)
        return data
}


const getPokemonImage = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data.sprites.front_default
}


async function render(query = ''){
    const data = await getPokemonList()

    const cleaner = query.trim().toLocaleLowerCase()
    const filtered = data.results.filter(pokemon => pokemon.name
    .toLocaleLowerCase().includes(cleaner))
    container.innerHTML = ''
    filtered.map(async (pokemon) => {
        const imageUrl = await getPokemonImage(pokemon.url);
        container.insertAdjacentHTML("beforeend",
        `<div class="pokemon-business-card">
        <h2>${pokemon.name}</h2>
        <div class="img-wrapper">
            <img src="${imageUrl}">
        </div>
        <a href="index.html" class="info-link">info</a>
        </div>`)
    });
}

search.addEventListener('keyup',()=>{
    render(search.value)
})




render()

