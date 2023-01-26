    const cssSelectors = ['#name','#last-name','#email','#subject','#question-form','.error-name',
    '.error-last-name','.error-email','.error-subject','#text-field','.error-text','.snack-bar']
    const selected = cssSelectors.map(value => document.querySelector(value))
    const [firstName,lastName,email,subject,form,errorName,errorLastName,errorEmail,
        errorSubject,textField,errorText,snackBar] = selected
    const inputs = document.querySelectorAll('input')

    function validate(){
        isValid = true
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
        isValid ? (snackBar.classList.add('show'),
         setTimeout(()=>{
            snackBar.classList.remove('show')
        },4000))
         : snackBar.classList.remove('show')
        inputs.forEach(value => {
            value.value = ''
        })

    })




