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


?>