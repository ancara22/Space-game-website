let login_btn = document.getElementsByClassName("loginBtn")[0];

function isLoged_in() {
    sessionStorage.loged_in == null ? sessionStorage.loged_in = false : ""
    return JSON.parse(sessionStorage.loged_in);
}

function logOut() {
    sessionStorage.loged_in = false;
}


function getUser() {
    let user = JSON.parse(sessionStorage.user)
    return user
}


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




