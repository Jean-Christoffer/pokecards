import FetchWrapper from "./components/fetchHelper.js"
const search = document.querySelector('.search')
const container = document.querySelector('.pokemon-container')

//fetching pokemon api data with a endpoint which contains a list with all the pokemon names and their url
const getPokemonList = async ()=>{
        const API = new FetchWrapper('https://pokeapi.co/api/v2/')
        const data = await API.get(`pokemon?limit=300&offset=0`)
        return data
}

//fetching url from the getPokemonList data.results.url to match the pokemon name with https://pokeapi.co/api/v2/pokemon/ so i can use their images in my list. this was hard:P
const getPokemonImage = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return data.sprites.front_default
}

/*
  this function tries to make the search less case sensitive by removing trails with trim() and makes everything lowercase
  it filters trough the pokemon.name array untill you get your search result.
  it starts by calling getPokemonList which fetches the data.
  container.innerHTML its cleared before each render so you dont get multiple of the same items.
  now its mapping throug the filtered parameters i need to use await because its fetching images from another api call to match the name of the pokemons in the list
  it inserting the provided html in the container.
*/


export default async function render(query = ''){
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
        <a href="index.html" class = "info-link" id = ${pokemon.name}>Info</a>
        </div>`)
    });

}

//the search listener updates the list on keyUp calls the render function sends the users input as parameter to render function
search.addEventListener('keyup',()=>{
    render(search.value)
})


render()


