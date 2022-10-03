<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/menu.css">
    <link rel="stylesheet" href="../css/login.css">
    <link rel="stylesheet" href="../css/secondary_menu.css">
    <link rel="stylesheet" href="../css/transition.css">
    <title>Login</title>
</head>
<body>
    <div class="transition transition-1 is-active"></div>

    <?php
        $menu_links = ["../../index.php", "", "./score.php", "", ""];
        include "../php/menu.php";
        include "../php/login.php";
        renderMenu(...$menu_links);
    ?>

    <div class="menu_box">
        <button class="btn" id="play"><a href="./game.php">Play</a></button>
        <button class="btn" id="score">Score</button>
    </div>
    

    <iframe name="noReload" style="display:none;"></iframe>
    <form action="#"  method="post"  class="login_box" target="noReload">
            <h2>Login</h2>
            <input id="name_input" type="text" name="player_name" value="username" >
            <input id="name_input" type="text" name="player_pass" value="password">

            <div class="new_account_btn">New account</div>
            <button class="btn_save" id="btn_save_name" type="submit" name="submit">GO</button>
            <p></p>
    </form>
    
    <script src="../scripts/transition.js"></script>
    <script src="../scripts/menu.js"></script>
    <script src="../scripts/login.js"></script>
    
   
</body>
</html>