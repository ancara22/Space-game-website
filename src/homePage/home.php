<?php
    include "../adds/php/template.php";

    $menu_links = ["", "", "../scorePage/score.php", "../loginPage/login.php", "../"];
    $page_Title = "Home";

    renderHead($page_Title);
    renderMenu(...$menu_links);
    renderBody($page_Title);

?>
