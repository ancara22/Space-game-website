<?php


function readScore() {
    $file = file_get_contents("./src/dataBase/data_players.json");
    $jsonf = json_decode($file, true);

    echo "<div style=\"z-index: 99999;\">".$jsonf["Denis"]["score"]."</div>";


}


?>