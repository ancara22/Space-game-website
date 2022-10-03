

function isLoged_in() {
    localStorage.loged_in == null ? localStorage.loged_in = false : ""
    return JSON.parse(localStorage.loged_in);
}

function play(location) {
    if (!isLoged_in()) {
        window.location.href = "." + location + "/login.php";
    } else {
        window.location.href = "." + location + "/game.php";
    }
}


