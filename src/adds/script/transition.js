

//Transition effect between pages
window.onload = () => {
    let anchors = document.querySelectorAll('a');
    let transition_el = document.querySelector('.transition');

    setTimeout(() => {
        transition_el.classList.remove('is-active');

    }, 500);

    for (let i = 0; i < anchors.length; i++) {
        let anchor = anchors[i];

        anchor.addEventListener('click', e => {
            e.preventDefault();
            transition_el.classList.add('is-active');

            setInterval(() => {
                window.location.href = e.target.href;
            }, 500);
            setInterval(() => {
                transition_el.style.display = "none";
            }, 1000);

        })
    }
}