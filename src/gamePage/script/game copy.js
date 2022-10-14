
/*

let gameworld = document.getElementById("gameWorld"),
    ship = document.getElementById("ship"),
    mainFrame = document.getElementById("mainFrame"),
    ingame_score = document.getElementById("ingame_score"),
    ingame_menu = document.getElementById("ingame_menu");



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


class DataStorage {
    constructor(data) {
        this.user_data = data;
        this.user_score;
    }

    createUserStore() {
        (localStorage.users_array == undefined) ?
            localStorage.users_array = JSON.stringify(this.user_data) : "";
    }

    updateUserScore() {
        if (!this.pause) {
            this.user_score += 1;
            this.ingame_score.innerHTML = `Score: ${this.user_score}`;
        }
    }

    setLocalStorae() {
        this.user = JSON.parse(sessionStorage.user);
        let users_local = JSON.parse(localStorage.users_array);

        if (this.user["score"] < this.user_score) {
            this.user["score"] = this.user_score;

            let user_in_local = users_local.filter(e => e["name"] == this.user["name"]);
            let filteredArray = users_local.filter(e => e !== user_in_local[0]).push(this.user);


            localStorage.users_array = JSON.stringify(filteredArray)
            sessionStorage.user = JSON.stringify(this.user)
        }
    }
}

class Ship extends DataStorage {
    constructor(data) {
        super(data)
        this.shipSpeed = 20;
        this.health = 100;
        this.shipParam;
    }

    moveShip() {
        if (!this.pause) {
            if (this.shipSpeed == 3) {
                setTimeout(() => {
                    this.shipSpeed = 20
                    this.ship.style.opacity = "1"

                }, 1000)
            }
            this.shipParam = ship.getBoundingClientRect();
            this.backParam = gameworld.getBoundingClientRect();

            let cursorDistanceY = this.cursorPosY - this.shipParam.top,
                cursorDistanceX = this.cursorPosX - this.shipParam.left,
                speedY = Math.abs(cursorDistanceY) / 400 * this.shipSpeed,
                speedX = Math.abs(cursorDistanceX) / (window.screen.height / 3) * this.shipSpeed;

            this.leftBarier = parseInt(this.gameworld.style.left);
            this.topBarier = parseInt(this.gameworld.style.top);

            if (this.cursorPosX > this.shipParam.left) {
                if (this.leftBarier > -3700 || this.leftBarier == NaN) {
                    this.gameworld.style.left = this.backParam.left - (speedX < this.shipSpeed ? speedX : this.shipSpeed) + "px";
                } else {
                    this.gameworld.style.left = (this.backParam.left) + "px"
                }
            } else {
                if (this.leftBarier < -20 || this.leftBarier == NaN) {
                    this.gameworld.style.left = this.backParam.left + (speedX < this.shipSpeed ? speedX : this.shipSpeed) + "px";
                } else {
                    this.gameworld.style.left = (this.backParam.left) + "px"
                }
            }

            if (this.cursorPosY > this.shipParam.top) {
                if (this.topBarier > -4200 || this.topBarier == NaN) {
                    this.gameworld.style.top = this.backParam.top - (speedY < this.shipSpeed ? speedY : this.shipSpeed) + "px"
                }
            } else {
                if (this.topBarier < -100 || this.topBarier == NaN) {
                    this.gameworld.style.top = this.backParam.top + (speedY < this.shipSpeed ? speedY : this.shipSpeed) + "px"
                } else {
                    this.gameworld.style.top = this.backParam.top + "px"
                }
            }
        }

    }

    rotateShip(e) {

        let center_x = (ship.offsetLeft) + (this.shipParam.width / 2),
            center_y = (ship.offsetTop) + (this.shipParam.height),
            mouse_x = e.clientX,
            mouse_y = e.clientY,
            radians = Math.atan2(mouse_x - center_x, mouse_y - center_y),
            degree = (radians * (180 / Math.PI) * -1) + 90;

        ship.style.transform = "rotate(" + (degree + 112) + "grad)";



    }
}

class Asteroids extends Ship {
    constructor(data) {
        super(data)
        this.asteroids;
        this.asteroid_speed = 5;

    }
    createAsteroids(aster_nr) {
        this.gameworld.innerHTML += "<div id=\"asteroids_box\"></div>";
        let asteroids_box = document.getElementById("asteroids_box");
        for (let i = 0; i < aster_nr; i++) {
            asteroids_box.innerHTML += `<div style=\"top: ${Math.round(Math.random() * 5000)}px; left: ${Math.round(Math.random() * 5000)}px\" class=\"asteroid asteroid-${i}\"></div>`;
        }
    }

    moveAsteroids() {
        if (!this.pause) {
            this.asteroids = document.querySelectorAll(".asteroid");

            this.asteroids.forEach(element => {
                let asteroidSpeedX = Math.round(Math.random() * this.asteroid_speed),
                    asteroidSpeedY = Math.round(Math.random() * this.asteroid_speed),
                    directionX = Math.round(Math.random()) ? 1 : -1,
                    directionY = Math.round(Math.random()) ? 1 : -1,
                    background = Math.round((Math.random() * 4) + 1),
                    large_size = Math.round((Math.random() * 100)),
                    medium_size = Math.round((Math.random() * 100)),
                    asteroid_size;

                let fromR = 0,
                    rotation_speed,
                    elementStyle = element.style;

                if (large_size > 70) {
                    asteroid_size = Math.round((Math.random() * 200) + 200)
                    rotation_speed = 0.5
                } else if (medium_size > 50) {
                    rotation_speed = 1
                    asteroid_size = Math.round((Math.random() * 150) + 50)
                } else {
                    rotation_speed = 3
                    asteroid_size = Math.round((Math.random() * 100) + 20)
                }

                elementStyle.width = asteroid_size + "px";
                elementStyle.height = asteroid_size + "px";
                elementStyle.backgroundImage = `url(\"../img/asteroid-0${background}.png\")`;


                let windowX = parseInt(document.documentElement.clientWidth) / 2,
                    windowY = parseInt(document.documentElement.clientHeight) / 2,
                    viewportOffset, top, left, distance;

                let explode = 1;

                this.moveFunction = () => {

                    elementStyle.transform = `rotate(${fromR}deg)`;
                    fromR += rotation_speed;
                    elementStyle.left = parseInt(element.style.left) + asteroidSpeedX * directionX + "px";
                    elementStyle.top = parseInt(element.style.top) + asteroidSpeedY * directionY + "px";

                    viewportOffset = element.getBoundingClientRect();
                    top = viewportOffset.top;
                    left = viewportOffset.left;
                    distance = viewportOffset.width / 1.3


                    if (top <= windowY && top + distance >= windowY && left <= windowX && left + distance >= windowX) {
                        if (explode == 1) {
                            explode += 1;

                            setTimeout(() => {
                                this.shipSpeed = 3
                                document.getElementById("ship").style.opacity = "0.3"
                            }, 100)

                            elementStyle.backgroundImage = "url(\"../img/expl-01.png\")";
                            elementStyle.backgroundImage = "url(\"../img/expl-02.png\")";
                            elementStyle.transform = "scale(1.7)";
                            elementStyle.transition = "transform 1s ease 0s"
                            elementStyle.transition = "background-image 0.4s ease 0s"
                            elementStyle.transition = "opacity 3s ease 0s"
                            elementStyle.opacity = "0";
                        }
                    }


                    if (parseInt(elementStyle.left) < -400) {
                        elementStyle.display = "none";
                        elementStyle.left = 5000 + "px";
                        setTimeout(() => elementStyle.display = "block", 1000)
                    } else if (parseInt(elementStyle.left) > 5400) {
                        elementStyle.display = "none";
                        elementStyle.left = 0 + "px";
                        setTimeout(() => elementStyle.display = "block", 1000)
                    } else if (parseInt(elementStyle.top) > 5400) {
                        elementStyle.display = "none";
                        elementStyle.top = 0 + "px";
                        setTimeout(() => elementStyle.display = "block", 1000)
                    } else if (parseInt(elementStyle.top) < -400) {
                        elementStyle.display = "none";
                        elementStyle.top = 5400 + "px";
                        setTimeout(() => elementStyle.display = "block", 1000)
                    }
                    if (this.pause) {
                        clearInterval(interv_rotate)
                    }
                }

                let interv_rotate = setInterval(this.moveFunction, 100);

            });
        }

    }

}


//Class for creating the entire game
class CreateSpaceGame extends Asteroids {
    constructor(data) {
        super(data)
        this.cursorPosX = 0;
        this.cursorPosY = 0;
        this.pause = false;
        this.moveFunction = "";
        this.ingame_score;
        this.ingame_menu;
        this.gameworld;
        this.ship;
        this.shipParam;
        this.backParam;
        this.leftBarier;
        this.topBarier;
    }

    setBoxes(gameworld, ship, ingame_score, ingame_menu) {
        this.ingame_menu = ingame_menu;
        this.ingame_score = ingame_score;
        this.gameworld = gameworld;
        this.ship = ship;
        this.shipParam = ship.getBoundingClientRect();
        this.backParam = gameworld.getBoundingClientRect();
        this.leftBarier = parseInt(gameworld.style.left);
        this.topBarier = parseInt(gameworld.style.top);

    }

    setCursorPositions(posX, posY) {
        this.cursorPosX = posX;
        this.cursorPosY = posY;
    }

    createWorldGrid(nr) {
        for (let i = 1; i <= nr; i++) {
            this.gameworld.innerHTML += `<div class=\"space_box box_${i}\"></div>`;
        }
    }


    pauseGame() {
        this.gameworld.innerHTML += `<div id="pause_menu">
                                <button>Continue</button>
                                <button>Exit</button>
                            </div>`;
    }



    startGame() {
        this.pauseGame()

        this.ingame_menu.addEventListener("click", () => {
            let pause_menu = document.getElementById("pause_menu");

            this.pause = !this.pause;
            if (!this.pause) {
                pause_menu.style.display = "none";
                this.moveAsteroids();

            } else {
                pause_menu.style.display = "flex";
            }
        })

        this.createWorldGrid(16);
        this.createAsteroids(100);
        this.moveAsteroids();

        setInterval(() => {
            this.updateUserScore()
            this.setLocalStorae()

        }, 2000)

        document.addEventListener("mousemove", (evt) => {
            this.cursorPosX = evt.clientX;
            this.cursorPosY = evt.clientY;
            this.setCursorPositions(evt.clientX, evt.clientY)
            this.rotateShip(evt)
            clearInterval(this.moveShip)
            setInterval(() => { this.moveShip() }, 100)

        })

    }

}

//Checking if user is loged in
if (sessionStorage.loged_in !== undefined && JSON.parse(sessionStorage.loged_in) == true) {
    let game = new CreateSpaceGame(users_array)

    game.setBoxes(gameworld, ship, ingame_score, ingame_menu);
    game.startGame()

} else {
    window.location.href = "../loginPage/login.php";
}
*/

