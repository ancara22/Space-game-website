let gameworld = document.getElementById("gameWorld"),
    ship = document.getElementById("ship"),
    mainFrame = document.getElementById("mainFrame"),
    ingame_score = document.getElementById("ingame_score");

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

class CreateSpaceGame {
    constructor() {
        this.cursorPosX = 0;
        this.cursorPosY = 0;
        this.shipSpeed = 20;
        this.health = 100;
        this.user_score = 0;
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
        if (this.shipSpeed == 3) {
            setTimeout(() => {
                this.shipSpeed = 20
                document.getElementById("ship").style.opacity = "1"

            }, 1000)
        }
        let shipParam = ship.getBoundingClientRect(),
            backParam = gameworld.getBoundingClientRect();

        let cursorDistanceY = this.cursorPosY - shipParam.top,
            cursorDistanceX = this.cursorPosX - shipParam.left,
            speedY = Math.abs(cursorDistanceY) / 400 * this.shipSpeed,
            speedX = Math.abs(cursorDistanceX) / (window.screen.height / 3) * this.shipSpeed;

        let leftBarier = parseInt(gameworld.style.left),
            topBarier = parseInt(gameworld.style.top);

        if (this.cursorPosX > shipParam.left) {
            if (leftBarier > -3700 || leftBarier == NaN) {
                gameworld.style.left = backParam.left - (speedX < this.shipSpeed ? speedX : this.shipSpeed) + "px";
            } else {
                gameworld.style.left = (backParam.left) + "px"
            }
        } else {
            if (leftBarier < -20 || leftBarier == NaN) {
                gameworld.style.left = backParam.left + (speedX < this.shipSpeed ? speedX : this.shipSpeed) + "px";
            } else {
                gameworld.style.left = (backParam.left) + "px"
            }
        }

        if (this.cursorPosY > shipParam.top) {
            if (topBarier > -4200 || topBarier == NaN) {
                gameworld.style.top = backParam.top - (speedY < this.shipSpeed ? speedY : this.shipSpeed) + "px"
            }
        } else {
            if (topBarier < -100 || topBarier == NaN) {
                gameworld.style.top = backParam.top + (speedY < this.shipSpeed ? speedY : this.shipSpeed) + "px"
            } else {
                gameworld.style.top = backParam.top + "px"
            }
        }

    }

    rotateShip(e) {
        let shipParam = ship.getBoundingClientRect();
        let center_x = (ship.offsetLeft) + (shipParam.width / 2),
            center_y = (ship.offsetTop) + (shipParam.height),
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

    moveAsteroids() {
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

            let explode = 1

            setInterval(() => {

                element.style.transform = `rotate(${fromR}deg)`;
                fromR += rotation_speed;
                element.style.left = parseInt(element.style.left) + asteroidSpeedX * directionX + "px";
                element.style.top = parseInt(element.style.top) + asteroidSpeedY * directionY + "px";

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
            }, 100);



        });





    }

    setUserScore() {
        this.user_score += 1;
        ingame_score.innerHTML = `Score: ${this.user_score}`;
    }

    setLocalStorae() {
        let user = JSON.parse(sessionStorage.user),
            users_local = JSON.parse(localStorage.users_array);

        if (user["score"] < this.user_score) {
            user["score"] = this.user_score;

            let user_in_local = users_local.filter(e => e["name"] == user["name"]);
            let filteredArray = users_local.filter(e => e !== user_in_local[0]);

            console.log('filteredArray', filteredArray)
            filteredArray.push(user);

            localStorage.users_array = JSON.stringify(filteredArray)
            sessionStorage.user = JSON.stringify(user)
        }
    }


    startGame() {
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



if (sessionStorage.loged_in !== undefined && JSON.parse(sessionStorage.loged_in) == true) {
    let game = new CreateSpaceGame()
    game.startGame()

} else {
    window.location.href = "../loginPage/login.php";
}



