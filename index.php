
<?php
    include "./src/adds/php/template.php";

    $page_Title = "Index";

    renderHead($page_Title);
    header("Location: ./src/homePage/home.php"); //Send to Home page
    renderBody($page_Title);
?>