///Initial game code

/*
let gameworld = document.getElementById("gameWorld"),
    ship = document.getElementById("ship"),
    mainFrame = document.getElementById("mainFrame"),
    ingame_score = document.getElementById("ingame_score"),
    ingame_menu = document.getElementById("ingame_menu");


//to be deleted
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

createUserStore()

//Class for creating the entire game
class CreateSpaceGame {
    constructor() {
        this.cursorPosX = 0;
        this.cursorPosY = 0;
        this.shipSpeed = 20;
        this.health = 100;
        this.user_score = 0;
        this.pause = false;
        this.moveFunction = "";
        this.shipParam = ship.getBoundingClientRect();
        this.backParam = gameworld.getBoundingClientRect();
    }


    setCursorPositions(posX, posY) {
        this.cursorPosX = posX;
        this.cursorPosY = posY;
    }

    createWorldGrid(nr) {
        let gameworld = document.getElementById("gameWorld");
        for (let i = 1; i <= nr; i++) {
            gameworld.innerHTML += `<div class=\"space_box box_${i}\"></div>`;
        }
    }

    moveShip() {
        if (!this.pause) {
            if (this.shipSpeed == 3) {
                setTimeout(() => {
                    this.shipSpeed = 20
                    document.getElementById("ship").style.opacity = "1"

                }, 1000)
            }
            this.shipParam = ship.getBoundingClientRect();
            this.backParam = gameworld.getBoundingClientRect();

            let cursorDistanceY = this.cursorPosY - this.shipParam.top,
                cursorDistanceX = this.cursorPosX - this.shipParam.left,
                speedY = Math.abs(cursorDistanceY) / 400 * this.shipSpeed,
                speedX = Math.abs(cursorDistanceX) / (window.screen.height / 3) * this.shipSpeed;

            let leftBarier = parseInt(gameworld.style.left),
                topBarier = parseInt(gameworld.style.top);

            if (this.cursorPosX > this.shipParam.left) {
                if (leftBarier > -3700 || leftBarier == NaN) {
                    gameworld.style.left = this.backParam.left - (speedX < this.shipSpeed ? speedX : this.shipSpeed) + "px";
                } else {
                    gameworld.style.left = (this.backParam.left) + "px"
                }
            } else {
                if (leftBarier < -20 || leftBarier == NaN) {
                    gameworld.style.left = this.backParam.left + (speedX < this.shipSpeed ? speedX : this.shipSpeed) + "px";
                } else {
                    gameworld.style.left = (this.backParam.left) + "px"
                }
            }

            if (this.cursorPosY > this.shipParam.top) {
                if (topBarier > -4200 || topBarier == NaN) {
                    gameworld.style.top = this.backParam.top - (speedY < this.shipSpeed ? speedY : this.shipSpeed) + "px"
                }
            } else {
                if (topBarier < -100 || topBarier == NaN) {
                    gameworld.style.top = this.backParam.top + (speedY < this.shipSpeed ? speedY : this.shipSpeed) + "px"
                } else {
                    gameworld.style.top = this.backParam.top + "px"
                }
            }
        }

    }

    rotateShip(e) {

        let center_x = (ship.offsetLeft) + (this.shipParam.width / 2),
            center_y = (ship.offsetTop) + (this.shipParam.height),
            mouse_x = e.clientX,
            mouse_y = e.clientY,
            radians = Math.atan2(mouse_x - center_x, mouse_y - center_y),
            degree = (radians * (180 / Math.PI) * -1) + 90;

        ship.style.transform = "rotate(" + (degree + 112) + "grad)";

    }

    createAsteroids(aster_nr) {
        gameworld.innerHTML += "<div id=\"asteroids_box\"></div>";
        let asteroids_box = document.getElementById("asteroids_box");

        for (let i = 0; i < aster_nr; i++) {
            let aster_posX = Math.round(Math.random() * 5000);
            let aster_posY = Math.round(Math.random() * 5000);

            asteroids_box.innerHTML += `<div style=\"top: ${aster_posY}px; left: ${aster_posX}px\" class=\"asteroid asteroid-${i}\"></div>`;
        }
    }

    pauseBox() {
        gameworld.innerHTML += `<div id="pause_menu">
                                    <button>Continue</button>
                                    <button>Exit</button>
                                </div>`;
    }

    moveAsteroids() {
        if (!this.pause) {

            let asteroids = document.querySelectorAll(".asteroid"),
                speed = 5;

            asteroids.forEach(element => {
                let asteroidSpeedX = Math.round(Math.random() * speed),
                    asteroidSpeedY = Math.round(Math.random() * speed),
                    directionX = Math.round(Math.random()) ? 1 : -1,
                    directionY = Math.round(Math.random()) ? 1 : -1,
                    background = Math.round((Math.random() * 4) + 1),
                    large_size = Math.round((Math.random() * 100)),
                    medium_size = Math.round((Math.random() * 100)),
                    asteroid_size;

                let fromR = 0,
                    rotation_speed;
                if (large_size > 70) {
                    asteroid_size = Math.round((Math.random() * 200) + 200)
                    rotation_speed = 0.5
                } else if (medium_size > 50) {
                    rotation_speed = 1
                    asteroid_size = Math.round((Math.random() * 150) + 50)
                } else {
                    rotation_speed = 3
                    asteroid_size = Math.round((Math.random() * 100) + 20)
                }

                element.style.width = asteroid_size + "px";
                element.style.height = asteroid_size + "px";
                element.style.backgroundImage = `url(\"../img/asteroid-0${background}.png\")`;


                let windowX = parseInt(document.documentElement.clientWidth) / 2,
                    windowY = parseInt(document.documentElement.clientHeight) / 2,
                    viewportOffset, top, left, distance;

                let explode = 1;

                this.moveFunction = () => {

                    element.style.transform = `rotate(${fromR}deg)`;
                    fromR += rotation_speed;
                    element.style.left = parseInt(element.style.left) + asteroidSpeedX * directionX + "px";
                    element.style.top = parseInt(element.style.top) + asteroidSpeedY * directionY + "px";

                    viewportOffset = element.getBoundingClientRect();
                    top = viewportOffset.top;
                    left = viewportOffset.left;
                    distance = viewportOffset.width / 1.4


                    if (top <= windowY && top + distance >= windowY && left <= windowX && left + distance >= windowX) {
                        if (explode == 1) {
                            explode += 1;
                            setTimeout(() => {
                                this.shipSpeed = 3
                                document.getElementById("ship").style.opacity = "0.3"
                            }, 100)

                            element.style.backgroundImage = "url(\"../img/expl-01.png\")";
                            element.style.backgroundImage = "url(\"../img/expl-02.png\")";

                            element.style.transform = "scale(1.7)";
                            element.style.transition = "transform 1s ease 0s"
                            element.style.transition = "background-image 0.4s ease 0s"
                            element.style.transition = "opacity 3s ease 0s"

                            element.style.opacity = "0";
                        }
                    }


                    if (parseInt(element.style.left) < -400) {
                        element.style.display = "none";
                        element.style.left = 5000 + "px";
                        setTimeout(() => element.style.display = "block", 1000)
                    } else if (parseInt(element.style.left) > 5400) {
                        element.style.display = "none";
                        element.style.left = 0 + "px";
                        setTimeout(() => element.style.display = "block", 1000)
                    } else if (parseInt(element.style.top) > 5400) {
                        element.style.display = "none";
                        element.style.top = 0 + "px";
                        setTimeout(() => element.style.display = "block", 1000)
                    } else if (parseInt(element.style.top) < -400) {
                        element.style.display = "none";
                        element.style.top = 5400 + "px";
                        setTimeout(() => element.style.display = "block", 1000)
                    }
                    if (this.pause) {
                        clearInterval(interv_rotate)
                    }
                }

                let interv_rotate = setInterval(this.moveFunction, 100);

            });
        }

    }

    setUserScore() {
        if (!this.pause) {
            this.user_score += 1;
            ingame_score.innerHTML = `Score: ${this.user_score}`;
        }
    }

    setLocalStorae() {
        let user = JSON.parse(sessionStorage.user),
            users_local = JSON.parse(localStorage.users_array);

        if (user["score"] < this.user_score) {
            user["score"] = this.user_score;

            let user_in_local = users_local.filter(e => e["name"] == user["name"]);
            let filteredArray = users_local.filter(e => e !== user_in_local[0]);

            filteredArray.push(user);

            localStorage.users_array = JSON.stringify(filteredArray)
            sessionStorage.user = JSON.stringify(user)
        }
    }

    startGame() {
        this.pauseBox()

        ingame_menu.addEventListener("click", () => {
            let pause_menu = document.getElementById("pause_menu");

            this.pause = !this.pause;
            if (!this.pause) {
                pause_menu.style.display = "none";
                this.moveAsteroids();

            } else {
                pause_menu.style.display = "flex";
            }
        })

        this.createWorldGrid(16);
        this.createAsteroids(60);
        this.moveAsteroids();

        setInterval(() => {
            this.setUserScore()
            this.setLocalStorae()

        }, 2000)

        document.addEventListener("mousemove", (evt) => {
            this.cursorPosX = evt.clientX;
            this.cursorPosY = evt.clientY;
            this.setCursorPositions(evt.clientX, evt.clientY)
            this.rotateShip(evt)
            clearInterval(this.moveShip)
            setInterval(() => { this.moveShip() }, 100)

        })

    }

}

//Checking if user is loged in 
if (sessionStorage.loged_in !== undefined && JSON.parse(sessionStorage.loged_in) == true) {
    let game = new CreateSpaceGame()

    game.startGame()

} else {
    window.location.href = "../loginPage/login.php";
}








*/
