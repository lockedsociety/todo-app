let add_task_btn = document.querySelector(".options__button--add");
let download_btn = document.querySelector(".options__button--download");
let history_btn = document.querySelector(".options__button--history");
let form = document.querySelector(".form");
let history_form = document.querySelector(".history_form");

function get_current_date() {
  let date = new Date();
  let d = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  return d;
}
function delete_task(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  for (let key in tasks) {
    for (let task of tasks[key]) {
      if (task.id == id) {
        let index = tasks[key].indexOf(task);
        tasks[key].splice(index, 1);
      }
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  Update.prototype.update_tasks(get_current_date());
}

function edit_task(id) {

  let ef = document.querySelector(".editform");

  if (ef.style.display == "flex") ef.style.display = "none";
  else ef.style.display = "flex";
  document.querySelector(".editform").addEventListener("submit", (e) => {
    e.preventDefault();
    let nt = ef.children[0].value;
    let nd = ef.children[1].value;
    let ntim = ef.children[2].value;

    act_edit(nt, nd, ntim, id);
  });
}

function act_edit(title, nd, ntim, id) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  for (let key in tasks) {
    for (let task of tasks[key]) {
      if (task.id == id) {
        let index = tasks[key].indexOf(task);
        // tasks[key].splice(index, 1);
        let e_task = new Task(
          title,
          nd,
          new Date().toLocaleTimeString(),
          ntim,
          id
        );
        tasks[key].splice(index, 1, e_task);
      }
    }
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  Update.prototype.update_tasks(get_current_date());
}

class Initialize {
  initialize_localstorage() {
    // for taska
    let d = get_current_date();
    let task_object = {};
    task_object[d] = [];
    if (!localStorage.getItem("tasks"))
      localStorage.setItem("tasks", JSON.stringify(task_object));
    let all_tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!(d in all_tasks)) all_tasks[d] = [];
    localStorage.setItem("tasks", JSON.stringify(all_tasks));
    // for id
    if (!localStorage.getItem("task_id")) localStorage.setItem("task_id", "0");
  }

  initialize_tasks() {
    document.querySelector(".tasks").textContent = "";
    let d = get_current_date();

    let tasks = JSON.parse(localStorage.getItem("tasks"));

    console.log(tasks);

    for (let task of tasks[d]) {
      document.querySelector(".tasks").prepend(Task.prototype.get(task));
    }
  }

  initialize_datetime() {
    let date = new Date();
    document.querySelector(".datetime__date").textContent =
      "Showing tasks of " + date.toDateString();
  }

  initialize() {
    this.initialize_localstorage();
    this.initialize_datetime();
    this.initialize_tasks();
  }
}

class Update {
  update_localstorage(task) {
    let d = get_current_date();

    let all_tasks = JSON.parse(localStorage.getItem("tasks"));

    all_tasks[d].push(task);

    console.log(all_tasks);

    localStorage.setItem("tasks", JSON.stringify(all_tasks));
  }

  update_tasks(date) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    document.querySelector(".tasks").textContent = "";
    if (!tasks[date])
      document.querySelector(".tasks").textContent = "No tasks.";
    else
      for (let task of tasks[date]) {
        document.querySelector(".tasks").prepend(Task.prototype.get(task));
      }
  }

  update_datetime(date) {
    document.querySelector(".datetime__date").textContent =
      "Showing tasks of " + date;
  }

  update() {
    setInterval(this.update_datetime, 1000);
  }
}

class Task {
  constructor(name, description, add_time, done_time, id = undefined) {
    this.name = name;
    this.description = description;
    this.add_time = add_time;
    this.done_time = done_time;
    if (!id) {
      let task_id = parseInt(localStorage.getItem("task_id"));
      this.id = task_id;
      localStorage.setItem("task_id", task_id + 1);
    } else this.id = id;
  }

  save() {
    Update.prototype.update_localstorage(this);
  }

  get(task) {
    function get_element(name, attr, texts) {
      let elm = document.createElement(name);
      for (let i in attr) elm.setAttribute(i, attr[i]);
      elm.textContent = texts;
      return elm;
    }

    let task_name = get_element("h2", { class: "tasks__name" }, task.name);
    let task_ctime = get_element(
      "p",
      { class: "tasks__add_time" },
      "Task added: " + task.add_time
    );

    if (task.time === "") task.time = "unspecified time";
    let task_dtime = get_element(
      "p",
      { class: "tasks__done_time" },
      "Deadline: " + task.done_time
    );

    let task_description = get_element(
      "p",
      { class: "tasks__description" },
      task.description
    );

    let info = get_element("div", { class: "tasks__info" }, "");
    info.appendChild(task_name);
    info.appendChild(task_description);
    info.appendChild(task_ctime);
    info.appendChild(task_dtime);

    let dlt_btn = get_element(
      "button",
      { class: "tasks__option", "data-id": task.id },
      "Delete"
    );
    dlt_btn.addEventListener("click", (e) => {
      delete_task(e.target.dataset.id);
    });
    let edit_btn = get_element(
      "button",
      { class: "tasks__option", "data-id": task.id },
      "Edit"
    );
    edit_btn.addEventListener("click", (e) => {
      edit_task(e.target.dataset.id);
    });

    let options = get_element("div", { class: "tasks__options" }, "");
    options.appendChild(dlt_btn);
    options.appendChild(edit_btn);

    let t = get_element("div", { class: "tasks__task" }, "");
    t.appendChild(options);
    t.appendChild(info);

    return t;
  }
}

document.querySelector(".copy_year").textContent = new Date().getFullYear();
