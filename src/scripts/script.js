"use strict";

let gameworld = document.getElementById("gameWorld"),
    ship = document.getElementById("ship"),
    mainFrame = document.getElementById("mainFrame");

class ShipMoving {
    constructor() {
        this.cursorPosX = 0;
        this.cursorPosY = 0;
        this.speed = 20;
    }

    setPositions(posX, posY) {
        this.cursorPosX = posX;
        this.cursorPosY = posY;
    }

    move() {
        let shipParam = ship.getBoundingClientRect(),
            backParam = gameworld.getBoundingClientRect();

        let cursorDistanceY = this.cursorPosY - shipParam.top,
            cursorDistanceX = this.cursorPosX - shipParam.left,
            speedY = Math.abs(cursorDistanceY) / 400 * this.speed,
            speedX = Math.abs(cursorDistanceX) / (window.screen.height / 3) * this.speed;

        let leftBarier = parseInt(gameworld.style.left),
            topBarier = parseInt(gameworld.style.top);

        if (this.cursorPosX > shipParam.left) {
            if (leftBarier > -4100 || leftBarier == NaN) {
                gameworld.style.left = backParam.left - (speedX < this.speed ? speedX : this.speed) + "px";
            } else {
                gameworld.style.left = (backParam.left) + "px"
            }
        } else {
            if (leftBarier < 400 || leftBarier == NaN) {
                gameworld.style.left = backParam.left + (speedX < this.speed ? speedX : this.speed) + "px";
            } else {
                gameworld.style.left = (backParam.left) + "px"
            }
        }

        if (this.cursorPosY > shipParam.top) {
            if (topBarier > -4450 || topBarier == NaN) {
                gameworld.style.top = backParam.top - (speedY < this.speed ? speedY : this.speed) + "px"
            }
        } else {
            if (topBarier < 200 || topBarier == NaN) {
                gameworld.style.top = backParam.top + (speedY < this.speed ? speedY : this.speed) + "px"
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

}




let game = new ShipMoving()

document.addEventListener("mousemove", (evt) => {
    clearInterval(game.move)

    if (mainFrame.style.display == "block") {
        game.cursorPosX = evt.clientX;
        game.cursorPosY = evt.clientY;
        game.setPositions(evt.clientX, evt.clientY)

        game.rotateShip(evt)

        setInterval(() => { game.move() }, 100)


    }




})