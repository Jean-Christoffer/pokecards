    import { variables3 } from "./components/cssSelectors.js"
    import {showSnackBar} from "./components/helpers.js"
    const selected = variables3.map(value => document.querySelector(value))
    const [firstName,lastName,email,subject,form,errorName,errorLastName,errorEmail,
        errorSubject,textField,errorText,snackBar] = selected
    const inputs = document.querySelectorAll('input')

    

    
    let isValid = true
    function validate(){
       
        if(firstName.value.trim().length > 0){
            errorName.style.display = 'none'
        }else{
            isValid = false
            errorName.style.display = 'block'
        }
        if(lastName.value.trim().length > 3){
            errorLastName.style.display = 'none'
        }else{
            isValid = false
            errorLastName.style.display = 'block'
        }
        if(email.value.trim().length > 4){
            errorEmail.style.display = 'none'
        }else{
            isValid = false
            errorEmail.style.display = 'block'
        }
        if(subject.value.trim().length > 3){
            errorSubject.style.display = 'none'
        }else{
            isValid = false
            errorSubject.style.display = 'block'
        }
        if(textField.value.trim().length > 5){
            errorSubject.style.display = 'none'
        }else{
            isValid = false
            errorText.style.display = 'block'
        }
        return isValid
         
    }

    form.addEventListener('submit',(event)=>{
        event.preventDefault()
        validate()
        isValid ? showSnackBar(snackBar,'Message sendt!'): showSnackBar(snackBar,'ups! please check your input fields')
        inputs.forEach(value => {
            value.value = ''
        })

    })




