<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./styles/game.css">
    <link rel="stylesheet" href="./styles/ship.css">
    <link rel="stylesheet" href="../adds/styles/secondary_menu.css">
    <link rel="stylesheet" href="../adds/styles/transition.css">
    <title>Game</title>
</head>
<body>
    <div class="transition transition-2 is-active"></div>
    <div id="mainFrame" > 
        <button id="ingame_menu"></button>
        <div id="ship_bord">
            <div class="bar" id="health_bar">
                <div ></div>
                <p>100/100</p>
            </div>
            <div class="bar" id="energy_bar">
                <div></div>
                <p>100/100</p>
            </div>
        </div>
            <div id="gameWorld">
                <div class="space_box box_1"></div>
                <div class="space_box box_2"></div>
                <div class="space_box box_3"></div>
                <div class="space_box box_4"></div>
                <div class="space_box box_5"></div>
                <div class="space_box box_6"></div>
                <div class="space_box box_7"></div>
                <div class="space_box box_8"></div>
                <div class="space_box box_9"></div>
                <div class="space_box box_10"></div>
                <div class="space_box box_11"></div>
                <div class="space_box box_12"></div>
                <div class="space_box box_13"></div>
                <div class="space_box box_14"></div>
                <div class="space_box box_15"></div>
                <div class="space_box box_16"></div>
            </div>
            <div id="ship">  
        </div>
    </div>

    <script src="./script/game.js"></script>
    <script src="../adds/script/transition.js"></script>
    <script src="../loginPage/script/login.js"></script>
    
</body>
</html>