let login_btn = document.getElementsByClassName("loginBtn")[0];


//Checking if user is loged in
function isLoged_in() {
    sessionStorage.loged_in == null ? sessionStorage.loged_in = false : ""
    return JSON.parse(sessionStorage.loged_in);
}

//Log out btn functionality
function logOut() {
    sessionStorage.loged_in = false;
}

//Get current user data from localStorage
function getUser() {
    let user = JSON.parse(sessionStorage.user)
    return user
}

//Play btn functionality
function play(location) {
    let pageLogin = "loginPage",
        pageGame = "gamePage";


    if (!isLoged_in()) {
        if (location == "...") {
            location = "."
            pageLogin = ""
        }
        window.location.href = location + pageLogin + "/login.php";

    } else {
        if (location == "...") {
            location = "../";
        }
        window.location.href = location + pageGame + "/game.php";
    }
}

//Replace Login/Registration brn to current user name
function placeName() {
    if (isLoged_in()) {
        let user = getUser()
        login_btn.innerHTML = `<span class="welcome">Wellcome, ${user["name"]}!</span>
                                <button class="logout">Logout</button>  `

        let logout = document.getElementsByClassName("logout")[0];
        logout.addEventListener("click", (e) => {
            logOut()
            window.location.href = "../../index.php"
            console.log('session', sessionStorage.loged_in)
        })
    }
}


placeName()