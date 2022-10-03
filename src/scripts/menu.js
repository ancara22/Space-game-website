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
    if (!isLoged_in()) {
        window.location.href = "." + location + "/login.php";
    } else {
        window.location.href = "." + location + "/game.php";
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