
let input= document.getElementById("name_input"),
    btn_submit = document.getElementById("btn_save_name"),
    login_box = document.getElementsByClassName("login_box")[0],
    menu_box = document.getElementsByClassName("menu_box")[0];




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
        
        console.log('menu_box', menu_box)

    }

})


