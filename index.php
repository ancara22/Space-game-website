<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./src/css/menu.css">
    <link rel="stylesheet" href="./src/css/home.css">
    <title>StarShip</title>
</head>
<body>
    <?php
        include "./src/php/menu.php";
        renderMenu("#", "./src/html/game.php", "./src/html/score.php", "./src/html/login.php");


    ?>

    <section>
        <h1>StarShip</h1>
        <div></div>
        <button>Play</button>
    </section>


</body>
</html>