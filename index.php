<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./src/css/menu.css">
    <link rel="stylesheet" href="./src/css/home.css">
    <link rel="stylesheet" href="./src/css/transition.css">
    <title>StarShip</title>
</head>
<body>
<div class="transition transition-1 is-active"></div>
    <?php
        $menu_links = ["", "", "./src/html/score.php", "./src/html/login.php", "/src/html"];
        include "./src/php/menu.php";
        renderMenu(...$menu_links);
                

    ?>

    <section>
        <h1>StarShip</h1>
        <div></div>
        <button class="play_btn">Play</button>
    </section>

    <script src="./src/scripts/transition.js"></script>
    <script src="./src/scripts/home.js"></script>
    <script src="./src/scripts/login.js"></script>
</body>
</html>