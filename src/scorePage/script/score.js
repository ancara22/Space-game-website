function createUserStore() {
    let users_array = [
        { name: "Denis", password: "asd", score: 0 },
        { name: "djeday", password: "asd", score: 992343 },
        { name: "ararat22", password: "ararat22", score: 54 },
        { name: "rectangle", password: "rectangle", score: 765 },
        { name: "rectangle2", password: "rectangle", score: 4355 },
        { name: "rectangle3", password: "rectangle", score: 44 },
        { name: "rectangle4", password: "rectangle", score: 3 },
        { name: "rectangle5", password: "rectangle", score: 7 },
        { name: "rectangle6", password: "rectangle", score: 88887 },
        { name: "rectangle7", password: "rectangle", score: 56565 },
        { name: "rectangle8", password: "rectangle", score: 5666 }];

    if (localStorage.users_array == undefined) {
        localStorage.users_array = JSON.stringify(users_array);
    }
}

createUserStore()

let users_data = JSON.parse(localStorage.users_array),
    table = document.querySelector("#score_list table tbody"),
    empty_array_users = [],
    counter_id = 1;



let scores_array = users_data.map(user => {
    return user["score"];
});

let finish_row = `<tr>
                    <td class="back_dark"></td>
                    <td></td> 
                    <td></td>
                </tr>`;

for (let i = 0; i < scores_array.length; i++) {
    users_data.forEach(user => {
        let username = user["name"],
            score = user["score"],
            html_row;

        scores_array.sort(function (a, b) { return a - b }).reverse();
        console.log('scores_array', scores_array)

        if (scores_array[i] == score && !empty_array_users.includes(user["name"])) {
            empty_array_users.push(user["name"]);
            html_row = `<tr>
                            <td class="u_id back_dark">${counter_id}</td>
                            <td class="u_username">${username}</td> 
                            <td class="u_score">${score}</td>
                        </tr>`;

            table.innerHTML += html_row;
            counter_id += 1;
        }
    });

    if (scores_array.length == i + 1) {
        table.innerHTML += finish_row;
        console.log("yes")
    }
}