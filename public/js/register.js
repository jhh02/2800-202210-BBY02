ready(function () {

    console.log("Client script loaded.");

    function ajaxGET(url, callback) {

        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                //console.log('responseText:' + xhr.responseText);
                callback(this.responseText);

            } else {
                console.log(this.status);
            }
        }
        xhr.open("GET", url);
        xhr.send();
    }

    function ajaxPOST(url, callback, data) {
        let params = typeof data == 'string' ? data : Object.keys(data).map(
            function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');
        //console.log("params in ajaxPOST", params);

        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                //console.log('responseText:' + xhr.responseText);
                callback(this.responseText);

            } else {
                console.log(this.status);
            }
        }
        // if getting errors here, make sure sessions is working
        // check for mispellings in "/url"
        xhr.open("POST", url);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    }

    document.querySelector("#submit").addEventListener("click", function (e) {
        e.preventDefault();

        let username = document.getElementById("name");
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let address = document.getElementById("address");

        let queryString = "&username=" + username.value + "&email=" + email.value +
        "&password=" + password.value + "&address=" + address.value;
        const vars = { "username": username, "email": email, "password": password, "address": address }
        ajaxPOST("/user/register", function (data) {
            if (data) {
                let dataParsed = JSON.parse(data);
                console.log(dataParsed);
                if (dataParsed.status == "success") {
                    window.location.replace('/user/login');
                } else {
                    document.getElementById("errorMsg").innerHTML = dataParsed.msg;

                }
            }
        }, queryString);
    });

})

function ready(callback) {
    if (document.readyState != "loading") {
        callback();
        console.log("ready state is 'complete'");
    } else {
        document.addEventListener("DOMContentLoaded", callback);
        console.log("Listener was invoked");
    }
}