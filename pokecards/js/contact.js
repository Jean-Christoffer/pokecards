    import { selectorsContact } from "./components/cssSelectors.js"
    import {showSnackBar, errorMessage, removeErrorMessage} from "./components/helpers.js"
    
    const selected = selectorsContact.map(value => document.querySelector(value))
    const [address, email,subject,form,snackBar] = selected
    const inputs = document.querySelectorAll('.clear-field')

    const loader = document.querySelector('.loader')
    window.addEventListener('load',()=>{
        loader.classList.add('hidden-loader')
    })

    const validateForm = () =>{
        const addressField = address.value.toLowerCase().trim()
        const emailField = email.value.toLowerCase().trim()
        const subjectField = subject.value.toLowerCase().trim()
        const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; 
        const patternMatches = regEx.test(emailField);


        addressField.length >= 25 ? removeErrorMessage(address) : errorMessage(address, 'Address needs at least 25 characters')
        patternMatches ? removeErrorMessage(email) : errorMessage(email, 'Please enter a valid email')
        subjectField.length >= 10 ? removeErrorMessage(subject) : errorMessage(subject, 'Subject needs at least 10 characters')

        if(addressField.length >= 25 && patternMatches && subjectField.length >= 10){
            showSnackBar(snackBar, 'Message sent!')
        }else{
            return;
        }
        
             
    }
    
    form.addEventListener('submit',(event)=>{
        event.preventDefault()
        validateForm()
        inputs.forEach(input => input.value = '')

    })



