function getCustomers() {

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {

            // 200 means everthing worked
            if (xhr.status === 200) {

                let data = JSON.parse(this.responseText);
                console.log(data);
                if (data.status == "success") {

                    let str = `        <tr>
    <th class="id_header"><span>ID</span></th>
    <th class="name_header"><span>Name</span></th>
    <th class="email_header"><span>Email</span></th>
    <th class="address_header"><span>Address</span></th>
    <th class="role_header"><span>Role</span></th>
    <th class="admin_header"><span>Admin</span></th>
  </tr>`;
                    for (let i = 0; i < data.rows.length; i++) {
                        let row = data.rows[i];
                        //console.log("row", row);
                        str += ("<tr><td class='id'>" + row._id
                            + "</td><td class='name'><span>" + row.name + "</span>"
                            + "</td><td class='email'><span>" + row.email + "</span>"
                            + "</td><td class='address'><span>" + row.address + "</span>"
                            + "</td><td class='admin'><span>" + row.admin + "</span>"
                            + "</td></tr>");
                    }
                    //console.log(str);
                    document.getElementById("users").innerHTML = str;

                    // select all spans under the email class of td elements
                    let emails = document.querySelectorAll("td[class='email'] span");
                    for (let j = 0; j < emails.length; j++) {
                        emails[j].addEventListener("click", editCell);
                    }

                    // select all spans under the name class of td elements
                    let names = document.querySelectorAll("td[class='name'] span");
                    for (let j = 0; j < names.length; j++) {
                        names[j].addEventListener("click", editCell);
                    }

                    // select all spans under the address class of td elements
                    let address = document.querySelectorAll("td[class='address'] span");
                    for (let j = 0; j < address.length; j++) {
                        address[j].addEventListener("click", editCell);
                    }

                    // select all spans under the admin class of td elements
                    let admin = document.querySelectorAll("td[class='admin'] span");
                    for (let j = 0; j < admin.length; j++) {
                        admin[j].addEventListener("click", editCell);
                    }










                } else {
                    console.log("Error!");
                }

            } else {

                // not a 200, could be anything (404, 500, etc.)
                console.log(this.status);

            }

        } else {
            console.log("ERROR", this.status);
        }
    }
    xhr.open("GET", "/user/dashboard");
    xhr.send();
}
getCustomers();

function editCell(e) {

    // add a listener for clicking on the field to change email
    // span's text
    let spanText = e.target.innerHTML;
    // span's parent (td)
    let parent = e.target.parentNode;
    // create a new input, and add a key listener to it
    let input = document.createElement("input");
    input.value = spanText;
    input.addEventListener("keyup", function (e) {
        let s = null;
        let v = null;
        // pressed enter
        if (e.which == 13) {
            v = input.value;
            let newSpan = document.createElement("span");
            // have to wire an event listener to the new element
            newSpan.addEventListener("click", editCell);
            newSpan.innerHTML = v;
            parent.innerHTML = "";
            parent.appendChild(newSpan);
            let dataToSend = {
                id: parent.parentNode.querySelector(".id").innerHTML,
                name: parent.parentNode.querySelector(".name").innerHTML,
                email: v
            };

            // now send
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState == XMLHttpRequest.DONE) {

                    // 200 means everthing worked
                    if (xhr.status === 200) {
                        document.getElementById("status").innerHTML = "Record updated.";
                        getCustomers();


                    } else {

                        // not a 200, could be anything (404, 500, etc.)
                        console.log(this.status);

                    }

                } else {
                    console.log("ERROR", this.status);
                }
            }
            xhr.open("POST", "/update-customer");
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            //console.log("dataToSend", "id=" + dataToSend.id + "&email=" + dataToSend.email);
            xhr.send("id=" + dataToSend.id + "&email=" + dataToSend.email);

        }
    });
    parent.innerHTML = "";
    parent.appendChild(input);

}


document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();

    let formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
    };
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";


    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {

            // 200 means everthing worked
            if (xhr.status === 200) {

                getCustomers();
                document.getElementById("status").innerHTML = "DB updated.";

            } else {

                // not a 200, could be anything (404, 500, etc.)
                console.log(this.status);

            }

        } else {
            console.log("ERROR", this.status);
        }
    }
    xhr.open("POST", "/add-customer");
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("name=" + formData.name + "&email=" + formData.email);

})

document.getElementById("deleteAll").addEventListener("click", function (e) {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == XMLHttpRequest.DONE) {

            // 200 means everthing worked
            if (xhr.status === 200) {

                getCustomers();
                document.getElementById("status").innerHTML = "All records deleted.";

            } else {

                // not a 200, could be anything (404, 500, etc.)
                console.log(this.status);

            }

        } else {
            console.log("ERROR", this.status);
        }
    }
    xhr.open("POST", "/delete-all-customers");
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
});