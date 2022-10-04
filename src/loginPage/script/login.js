
let username_input = document.getElementById("name_input"),
    userpass_input = document.getElementById("pass_input"),
    btn_login = document.getElementById("btn_login"),
    menu_box = document.getElementsByClassName("menu_box")[0],
    btn_play = document.getElementById("play"),
    btn_score = document.getElementById("score"),
    menu = document.getElementById("menu"),
    login_box = document.getElementsByClassName("login_box")[0],
    new_account_btn = document.getElementsByClassName("new_account_btn")[0],
    message_box = document.getElementsByClassName("message")[0];


////////////////////////////////////////////////////////////
//Create a localStore
function createUserStore() {
    let users_array = [{ "name": "Denis", "password": "asd", "score": 0 }];

    if (localStorage.users_array == undefined) {
        localStorage.users_array = JSON.stringify(users_array);
    }
}

//Create a new user
function createNewAccount(username, password) {
    if (localStorage.users_array != undefined) {
        let store = JSON.parse(localStorage.users_array);

        data = {
            "name": username,
            "password": password,
            "score": 0
        }

        store.push(data)
        localStorage.users_array = JSON.stringify(store);

    } else {
        createUserStore()
        createNewAccount(username, password)
    }
    let st = JSON.parse(localStorage.users_array);
}

//Get users localStore
function getUserStore() {
    if (localStorage.users_array != undefined) {
        return JSON.parse(localStorage.users_array);

    }
}

createUserStore() //create a basic localStorage for user data


////////////////////////////////////////////////////////////
//Login form and Registration Functionality 
new_account_btn.addEventListener("click", (event) => {
    registration = true;
    //Render registration form
    login_box.innerHTML = ` 
            <h2>Registration</h2>
            <input id="name_input" type="text" name="r_player_name" value="" > <span>Username</span> </input>
            <input id="name_input" type="password" name="r_player_pass" value=""> <span>Password</span> </input>
            <input id="name_input" type="password" name="r_player_pass_repeat" value=""><span>Repeat password</span> </input>
            <div class="new_account_btn"><a href="./login.php">Login</a></div>
            <button class="btn_save" id="btn_reg" type="submit" name="submit">Submit</button>
            <p class="message"></p>
            `
    getRegistrationForm()

})

function getRegistrationForm() {
    //Get Registration form elements
    let user_name = document.getElementsByName("r_player_name")[0],
        user_pass = document.getElementsByName("r_player_pass")[0],
        user_pass_repeat = document.getElementsByName("r_player_pass_repeat")[0],
        submit_btn = document.getElementById("btn_reg"),
        message_box = document.getElementsByClassName("message")[0],
        new_acc_btn = document.querySelectorAll(".new_account_btn")[0],
        is_data_ok = true;

    new_acc_btn.style.marginTop = "0px"

    //Registration form EROR messages
    function error_message(status) {
        switch (status) {
            case 1:
                is_data_ok = false;
                message_box.textContent = "User already exist";
                message_box.style.color = "rgb(255, 125, 125)";
                break;
            case 2:
                is_data_ok = false;
                message_box.textContent = "Username is too short. Minimal length 6"
                message_box.style.color = "rgb(255, 125, 125)";
                break;
            case 3:
                is_data_ok = false;
                message_box.textContent = "Password is too short. Minimal length 8"
                message_box.style.color = "rgb(255, 125, 125)";
                break;
            case 4:
                is_data_ok = false;
                message_box.textContent = "Passwords do NOT match"
                message_box.style.color = "rgb(255, 125, 125)";
                break;
            case 5:
                is_data_ok = true;
                message_box.textContent = "Succes!!!"
                message_box.style.color = "rgb(12, 172, 3)";
                break;
            case 6:
                is_data_ok = false;
                message_box.textContent = "Complete all inputs please!"
                message_box.style.color = "rgb(255, 125, 125)";
                break;
        }
    }

    //Registration submition button 
    submit_btn.addEventListener("click", (ev) => {
        is_data_ok = true
        if (user_name.value != "" && user_pass.value != "" && user_pass_repeat.value != "") {
            //Check if the username exist
            getUserStore().forEach((user) => { user["name"].toLowerCase() == user_name.value.toLowerCase() ? error_message(1) : "" })

            //Validation check
            is_data_ok ?
                user_name.value.length < 6 ? error_message(2) :
                    user_pass.value.length < 8 ? error_message(3) :
                        user_pass.value == user_pass_repeat.value ? error_message(5) : error_message(4) : ""
        } else {
            is_data_ok = false;
            error_message(6)
        }

        if (is_data_ok) {
            createNewAccount(user_name.value, user_pass.value)
            user_name.value = ""; user_pass.value = ""; user_pass_repeat.value = ""

            //Redirect to Login form
            setTimeout(() => { window.location.href = "./login.php"; }, 1000)
        }
    })


}


////////////////////////////////////////////////////////////
//Login functionality
btn_login.addEventListener("click", (event) => {
    let username = username_input.value,
        userpass = userpass_input.value;

    if (username != "" && userpass != "") {
        getUserStore().forEach((el) => {
            if (el["name"].toLowerCase() == username.toLowerCase()) {
                if (el["password"] == userpass) {
                    sessionStorage.loged_in = true;
                    sessionStorage.user = JSON.stringify(el);
                }
            }
        })
        if (!JSON.parse(sessionStorage.loged_in)) {
            message_box.textContent = "Incorrect username or password!"
            message_box.style.color = "rgb(255, 125, 125)";
        } else {
            placeName()
            message_box.textContent = "Succes!"
            message_box.style.color = "rgb(12, 172, 3)";

            login_box.style.top = "1000px";
            setTimeout(() => { login_box.style.display = "none"; }, 2000)

            menu_box.style.top = "40vh"
            setTimeout(() => { menu_box.style.display = "flex"; }, 500)
        }
    }
})


//Play btn functionaliy
btn_play.addEventListener("click", (event) => {
    btn_play.style.transform = "scale(1.8)"
    btn_score.style.opacity = "0.5"
    menu_box.style.opacity = "0"

    setTimeout(() => {
        menu_box.style.display = "none"
        menu.style.backgroundImage = "url()"
    }, 2000)

})

//Clear inputs
username_input.addEventListener("click", (e) => {
    username_input.value == "username" ? username_input.value = "" : username_input.value
})

userpass_input.addEventListener("click", (e) => {
    userpass_input.type = "password"
    userpass_input.value == "password" ? userpass_input.value = "" : userpass_input.value
})