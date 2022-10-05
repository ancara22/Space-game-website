let gameworld = document.getElementById("gameWorld"),
    ship = document.getElementById("ship"),
    mainFrame = document.getElementById("mainFrame");


class CreateSpaceGame {
    constructor() {
        this.cursorPosX = 0;
        this.cursorPosY = 0;
        this.shipSpeed = 20;
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
        let shipParam = ship.getBoundingClientRect(),
            backParam = gameworld.getBoundingClientRect();

        let cursorDistanceY = this.cursorPosY - shipParam.top,
            cursorDistanceX = this.cursorPosX - shipParam.left,
            speedY = Math.abs(cursorDistanceY) / 400 * this.shipSpeed,
            speedX = Math.abs(cursorDistanceX) / (window.screen.height / 3) * this.shipSpeed;

        let leftBarier = parseInt(gameworld.style.left),
            topBarier = parseInt(gameworld.style.top);

        if (this.cursorPosX > shipParam.left) {
            if (leftBarier > -4100 || leftBarier == NaN) {
                gameworld.style.left = backParam.left - (speedX < this.shipSpeed ? speedX : this.shipSpeed) + "px";
            } else {
                gameworld.style.left = (backParam.left) + "px"
            }
        } else {
            if (leftBarier < 400 || leftBarier == NaN) {
                gameworld.style.left = backParam.left + (speedX < this.shipSpeed ? speedX : this.shipSpeed) + "px";
            } else {
                gameworld.style.left = (backParam.left) + "px"
            }
        }

        if (this.cursorPosY > shipParam.top) {
            if (topBarier > -4450 || topBarier == NaN) {
                gameworld.style.top = backParam.top - (speedY < this.shipSpeed ? speedY : this.shipSpeed) + "px"
            }
        } else {
            if (topBarier < 200 || topBarier == NaN) {
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

    startGame() {
        this.createWorldGrid(16);

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




let game = new CreateSpaceGame()
game.startGame()
