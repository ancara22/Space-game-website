
let loged_in = false;
let users_array = [{ "name": "Denis", "password": "asd", "score": 0 }];


function play(location) {
    if (!loged_in) {
        window.location.href = "." + location + "/login.php";
    } else {
        window.location.href = "." + location + "/game.php";
    }
}

if (window.location.href.includes("login")) {
    let login_box = document.getElementsByClassName("login_box")[0],
        new_account_btn = document.getElementsByClassName("new_account_btn")[0];

    new_account_btn.addEventListener("click", (event) => {
        login_box.innerHTML = ` 
                <h2>Registration</h2>
                <input id="name_input" type="text" name="r_player_name" value="" > <span>Username</span> </input>
                <input id="name_input" type="password" name="r_player_pass" value=""> <span>Password</span> </input>
                <input id="name_input" type="password" name="r_player_pass_repeat" value=""><span>Repeat password</span> </input>
                <div class="new_account_btn"><a href="./login.php">Login</a></div>
                <button class="btn_save" id="btn_save_name" type="submit" name="submit">Submit</button>
                <p class="message"></p>
                `
        let user_name = document.getElementsByName("r_player_name")[0],
            user_pass = document.getElementsByName("r_player_pass")[0],
            user_pass_repeat = document.getElementsByName("r_player_pass_repeat")[0],
            submit_btn = document.getElementById("btn_save_name"),
            message_box = document.getElementsByClassName("message")[0],
            login_btn = document.querySelectorAll(".new_account_btn")[0],
            is_data_ok = true;

        login_btn.style.marginTop = "0px"

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
            }
        }


        submit_btn.addEventListener("click", (ev) => {
            if (user_name.value != "" && user_pass.value != "" && user_pass_repeat.value != "") {
                users_array.forEach((user) => {
                    if (user["name"].toLowerCase() == user_name.value.toLowerCase()) {
                        error_message(1)
                    }
                })

                if (is_data_ok) {
                    user_name.value.length < 6 ? error_message(2) :
                        user_pass.value.length < 8 ? error_message(3) :
                            user_pass.value == user_pass_repeat.value ? error_message(5) : error_message(4)
                }
            }

            if (is_data_ok) {
                data = {
                    "name": user_name.value,
                    "password": user_pass.value,
                    "score": 0
                }
                users_array.push(data)
                user_name.value = ""
                user_pass.value = ""
                user_pass_repeat.value = ""
                setTimeout(() => {
                    window.location.href = "./login.php";
                }, 1000)


            }
        })



    })
}


