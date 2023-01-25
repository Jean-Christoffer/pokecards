import FetchWrapper from "./components/fetchHelper.js"

 const variables = ['.name', '.pokemon', '.previous', '.ul-list', '.search', 'form', '.hp']
 const selected = variables.map(value => document.querySelector(value))
 const [pokeName, pokemon, randomPokemon, ulList, search,  form, hp] = selected

 const queryString = document.location.search
 const params  = new URLSearchParams(queryString)
 const id = params.get("id")

 
let sum
let pokeMonName = 'mewtwo'
let result = id

async function pokeDex() {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${result ?? '1'}`)
    const data = await response.json()
    console.log(data.stats)
    return data      
}


form.addEventListener('submit', (e)=>{
    e.preventDefault()
    search.value.length === 0 ? alert('Please enter a pokemon') :
    (pokeMonName = search.value.toLowerCase().trim(), search.value = '', result = pokeMonName, updatePokemon())
});

randomPokemon.addEventListener('click', ()=>{
    result = sum
    sum = Math.floor(Math.random() * 301)
    sum <= 0 ? sum = 1 : sum
    updatePokemon()
    
})

function updateUI(data) {
    ulList.innerHTML = ''
    pokemon.src = data.sprites.other.dream_world.front_default
    pokeName.textContent = data.name 

    hp.textContent = `HP: ${data.stats.filter(stat => stat.stat.name.includes('hp'))
    .map(stat => stat.base_stat)}`


    data.abilities.forEach(ability => {
        const p = document.createElement('li')
        const upperCased = ability.ability.name.charAt(0).toUpperCase()
        const lowerCased = ability.ability.name.substring(1)
        p.textContent = `${upperCased}${lowerCased}`
        p.classList.add = 'ability-info'
        ulList.appendChild(p)
    });


}


async function updatePokemon(){
    try {
        const data = await pokeDex()
        updateUI(data) 
    } catch (error) {
        alert('Cant find pokemon')
    }
}

updatePokemon()





