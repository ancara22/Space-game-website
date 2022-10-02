

let input= document.getElementById("name_input"),
    btn_submit = document.getElementById("btn_save_name"),
    login_box = document.getElementsByClassName("login_box")[0],
    menu_box = document.getElementsByClassName("menu_box")[0];
    btn_play = document.getElementById("play"),
    btn_score = document.getElementById("score"),
    mainFrame = document.getElementById("mainFrame"),
    menu = document.getElementById("menu");

let players = [];


btn_submit.addEventListener("click", (event)=>{
    let name = input.value;

    if(name == "") {
        input.style.border = " 1px solid lightblue"
        
    } else {
        login_box.style.top = "1000px";
        setTimeout(()=>{ login_box.style.display = "none"; },2000)

        players.push(name)
        menu_box.style.top = "40vh"
        setTimeout(()=>{ menu_box.style.display = "flex";},500)

    }
})

btn_play.addEventListener("click", (event)=>{
    btn_play.style.transform = "scale(1.8)"
    btn_score.style.opacity = "0.5"
    menu_box.style.opacity = "0"
    
    setTimeout(()=>{ menu_box.style.display = "none"
                        menu.style.backgroundImage = "url()"  }, 2000)
    setTimeout(()=>{ mainFrame.style.display = "block"}, 2000)

})


