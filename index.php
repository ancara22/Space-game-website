
<?php
    include "./src/adds/php/template.php";

    $page_Title = "Index";

    renderHead($page_Title);
    header("Location: ./src/homePage/home.php");
    renderBody($page_Title);
?>
