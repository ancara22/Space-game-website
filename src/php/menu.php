<?php 

function renderMenu($linkHome, $linkGame, $linkScore, $linkLogin) {
    echo "<nav class=\"navigation_bar\">
                <div class=\"logo\">
                <a href=\"$linkHome\">StarShip</a> 
                
                </div>
                    <div class=\"menu\">
                        <div>
                        <a href=\"$linkGame\">Game</a> 
                        </div>
                        <div>
                            <a href=\"$linkScore\">Score</a> 
                        </div>
                    </div>
                    
                <div class=\"loginBtn\">
                   <a href=\"$linkLogin\">Login/registration</a> 
                </div>
            </nav>";
}




$Name = isset($_POST['player_name']) ? $_POST['player_name'] : 'd';
if(isset($_POST['player_name'])){
    //newPlayer($Name);

}




?>