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

function open_edit_form(task, id) {
  let task_info = task.children[1];

  let task_name = document.querySelector(".tasks__name");
  let task_description = document.querySelector(".tasks__description");
  let task_add_time = document.querySelector(".tasks__add_time");
  let task_done_time = document.querySelector(".tasks__done_time");

  let task_name_input = document.createElement("input");
  task_name_input.type = "text";
  task_name_input.value = task_name.textContent;

  let task_description_input = document.createElement("input");
  task_description_input.type = "text";
  task_description_input.value = task_description.textContent;

  let task_done_input = document.createElement("input");
  task_done_input.type = "text";
  task_done_input.value = task_done_time.textContent;

  let task_submit = document.createElement("input");
  task_submit.type = "submit";
  task_submit.addEventListener("click", () => {
    Task.prototype.edit(
      task_name_input.value,
      task_description_input.value,
      task_done_input.value,
      id
    );
  });

  task_name.replaceWith(task_name_input);
  task_description.replaceWith(task_description_input);
  task_done_time.replaceWith(task_done_input);

  task_info.appendChild(task_submit);

  // let ef = document.querySelector(".editform");
  // if (ef.style.display == "flex") ef.style.display = "none";
  // else ef.style.display = "flex";
  // ef.children[3].value = id;
}

class Initialize {
  initialize_localstorage() {
    let d = get_current_date();
    let task_object = {};
    task_object[d] = [];
    if (!localStorage.getItem("tasks"))
      localStorage.setItem("tasks", JSON.stringify(task_object));
    let all_tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!(d in all_tasks)) all_tasks[d] = [];
    localStorage.setItem("tasks", JSON.stringify(all_tasks));

    if (!localStorage.getItem("task_id")) localStorage.setItem("task_id", "0");
  }

  initialize_tasks() {
    document.querySelector(".tasks").textContent = "";
    let d = get_current_date();
    let tasks = JSON.parse(localStorage.getItem("tasks"));
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

  edit(title, nd, ntim, id) {
    console.log("id edit id = ", id);
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

  get(task) {
    console.log(typeof task);
    let id = task.id;
    console.log("in get id = ", id);
    task = new Task(
      task.name,
      task.description,
      task.add_time,
      task.done_time,
      task.id
    );
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
      ""
    );

    let dlt_txt = get_element(
      "span",
      { class: "tasks__option--text" },
      "Delete"
    );
    dlt_btn.appendChild(dlt_txt);

    dlt_btn.addEventListener("click", (e) => {
      task.delete();
    });

    let edit_btn = get_element(
      "button",
      { class: "tasks__option", "data-id": task.id },
      ""
    );
    let edit_txt = get_element(
      "span",
      { class: "tasks__option--text" },
      "Edit"
    );
    edit_btn.appendChild(edit_txt);
    edit_btn.addEventListener("click", (e) => {
      open_edit_form(e.target.parentElement.parentElement, task.id);
    });

    let options = get_element("div", { class: "tasks__options" }, "");
    options.appendChild(dlt_btn);
    options.appendChild(edit_btn);

    let t = get_element("div", { class: "tasks__task" }, "");
    t.appendChild(options);
    t.appendChild(info);

    return t;
  }
  delete() {
    let id = this.id;
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
}

document.querySelector(".copy_year").textContent = new Date().getFullYear();
