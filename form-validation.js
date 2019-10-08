var form = document.querySelector('.form')
var input_fields = form.querySelectorAll('.input_field')
var input_divs = form.querySelectorAll('.input_div')
var name_fields = form.querySelectorAll('.name_field')
var name_divs = form.querySelectorAll('.name_div')
var email_fields = form.querySelectorAll('.email_field')
var email_divs = form.querySelectorAll('.email_div')
var passwords = form.querySelectorAll('.password_field')
var password_divs = form.querySelectorAll('.password_div')
var birth_date_field = form.querySelector('.birth_date_field')


// function of creating of error message
function error_message(error_message_text){
    let error_message_div = document.createElement('div')
    error_message_div.className = 'error'
    error_message_div.style.color = '#f00'
    error_message_div.innerText = error_message_text
    return error_message_div
}
// function of checking of fields are blank
function field_cannot_be_blank(field){
    if(!field.value){
        let error_message_div = error_message('the field cannot be blank!')
        return error_message_div
    }
}
// function checking of fields for not permit signs
function checking_of_fields_for_not_permit_signs(fields, regexp, div){
    for(let i = 0; i < fields.length; i++){
        let field = fields[i].value
        for(let i = 0; i < field.length; i++){
            if(field[i] == ''){
                break
            }
            else if(regexp.test(field[i]) != true){
                console.log('the first permited sign in field "', fields[i].id, '" is "', field[i], '"')
                var error_message_div = error_message('this field has one or more signs are not permitted in this field!')
                break     
            }
        }
        if(error_message_div){
            div[i].appendChild(error_message_div)
        }
    }
}
// function of checking of users email has sign "@"
function email_must_have_dog(field){
    if(field.value == ''){
        field_cannot_be_blank (field)
    }
    else if(/[@]/.test(field.value) != true){
        let error_message_div = error_message('email address must have sign "@"!')
        return error_message_div
    }    
}
// function of checking of password has needed signs
// function password_must_has_these_signs(password){
//     if (/[A-Za-z0-9\W]/.test(password) != true){
//         password_divs[0].appendChild(error_message('the password must has at least one uppercase, one lowercase, and one special symbol!'))
//     }
// }

// body of script
form.addEventListener('submit', function(event){
    event.preventDefault()
    let errors = form.querySelectorAll('.error')
    // erasuring of error's messages
    for(let i = 0; i < errors.length; i++){
        errors[i].remove()
    }
    // checking of fields are blank
    for(let i = 0; i < input_fields.length; i++){
        console.log('the value of field "', input_fields[i].id, '" is "', input_fields[i].value, '"')
        if(field_cannot_be_blank (input_fields[i])){
            input_divs[i].appendChild(field_cannot_be_blank (input_fields[i]))
        }
    }
    // checking of name-fields have sign is not permitted
    checking_of_fields_for_not_permit_signs(name_fields, /[А-Яа-я]/, name_divs)
    // checking of email-fields have sign is not permitted
    checking_of_fields_for_not_permit_signs(email_fields, /[A-Za-z@0-9.!#$%&'*+-/=?^_`{|}~]/, email_divs)
    // checking of email-fields have sign "@"
    for(let i = 0; i < email_fields.length; i++){
        console.log('the value of field "', email_fields[i].id, '" is "', email_fields[i].value, '"')
        if(email_must_have_dog(email_fields[i])){
            email_divs[i].appendChild(email_must_have_dog(email_fields[i]))
        }        
    }
    // password confirmation and validation
    if(passwords[0].value.length < 8 && passwords[0].value != ''){
        password_divs[0].appendChild(error_message('the password cant has less 8 symbols!'))
    }
    if(passwords[0].value != passwords[1].value /* пароли не совпадают */ && passwords[0].value != '' /* поле пароля не пустое */  && passwords[1].value != '' && passwords[0].value.length >= 8 /*длина пароля больше или равна 8*/){
        password_divs[1].appendChild(error_message('there is the mismatch of passwords!'))
    }



}
)