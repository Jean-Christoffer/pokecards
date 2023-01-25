export default class FetchWrapper {
    constructor(baseURL){
        this.baseURL = baseURL
    }
    async get(endpoint){
        const response = await fetch(this.baseURL + endpoint)
        return response.json()
    }
}

function capitalize(word){
    let firstLetter = word.charAt(0).toUpperCase()
    let restOfWord = word.substring(1)
    return firstLetter + restOfWord
}
export {capitalize}