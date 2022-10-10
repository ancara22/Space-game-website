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
    let users_array = [
        { name: "Denis", password: "asd", email: "email1@gmail.com", gender: "Male", score: 0 },
        { name: "djeday", password: "asd", email: "email2@gmail.com", gender: "Male", score: 992343 },
        { name: "ararat22", password: "ararat22", email: "email3@gmail.com", gender: "Female", score: 54 },
        { name: "rectangle", password: "rectangle", email: "email4@gmail.com", gender: "Male", score: 765 },
        { name: "rectangle2", password: "rectangle", email: "email5@gmail.com", gender: "Female", score: 4355 },
        { name: "rectangle3", password: "rectangle", email: "email6@gmail.com", gender: "Secret", score: 44 },
        { name: "rectangle4", password: "rectangle", email: "email7@gmail.com", gender: "Female", score: 3 },
        { name: "rectangle5", password: "rectangle", email: "email8@gmail.com", gender: "Male", score: 7 },
        { name: "rectangle6", password: "rectangle", email: "email9@gmail.com", gender: "Female", score: 88887 },
        { name: "rectangle7", password: "rectangle", email: "email10@gmail.com", gender: "Male", score: 56565 },
        { name: "rectangle8", password: "rectangle", email: "email11@gmail.com", gender: "Secret", score: 5666 }];

    if (localStorage.users_array == undefined) {
        localStorage.users_array = JSON.stringify(users_array);
    }
}

//Create a new user
function createNewAccount(username, password, email, gender) {
    if (localStorage.users_array != undefined) {
        let store = JSON.parse(localStorage.users_array);

        data = {
            "name": username,
            "password": password,
            "email": email,
            "gender": gender,
            "score": 0
        }

        store.push(data)
        localStorage.users_array = JSON.stringify(store);

    } else {
        createUserStore()
        createNewAccount(username, password, email, gender)
    }

}

//Get users localStore
function getUserStore() {
    if (localStorage.users_array != undefined) {
        return JSON.parse(localStorage.users_array);

    }
}

//Email validation 
function emailValidation(input) {
    let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (input.match(emailFormat)) {
        return true
    } else {
        return false
    }
}

//Registration data validation and creating a new account
function getRegistrationForm() {
    //Get Registration form elements
    let user_name = document.getElementsByName("r_player_name")[0],
        user_pass = document.getElementsByName("r_player_pass")[0],
        user_pass_repeat = document.getElementsByName("r_player_pass_repeat")[0],
        submit_btn = document.getElementById("btn_reg"),
        message_box = document.getElementsByClassName("message")[0],
        new_acc_btn = document.querySelectorAll(".new_account_btn")[0],
        user_email = document.getElementsByName("user_email")[0],
        user_gender = document.getElementsByName("user_gender")[0],
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
            case 7:
                is_data_ok = false;
                message_box.textContent = "Email format is not correct!"
                message_box.style.color = "rgb(255, 125, 125)";
                break;
        }
    }


    //Registration submition button 
    submit_btn.addEventListener("click", (ev) => {
        is_data_ok = true
        if (user_name.value != "" && user_pass.value != "" && user_pass_repeat.value != "" && user_email.value != "" && user_gender.value != "...") {
            //Check if the username exist
            getUserStore().forEach((user) => { user["name"].toLowerCase() == user_name.value.toLowerCase() ? error_message(1) : "" })

            //Validation check
            is_data_ok ?
                user_name.value.length < 6 ? error_message(2) :
                    user_pass.value.length < 8 ? error_message(3) :
                        !emailValidation(user_email.value) ? error_message(7) :
                            user_pass.value == user_pass_repeat.value ? error_message(5) : error_message(4) : ""
        } else {
            is_data_ok = false;
            error_message(6)
        }

        if (is_data_ok) {
            createNewAccount(user_name.value, user_pass.value, user_email.value, user_gender.value)
            user_name.value = ""; user_pass.value = ""; user_pass_repeat.value = ""

            //Redirect to Login form
            setTimeout(() => { window.location.href = "./login.php"; }, 1000)
        }
    })
}

createUserStore() //create a basic localStorage for user data



////////////////////////////////////////////////////////////
//Login form and Registration form rendering
if (window.location.href.includes("login")) {
    new_account_btn.addEventListener("click", (event) => {

        //Render registration form
        login_box.innerHTML = ` 
                <h2>Registration</h2>
                <input id="name_input" type="text" name="r_player_name" value="" > <span>Username</span> </input>
                <input id="name_input" type="text" name="user_email" value=""><span>Email</span></input>
                <span id="gender_span">Gender</span>
                <select id="gender_input" name="user_gender">
                    <option value="...">...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Secret">Prefer not to say</option>
                </select>
                <input id="name_input" type="password" name="r_player_pass" value=""> <span>Password</span> </input>
                <input id="name_input" type="password" name="r_player_pass_repeat" value=""><span>Repeat password</span> </input>
                <div class="new_account_btn"><a href="./login.php">Login</a></div>
                <button class="btn_save" id="btn_reg" type="submit" name="submit">Submit</button>
                <p class="message"></p>
                `

        login_box.style.marginBottom = "20px";
        document.querySelector("body").style.overflow = "scroll";

        getRegistrationForm()
    })

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

    //Score btn functionaliy
    btn_score.addEventListener("click", (e) => {
        window.location.href = "../scorePage/score.php";
    });

    //Clear inputs
    username_input.addEventListener("click", (e) => {
        username_input.value == "username" ? username_input.value = "" : username_input.value
    })

    userpass_input.addEventListener("click", (e) => {
        userpass_input.type = "password"
        userpass_input.value == "password" ? userpass_input.value = "" : userpass_input.value
    })

}