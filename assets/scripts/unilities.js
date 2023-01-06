let add_task_btn = document.querySelector(".options__button--add");
let download_btn = document.querySelector(".options__button--download");
let history_btn = document.querySelector(".options__button--history");
let form = document.querySelector(".form");
let history_form = document.querySelector(".history_form");

class Initialize {
  initialize_localstorage() {
    let date = new Date().toLocaleDateString();
    if (!localStorage.getItem(date)) localStorage.setItem(date, "[]");
  }

  initialize_tasks() {
    let date = new Date().toLocaleDateString();
    let tasks = JSON.parse(localStorage.getItem(date));
    document.querySelector(".tasks").textContent = "";
    for (let task of tasks) {
      document.querySelector(".tasks").prepend(Task.prototype.get(task));
    }
  }

  initialize_datetime() {
    let date = new Date();
    document.querySelector(".datetime__date").textContent =
      "Showing tasks of " + date.toLocaleDateString();
  }

  initialize() {
    this.initialize_localstorage();
    this.initialize_datetime();
    this.initialize_tasks();
  }
}

class Update {
  update_localstorage(task) {
    let date = new Date().toLocaleDateString();
    let all_tasks = JSON.parse(localStorage.getItem(date));
    all_tasks.push(task);
    localStorage.setItem(date, JSON.stringify(all_tasks));
  }

  update_tasks(date) {
    let tasks = JSON.parse(localStorage.getItem(date));
    document.querySelector(".tasks").textContent = "";
    for (let task of tasks) {
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
  constructor(name, description, add_time, done_time) {
    this.name = name;
    this.description = description;
    this.add_time = add_time;
    this.done_time = done_time;
  }

  save() {
    let new_task = new Task(
      this.name,
      this.description,
      this.add_time,
      this.done_time
    );
    Update.prototype.update_localstorage(new_task);
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

    let options = get_element("div", { class: "tasks__options" }, "");
    let t = get_element("div", { class: "tasks__task" }, "");

    t.appendChild(options);
    t.appendChild(info);

    return t;
  }
}

document.querySelector('.copy_year').textContent = new Date().getFullYear();
