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


let list_capital = [1, 2, 3..];
let list_coordXY = [[10, 23], [34, 56]..];




let cord;
let nameCapital;


for (let i = 0; i < list_capital.length; i++) {
    if (list_capital[i] == input.value) {
        cord = list_coordXY[i];
        nameCapital = input.value;

        let capital = "<span class= \"capitals name-" + i + "\">" + InputDeviceInfo.value + "</span>";

        document.getElementsByTagName("body").innerHTML += capital;
        let span1 = document.getElementsByClassName(`name-${i}`)[0];

    }
}



