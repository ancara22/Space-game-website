
<?php 

function renderMenu($linkHome, $linkGame, $linkScore, $linkLogin, $location) {
        echo "<nav class=\"navigation_bar\">
                    <div class=\"logo\">
                    <a href=\"$linkHome\">StarShip</a> 
                    </div>
                        <div class=\"menu\">
                            <div>
                                <a onclick=\" play('$location') \" >Game</a> 
                            </div>
                            <div>
                                <a href=\"$linkScore\">Score</a> 
                            </div>
                        </div>
                    <div class=\"loginBtn\">
                       <a href=\"$linkLogin\">Login/Registration</a> 
                    </div>
                </nav>";
    
}

function renderHead($title) {  
        $sec_menu = <<<XML
        <link rel="stylesheet" href="../adds/styles/secondary_menu.css">
        XML;

        if($title == "Game") {
                $styles = <<<XML
                $sec_menu
                <link rel="stylesheet" href="./styles/game.css">
                <link rel="stylesheet" href="./styles/ship.css">`
                XML;
                
                $transition = 2;

                } else {
                        $menu = <<<XML
                        <link rel="stylesheet" href="../adds/styles/menu.css">
                        XML;
                        $transition = 1;

                        if($title == "Login") {
                                $styles = <<<XML
                                $menu
                                <link rel="stylesheet" href="./styles/login.css">
                                $sec_menu
                                XML;
                        } else if($title == "Home") {
                                $styles = <<<XML
                                $menu
                                <link rel="stylesheet" href="./styles/home.css">
                                XML;
                        }
                } 

        $transit = "transition transition-".$transition." is-active";

        $headOpen = <<<XML
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        $styles
        <link rel="stylesheet" href="../adds/styles/transition.css">
        <title>$title</title>
        </head>
        <body>
        <div class= $transit></div>
        XML;

       echo $headOpen;
        
}


function renderBody($bodyType) {
        
        $loginBody = <<<XML
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
        XML;

        $homeBody = <<<XML
        <section class="white">
        <h1>StarShip</h1>
        <div></div>
        <button class="play_btn">Play</button>
        </section>
        XML;


        $transitScript = <<<XML
        <script src="../adds/script/transition.js"></script>
        XML;

        $menuScript = <<<XML
        <script src="../adds/script/menu.js"></script>
        XML;
        $gameScript = <<<XML
        <script src="./script/game.js"></script>
        XML;
        $loginScrip = <<<XML
        <script src="../loginPage/script/login.js"></script>
        XML;
        $homeScript = <<<XML
        <script src="./script/home.js"></script>
        XML;


        if($bodyType == "Game") {
                $body = $gameBody;

                $scripts = <<<XML
                $gameScript
                $transitScript
                $loginScrip
                XML;

        } else if($bodyType == "Login"){
                $body = $loginBody;
                
                $scripts = <<<XML
                $transitScript
                $menuScript
                $loginScrip
                XML;
        } else if ($bodyType == "Home") {
                $body = $homeBody;

                $scripts = <<<XML
                $transitScript
                $menuScript
                $homeScript
                XML;
        }

        $bodyClose = <<<XML
        $body
        $scripts
        </body>
        </html>
        XML;

        echo $bodyClose;
}




?>


    