<?php 

function renderMenu() {
    echo "  <div class=\"menu_box\">
                <button class=\"btn\" id=\"play\">Play</button>
                <button class=\"btn\" id=\"score\">Score</button>
            </div>";
};

function renderNameForm() {
    echo "  
            <iframe name=\"noReload\" style=\"display:none;\"></iframe>
            <form action=\"./src/php/score.php\"  method=\"post\"  class=\"login_box\" target=\"noReload\">
                <h2>Please enter your name:</h2>
                <input id=\"name_input\" type=\"text\" name=\"player_name\" value=\"\">
                <button class=\"btn btn_save\" id=\"btn_save_name\" type=\"submit\" name=\"submit\">Save</button>
            </form>";

};




?>