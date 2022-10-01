

let gameworld = document.getElementById("gameWorld"),
    ship = document.getElementById("ship");




class Position {
    constructor() {
        this.cursorPosX = 0;
        this.cursorPosY = 0;
        this.speed = 200;
      
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
            speedY = Math.abs(cursorDistanceY)/400 * this.speed,
            speedX = Math.abs(cursorDistanceX)/(window.screen.height/3) * this.speed;

        let leftBarier =  parseInt(gameworld.style.left),
            topBarier =  parseInt(gameworld.style.top);

        
            
        
        if(this.cursorPosX > shipParam.left) {
            if(leftBarier > -3800 || leftBarier == NaN) {
                gameworld.style.left = backParam.left - (speedX<this.speed? speedX: this.speed) + "px"
            } 
        }else {

            if(leftBarier < -100 || leftBarier == NaN){
                gameworld.style.left = backParam.left + (speedX<this.speed? speedX: this.speed) + "px"

            } else {
                gameworld.style.left = (backParam.left - 40)  + "px"
            }

        }
        if(this.cursorPosY > shipParam.top) {
            if(topBarier > -4300 || topBarier == NaN) {
                gameworld.style.top = backParam.top - (speedY<this.speed? speedY: this.speed) + "px"
            }
        } else {
            if(topBarier < 25 || topBarier == NaN) {
                gameworld.style.top = backParam.top + (speedY<this.speed? speedY: this.speed) + "px"
            } else {
                gameworld.style.top = backParam.top  + "px"

            }
    
        }
        
        

    }


    rotateShip(e){
        let shipParam = ship.getBoundingClientRect();
        let center_x = (ship.offsetLeft) + (shipParam.width/2),
        center_y = (ship.offsetTop) + (shipParam.height),
        mouse_x = e.clientX,
        mouse_y = e.clientY,
        radians = Math.atan2(mouse_x - center_x, mouse_y - center_y),
        degree = (radians * (180 / Math.PI) * -1) + 90; 

        ship.style.transform = "rotate("+( degree +112 )+"grad)";
    
    }

}





let game = new Position();



document.addEventListener("mousemove", (evt)=>{
    game.cursorPosX = evt.clientX;
    game.cursorPosY = evt.clientY;
    game.setPositions(evt.clientX, evt.clientY)
   
    //game.rotateShip(evt)
    clearInterval(game.move)
    setInterval(()=>{game.move()}, 10)
    game.rotateShip(evt)
    
})



