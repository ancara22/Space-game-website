//Storage
class DataStorage {
    constructor(data) {
        this.user_data = data;
        this.user_score = 0;
    }

    //Create a store when the page is open first time
    createUserStore() {
        (localStorage.users_array == undefined) ?
            localStorage.users_array = JSON.stringify(this.user_data) : "";
    }

    //Update user score if it is bigger than before
    updateUserScore() {
        if (!this.pause) {
            this.user_score += 1;
            this.ingame_score.innerHTML = `Score: ${this.user_score}`;
        }
    }

    //Modify the localStorage users data
    setLocalStorae() {
        this.user = JSON.parse(sessionStorage.user);
        let users_local = JSON.parse(localStorage.users_array);

        if (this.user["score"] < this.user_score) {
            this.user["score"] = this.user_score;

            let user_in_local = users_local.filter(e => e["name"] == this.user["name"]);
            let filteredArray = users_local.filter(e => e !== user_in_local[0]);
            filteredArray.push(this.user);

            localStorage.users_array = JSON.stringify(filteredArray)
            sessionStorage.user = JSON.stringify(this.user)
        }
    }
}


//Ship
class Ship extends DataStorage {
    constructor(data) {
        super(data)
        this.shipSpeed = 10;
        this.health = 100;
        this.shipParam;
    }

