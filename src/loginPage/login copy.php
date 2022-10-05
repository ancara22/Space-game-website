
<!-- 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../adds/styles/menu.css">
    <link rel="stylesheet" href="./styles/login.css">
    <link rel="stylesheet" href="../adds/styles/secondary_menu.css">
    <link rel="stylesheet" href="../adds/styles/transition.css">
    <title>Login</title>
</head>
<body>
    <div class="transition transition-1 is-active"></div>
-->
    <?php
        $menu_links = ["../homePage/home.php", "", "../scorePage/score.php", "./login.php", "..."];

        include "../adds/php/menu.php";
        include "../adds/php/html.php";

        renderHeader("Login");
        //renderMenu(...$menu_links);
    ?>
<!--
    <div class="menu_box">
        <button class="btn" id="play"><a href="../gamePage/game.php">Play</a></button>
        <button class="btn" id="score">Score</button>
    </div>
    <iframe name="noReload" style="display:none;"></iframe>
    <form action="#"  method="post"  class="login_box" target="noReload">
            <h2>Login</h2>
            <input id="name_input" type="text" name="player_name" value="username" >
            <input id="pass_input" type="text" name="player_pass" value="password">
            <div class="new_account_btn">New account</div>
            <button class="btn_save" id="btn_login" type="submit" name="submit">GO</button>
            <p class ="message"></p>
    </form>
    
    <script src="../adds/script/transition.js"></script>
    <script src="../adds/script/menu.js"></script>
    <script src="./script/login.js"></script>
</body>
</html>

-->