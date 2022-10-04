<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../adds/styles/menu.css">
    <link rel="stylesheet" href="./styles/home.css">
    <link rel="stylesheet" href="../adds/styles/transition.css">
    <title>StarShip</title>
</head>
<body>
<div class="transition transition-1 is-active"></div>
    <?php
        $menu_links = ["", "", "../scorePage/score.php", "../loginPage/login.php", "../"];
        include "../adds/php/menu.php";
        renderMenu(...$menu_links);
            
    ?>

    <section class="white">
        <h1>StarShip</h1>
        <div></div>
        <button class="play_btn">Play</button>
    </section>

    <script src="../adds/script/transition.js"></script>
    <script src="../adds/script/menu.js"></script>
    <script src="./script/home.js"></script>
</body>
</html>