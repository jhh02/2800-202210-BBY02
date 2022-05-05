//create form element
const form = document.createElement('form')

//create h1 
const h1 = document.createElement('h1')
h1.textContent = 'Login Form'

//create form container
const formContainer = document.createElement('div')
formContainer.classList.add('formcontainer')

//create container
const container = document.createElement('div')
container.classList.add('container')
//create username label
const uLabel = document.createElement('label')
uLabel.htmlFor = 'uname'
uLabel.textContent = 'Username'
//create username input
const username = document.createElement('input')
username.type = 'text'
username.placeholder = 'Enter Username'
username.name = 'uname'
username.required
username.id = 'username'
//create password label
const pLabel = document.createElement('div')
pLabel.htmlFor = 'psw'
pLabel.textContent = 'Password'
//create password input
const password = document.createElement('input')
password.type = 'password'
password.placeholder = 'Enter password'
password.name = 'psw'
password.required
password.id = 'password'

//create button
const btn = document.createElement('button')
btn.textContent = 'Login'
btn.type = 'submit'
btn.id = 'submit'




container.appendChild(uLabel)
container.appendChild(username)
container.appendChild(pLabel)
container.appendChild(password)

formContainer.appendChild(container)
formContainer.appendChild(btn)

form.appendChild(h1)
form.appendChild(formContainer)


document.body.appendChild(form)