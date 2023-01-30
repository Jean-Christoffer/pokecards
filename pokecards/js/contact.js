    import { variables3 } from "./components/cssSelectors.js"
    import {showSnackBar} from "./components/helpers.js"

    const selected = variables3.map(value => document.querySelector(value))
    const [address, email,subject,form,snackBar] = selected
    const inputs = document.querySelectorAll('.clear-field')

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

    const validateForm = () =>{
        const addressField = address.value.trim()
        const emailField = email.value.trim()
        const subjectField = subject.value.trim()
        const regEx = /\S+@\S+\.\S+/;
        const patternMatches = regEx.test(emailField);

        //validates each input field
        addressField.length >= 25 ? removeErrorMessage(address) : errorMessage(address, 'Address needs at least 25 characters')
        patternMatches ? removeErrorMessage(email) : errorMessage(email, 'Please enter a valid email')
        subjectField.length >= 10 ? removeErrorMessage(subject) : errorMessage(subject, 'Subject needs at least 10 characters')

        //show snackbar if all the conditions above are met
        addressField.length >= 25 && patternMatches && subjectField.length >= 10 && showSnackBar(snackBar, 'message sent!')
             
    }
    
console.log(snackBar)
    form.addEventListener('submit',(event)=>{
        event.preventDefault()
        validateForm()
        inputs.forEach(input => input.value = '')

    })



