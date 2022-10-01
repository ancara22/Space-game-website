

let gameworld = document.getElementById("gameWorld"),
    ship = document.getElementById("ship");




class Position {
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.st = 100;

        


    }

    move() {
        
        let st = this.st;
    
        let shipPosition = ship.getBoundingClientRect()
        let elementPosition = gameworld.getBoundingClientRect()


    
        let distanceY = this.posY - shipPosition.top,
            speedY = Math.abs(distanceY)/400 * st,
            distanceX = this.posX - shipPosition.left,
            speedX = Math.abs(distanceX)/200 * st;

            



    
        if(this.posX > shipPosition.left) {
            gameworld.style.left = elementPosition.left - (speedX<st? speedY: st) + "px"
        } else {
            gameworld.style.left = elementPosition.left + (speedX<st? speedY: st) + "px"

        }
        if(this.posY > shipPosition.top) {
            gameworld.style.top = elementPosition.top - (speedY<st? speedY: st) + "px"
        } else {
            gameworld.style.top = elementPosition.top + (speedY<st? speedY: st+1) + "px"
    
        }
        //console.log(this.posX+"  "+this.posY)
        
      
       

    }



}



function rotateShip(deg, e){
    let shipParam = ship.getBoundingClientRect()

    //==============================

    var center_x = (ship.offsetLeft) + (shipParam.width/2);
    var center_y = (ship.offsetTop) + (shipParam.height);
    var mouse_x = e.clientX; 
    var mouse_y = e.clientY;
    var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
    var degree = (radians * (180 / Math.PI) * -1) + 90; 


    //==============================

    ship.style.transform = "rotate("+( degree +110 )+"grad)";

}



document.addEventListener("mouseover", (event)=>{
    let e = window.event;
    let game = new Position(e.clientX, e.clientY);

    

    document.addEventListener("mousemove", (evt)=>{
        let e = window.event;
        game.posX = e.clientX;
        game.posY = e.clientY;

       
        rotateShip(10, e)
        clearInterval(game.move)
        setInterval(()=>{game.move()}, 100)
        


    })

})





/*


let gameworld = document.getElementById("gameWorld"),
    ship = document.getElementById("ship");




class Position {
    constructor(posX, posY) {
        this.cursorposX = posX;
        this.cursorposY = posY;
        this.speed = 50;
        this.screenWidth = window.screen.width;
        this.screenHeight = window.screen.height;
        this.shipParam = 0;
        this.backgroundParam = 0;
        this.shipLeft = 0;
        this.shipTop = 0;
        this.backLeft = 0;
        this.backTop = 0;
        this.shipCenterW = 0;
        this.shipCenterH = 0;
      
    }


    define() {
        this.shipParam = ship.getBoundingClientRect();
        this.backgroundParam = gameworld.getBoundingClientRect()
        this.shipTop = this.shipParam.top;
        this.backLeft = this.backgroundParam.left;
        this.backTop =  this.backgroundParam.top;
        this.shipCenterW = this.shipParam.width/2;
        this.shipCenterH = this.shipParam.height/2;

    }

    move() {
        let speedX, speedY;

        let distanceY_cursor = game.cursorposY - game.shipLeft ,
            distanceX_cursor = game.cursorposX - game.shipTop ;


        if(distanceX_cursor > 200) {
            speedX = this.speed
        } else {
            speedX =  Math.abs(distanceX_cursor)/600 * this.speed;
        }
       
        if(distanceY_cursor > 200) {
            speedY = this.speed
        } else {
            speedY =  Math.abs(distanceY_cursor)/(this.screenHeight/2) * this.speed;
        }

      

        if(this.cursorposX > this.shipLeft ) {
            gameworld.style.left = this.backLeft - speedX + "px"
        } else {
            gameworld.style.left = this.backLeft + speedX + "px"

        }
        if(this.cursorposY > this.shipTop ) {
            gameworld.style.top = this.backTop - speedY + "px"
        } else {
            gameworld.style.top = this.backTop + speedY + "px"
    
        }
        
      
    }

}



function rotateShip(e){
    let shipParam = ship.getBoundingClientRect()
    
    var center_x = (ship.offsetLeft) + (shipParam.width/2);
    var center_y = (ship.offsetTop) + (shipParam.height);
    var mouse_x = e.clientX; 
    var mouse_y = e.clientY;
    var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
    var degree = (radians * (180 / Math.PI) * -1) + 90; 


    ship.style.transform = "rotate("+( degree +110 )+"grad)";

}

let game;
let interval_move

document.addEventListener("mouseover", (event)=>{
    let e = window.event;
    game = new Position(e.clientX, e.clientY); 
    game.define()      

})


document.addEventListener("mousemove", (event)=>{
    clearInterval(interval_move)
    game.cursorposX = event.clientX;
    game.cursorposY = event.clientY;


    


    rotateShip(event)
    interval_move =  setInterval(()=>{game.move()}, 100)
    

})





*/