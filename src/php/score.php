<?php


function newPlayer($player_name) {
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