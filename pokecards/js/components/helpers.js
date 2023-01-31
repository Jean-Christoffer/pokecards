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

function showSnackBar(snackBar,message){
    snackBar.textContent = message
    snackBar.classList.add('show')
    setTimeout(()=>{
        snackBar.classList.remove('show')
    },4000)
}

const errorMessage = (input, errorMessage) => {
    const affectedInput = input.parentElement
    const errorCurrent = affectedInput.querySelector('.error')
    
    errorCurrent.textContent = errorMessage
    errorCurrent.classList.add('showError')
}

const removeErrorMessage = (input) => {
    const affectedInput = input.parentElement
    const errorCurrent = affectedInput.querySelector('.error')

    errorCurrent.classList.remove('showError')
}

export {capitalize}
export {showSnackBar}
export {errorMessage}
export {removeErrorMessage}