    //Ship moving funvtionality
    moveShip() {
        if (!this.pause) {
            //After explosion recovering
            if (this.shipSpeed == 3) {
                setTimeout(() => {
                    this.shipSpeed = 10
                    this.ship.style.opacity = "1"
                }, 1000)
            }

            //Get game params
            this.shipParam = ship.getBoundingClientRect();
            this.backParam = gameworld.getBoundingClientRect();

            let cursorDistanceY = this.cursorPosY - this.shipParam.top,
                cursorDistanceX = this.cursorPosX - this.shipParam.left,
                speedY = Math.abs(cursorDistanceY) / 400 * this.shipSpeed,
                speedX = Math.abs(cursorDistanceX) / (window.screen.height / 3) * this.shipSpeed;

            this.leftBarier = parseInt(this.gameworld.style.left);
            this.topBarier = parseInt(this.gameworld.style.top);

            //Set Game Borders Limits
            //Borders left-right
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

            //Borders top-bottom
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

    //rotate ship according to cursor position
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


//Asteroids
class Asteroids extends Ship {
    constructor(data) {
        super(data)
        this.asteroids;
        this.asteroid_speed = 5;
    }

    //Function to create Asteroids
    createAsteroids(aster_nr) {
        //Create container for asteroids
        if (!document.body.contains(document.getElementById("asteroids_box"))) {
            this.gameworld.innerHTML += "<div id=\"asteroids_box\"></div>";
        }

        //Create asteroids in the box
        let asteroids_box = document.getElementById("asteroids_box");
        for (let i = 0; i < aster_nr; i++) {
            asteroids_box.innerHTML += `<div style=\"top: ${Math.round(Math.random() * 5000)}px; left: ${Math.round(Math.random() * 5000)}px\" class=\"asteroid asteroid-${i}\"></div>`;
        }
    }

    //Function to move astroids
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


                //Generate randomlly the asteroids size, speed and backgroun Image
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


                //Set explosion in case of hitting
                let windowX = parseInt(document.documentElement.clientWidth) / 2,
                    windowY = parseInt(document.documentElement.clientHeight) / 2,
                    viewportOffset, top, left, distance;

                let explode = 1;

                this.moveFunction = () => {
                    //Rotate asteroid
                    elementStyle.transform = `rotate(${fromR}deg)`;
                    fromR += rotation_speed;
                    elementStyle.left = parseInt(element.style.left) + asteroidSpeedX * directionX + "px";
                    elementStyle.top = parseInt(element.style.top) + asteroidSpeedY * directionY + "px";

                    //Get ship position/user viewport center
                    viewportOffset = element.getBoundingClientRect();
                    top = viewportOffset.top;
                    left = viewportOffset.left;
                    distance = viewportOffset.width / 1.3

                    //Check intersecion ship-asteroid
                    if (top <= windowY && top + distance >= windowY && left <= windowX && left + distance >= windowX) {
                        if (explode == 1) {
                            explode += 1;

                            //Set ship Health
                            this.health -= 33.3;

                            let health = document.getElementById("health");
                            health.style.width = ((this.health / 100) * 190) + "px";
                            document.querySelector("#health_bar p").textContent = `${Math.round(this.health)}/100`

                            this.gameOver += 1;

                            //ship-asteroid intersection impact
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


                    //Set asteroids bariers
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


//Enemies
class Enemies extends Asteroids {
    constructor(data) {
        super(data);
    }

    createEnemies(enemies_nr, group) {
        //Create box for enemies
        if (!document.body.contains(document.getElementById("enemies_box"))) {
            this.gameworld.innerHTML += "<div id=\"enemies_box\"></div>";
        }

        //Create enemies group in the box in random position
        let enemies_box = document.getElementById("enemies_box");

        let top = Math.round(Math.random() * 3000),
            left = Math.round(Math.random() * 3000);

        for (let i = 0; i < enemies_nr; i++) {
            top += 70; left += 70;
            enemies_box.innerHTML += `<div style=\"top: ${top}px; left: ${left}px\" class=\"enemies group-${group}\"></div>`;
        }
    }

    //Enemy mooving functionality
    moveEnemies() {
        if (!this.pause) {
            this.enemies = document.querySelectorAll(".enemies");

            this.enemies.forEach(element => {
                let randomX = Math.round(Math.random()),
                    randomY = Math.round(Math.random()),
                    randSpeedX = Math.round(Math.random() * 500),
                    randSpeedY = Math.round(Math.random() * 500),
                    elementStyle = element.style;

                //Random direction mooving
                element.style.top = parseInt(element.style.top) - (randomY ? randSpeedY : -randSpeedY) + "px";
                element.style.left = parseInt(element.style.left) - (randomX ? randSpeedX : -randSpeedX) + "px";

                //Set enemies borders
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

            });
        }

    }
}


//Main Class for creating the entire game
class CreateSpaceGame extends Enemies {
    constructor(data) {
        super(data)
        this.cursorPosX = 0;
        this.cursorPosY = 0;
        this.pause = false;
        this.moveFunction;
        this.ingame_score;
        this.ingame_menu;
        this.gameworld;
        this.ship;
        this.shipParam;
        this.backParam;
        this.leftBarier;
        this.topBarier;
        this.gameOver = 0;
    }

    //Set Start game states and enviroment
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

    //Set cursor position
    setCursorPositions(posX, posY) {
        this.cursorPosX = posX;
        this.cursorPosY = posY;
    }

    //Create World Grid fro backround
    createWorldGrid(nr) {
        for (let i = 1; i <= nr; i++) {
            this.gameworld.innerHTML += `<div class=\"space_box box_${i}\"></div>`;
        }
    }

    //In game pause
    pauseGame() {
        this.gameworld.innerHTML += `<div id="pause_menu">
                                <button id="continue">Continue</button>
                                <button id="exit">Exit</button>
                            </div>`;

    }


    //Main start Game function
    startGame() {
        this.pauseGame()

        //Set in game menu button evvent
        this.ingame_menu.addEventListener("click", () => {
            let pause_menu = document.getElementById("pause_menu");
            let continue_btn = document.getElementById("continue");
            let exit_btn = document.getElementById("exit");

            pause_menu.style.display = "flex";
            this.pause = true;

            //Set continue button event
            continue_btn.addEventListener("click", (e) => {
                this.pause = false;
                pause_menu.style.display = "none";
                this.moveAsteroids();
            })

            //Set Exit button event
            exit_btn.addEventListener("click", (e) => {
                window.location.href = "../../src/homePage/home.php";
            })

        })


        //Create the Base Detailes
        this.createWorldGrid(16);
        this.createAsteroids(60);
        this.createEnemies(4, 1);
        this.createEnemies(4, 2);
        this.createEnemies(4, 3);
        this.createEnemies(4, 4);


        //Intervals for objects mooving
        this.moveAsteroids();

        let moveEn = setInterval(() => {
            this.moveEnemies()
        }, 5000)

        //Game status cheacking/Changing
        let updateD = setInterval(() => {
            this.updateUserScore()
            this.setLocalStorae()

            if (this.gameOver >= 3) {
                this.pause = true;

                //Game over Border
                this.gameworld.innerHTML += `<div id="gameOver">
                                                <h1>Game Over</h1>
                                                <button>Exit</button>
                                            </div>`;

                let gameOver = document.getElementById("gameOver"),
                    gameOver_exit = document.querySelector("#gameOver button");

                gameOver.style.display = "flex";

                //Set EXIT button functionality in gameOver menu
                gameOver_exit.addEventListener("click", (e) => {
                    window.location.href = "../../src/homePage/home.php";
                })


                //Clear heavy intervals
                clearInterval(moveEn)
                clearInterval(updateD)
            }

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


//GAME CREATION

//GET WORLD
let gameworld = document.getElementById("gameWorld"),
    ship = document.getElementById("ship"),
    ingame_score = document.getElementById("ingame_score"),
    ingame_menu = document.getElementById("ingame_menu");

//Start users data
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


//Checking if user is loged in 
if (sessionStorage.loged_in !== undefined && JSON.parse(sessionStorage.loged_in) == true) {

    //Start the game
    let game = new CreateSpaceGame(users_array)
    game.setBoxes(gameworld, ship, ingame_score, ingame_menu);
    game.startGame()

} else {
    //If user is not loged in, send him to login page
    window.location.href = "../loginPage/login.php";
}




