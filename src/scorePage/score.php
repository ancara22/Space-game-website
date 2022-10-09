
<?php
    include "../adds/php/template.php";

    $menu_links = ["../homePage/home.php", "", "", "../loginPage/login.php", "../"];
    $page_Title = "Rank Bord";

    renderHead($page_Title);
    renderMenu(...$menu_links);
    renderBody($page_Title);

?>






