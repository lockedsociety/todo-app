let add_task = document.querySelector(".bcon__button--add");
let download_task = document.querySelector(".bcon__button--download");
let history_task = document.querySelector(".bcon__button--history");
let form = document.querySelector(".form");


// update date and time

let date = new Date()
document.querySelector('.datc__date').textContent = date.toDateString()
document.querySelector('.datc__time').textContent = date.toLocaleTimeString('en-US' ,{hour: '2-digit', minute: '2-digit'})
function update_time() 
{
    let date = new Date()
    document.querySelector('.datc__date').textContent = date.toDateString()
    document.querySelector('.datc__time').textContent = date.toLocaleTimeString('en-US' ,{hour: '2-digit', minute: '2-digit'})
}

setInterval(update_time, 1000)

// add task

add_task.addEventListener('click', () => {
    if (form.style.display == "block")
        form.style.display = "none";
    else
    {
        form.style.display = "block";
        document.querySelector(".form__title").focus();
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let title = document.querySelector(".form__title");
    let description = document.querySelector(".form__description");
    let time = document.querySelector(".form__time");

    document.querySelector('.tasks').appendChild(get_task(title.value, description.value, time.value))

    title.value = "";
    description.value = "";
    time.value = "";

    form.style.dsiplay = "none";
})

function get_task(title, description, time)
{
    let date = new Date();
    let task_title = document.createElement('h2');
    task_title.setAttribute('class', 'tasks__title');
    task_title.textContent = title;

    let task_ctime = document.createElement('p');
    task_ctime.setAttribute('class', 'tasks__ctime');
    task_ctime.textContent = date.toLocaleTimeString('en-US', {hour: "2-digit", minute: "2-digit"})

    let task_dtime = document.createElement('p');
    task_dtime.setAttribute('class', 'tasks__dtime');
    if (time === "") time = "unspecified time"
    task_dtime.textContent = "to be done by " + time;


    let info = document.createElement('div');
    info.setAttribute('class', 'tasks__info')
    info.appendChild(task_title);
    info.appendChild(task_ctime);
    info.appendChild(task_dtime);

    let task = document.createElement('div');
    task.setAttribute('class', 'tasks__task')
    task.appendChild(info);

    return task;
}