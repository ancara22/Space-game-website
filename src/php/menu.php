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
            <form action=\"./src/php/menu.php\"  method=\"post\"  class=\"login_box\" target=\"noReload\">
                <h2>Please enter your name:</h2>
                <input id=\"name_input\" type=\"text\" name=\"player_name\" value=\"\">
                <button class=\"btn btn_save\" id=\"btn_save_name\" type=\"submit\" name=\"submit\">Save</button>
            </form>";

};

function newPlayer($player_name) {
    $playersData = fopen(__DIR__."/../dataBase/data_players.json", "a");
    $txt = "\n".$player_name;
    //fwrite($playersData, $txt);

    $file = file_get_contents(__DIR__."/../dataBase/data_players.json");
    $jsonf = json_decode($file, true);

    $data = (object) array('name' => $player_name, 'score' => 0);

    array_push($jsonf, $data);
    $jsonData = json_encode($jsonf);
    file_put_contents(__DIR__."/../dataBase/data_players.json", $jsonData);

}



$Name = isset($_POST['player_name']) ? $_POST['player_name'] : 'd';
if(isset($_POST['player_name'])){
    newPlayer($Name);

}


?>