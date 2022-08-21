let add_task = document.querySelector(".bcon__button--add");
let download_task = document.querySelector(".bcon__button--download");

let history_task = document.querySelector(".bcon__button--history");
let form = document.querySelector(".form");

add_task.addEventListener('click', () => {
    form.style.display == "block" ? form.style.display = "none" : form.style.display = "block";
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = document.querySelector(".form__title");
    let description = document.querySelector(".form__desc");
    let time = document.querySelector(".form__time");

})
