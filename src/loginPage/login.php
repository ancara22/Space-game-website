<?php
    include "../adds/php/template.php";

    $menu_links = ["../homePage/home.php", "", "../scorePage/score.php", "./login.php", "..."];
    $page_Title = "Login";

    renderHead($page_Title);
    renderMenu(...$menu_links);
    renderBody($page_Title);
 ?>