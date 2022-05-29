
const username = document.getElementById('name')
const email = document.getElementById('email')
const address = document.getElementById('address')
const password = document.getElementById('password')
const role = document.getElementById('role')
const usersContainer = document.querySelector('.searchResults')
const addUserForm = document.querySelector('.add-user-form')

const renderUsers = (users) => {
    users.forEach(user => {
        output += `
    <div class="card">
        <div class="user">
            <div class="img"></div>
            <div class="name">${user.name}</div>
            <div class="email">${user.email}</div>

        </div>
   
        <hr class="seperator">
        <div class="buttonContainer">
            <button class="editBtn">edit</button>
            <button class="deleteBtn">delete</button>
        </div>
    </div>
        `
    })
    usersContainer.innerHTML = output
}

let output = ''
const url = 'http://localhost:8000/api/users'
fetch(url)
    .then(res => {
        console.log(res)
        return res.json()
    })
    .then(data => {
        console.log(data);
        renderUsers(data)
    })
    .catch((err) => console.log(err))

// const editBtn = document.querySelector('.editBtn')
// editBtn.addEventListener('click', () => console.log('clicked'))

async function addUser(e) {
    e.preventDefault();

    let myForm = e.target
    let fd = new FormData(myForm)

    //look at all the contents
    // for (let key of fd.keys()) {
    //     console.log(key, fd.get(key));
    // }
    let json = await convertFD2JSON(fd)
    console.log(json);
    //send request with the formdata
    let url = '/user/dashboard'
    // let req = new 'Request(url, {
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: json,
    //     method: 'POST'
    // })
    // console.log(req);
    return sendHttpRequest('POST', url, json)
    // .then(res => {
    //     console.log(res);
    //     // return res.json() 
    // })
    // .then(data => {
    //     console.log(data);
    // })

}
const sendHttpRequest = async (method, url, data) => {
    return await fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data),

    })
        .then(res => res.json({}))
        .then((data) => {
            // console.log(data.name, data.email);
        })
        .catch((err) => console.log(err))
}

async function convertFD2JSON(formData) {
    let obj = {}
    for (let key of formData.keys()) {
        obj[key] = formData.get(key)
    }
    return obj
}



//Create - Insert new user
//Method: post
addUserForm.addEventListener('submit', addUser)
    // (e) => {
    //     const formData = new FormData(addUserForm)
    //     const searchParams = new URLSearchParams()

    //     for (const pair of formData) {
    //         searchParams.append(pair[0], pair[1])
    //     }

    //     console.log(searchParams);

    //     async function addUser(url = '', data) {
    //         try {
    //             const response = await fetch(url, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',

    //                 },
    //                 body: data
    //             })
    //             return response.json()
    //         } catch (err) { console.log(err) };
    //     }

    //     addUser('http://localhost:8000/user/dashboard',
    //         searchParams
    //         // name: username.value,
    //         // email: email.value,
    //         //     password: password.value,
    //         //     address: address.value,
    //         //     role: role.value
    //         // })
    //     )
    //         .then(data => {
    //             console.log('Success:', data);
    //         })
    //         .catch(err => console.log("Error:", err))


    // })



