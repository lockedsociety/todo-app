let add_task_btn = document.querySelector(".options__button--add");
let download_btn = document.querySelector(".options__button--download");
let history_btn = document.querySelector(".options__button--history");
let form = document.querySelector(".form");

class Initialize {
  initialize_localstorage() {
    let date = new Date().toLocaleDateString();
    if (!localStorage.getItem(date)) localStorage.setItem(date, "[]");
  }

  initialize_datetime() {
    let date = new Date();
    document.querySelector(".datetime__date").textContent = date.toDateString();
    document.querySelector(".datetime__time").textContent =
      date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  }

  initialize_tasks() {
    let date = new Date().toLocaleDateString();
    let tasks = JSON.parse(localStorage.getItem(date));
    document.querySelector(".tasks").textContent = "";
    for (let task of tasks) {
      document.querySelector(".tasks").prepend(Task.prototype.get(task));
    }
  }

  initialize() {
    this.initialize_localstorage();
    this.initialize_datetime();
    this.initialize_tasks();
  }
}

class Update {
  update_datetime() {
    let date = new Date();
    document.querySelector(".datetime__date").textContent = date.toDateString();
    document.querySelector(".datetime__time").textContent =
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
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
    let date = new Date().toLocaleDateString();
    let all_tasks = JSON.parse(localStorage.getItem(date));

    let new_task = new Task(
      this.name,
      this.description,
      this.add_time,
      this.done_time
    );
    all_tasks.push(new_task);

    localStorage.setItem(date, JSON.stringify(all_tasks));
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

// Event listeners

download_btn.addEventListener("click", () => {
  window.print();
});

add_task_btn.addEventListener("click", () => {
  if (form.style.display == "flex") {
    form.style.display = "none";
    add_task_btn.style.backgroundImage =
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z' fill='rgba(255,255,255,1)'/%3E%3C/svg%3E\")";
  } else {
    form.style.display = "flex";
    document.querySelector(".form__name").focus();
    add_task_btn.style.backgroundImage =
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z' fill='rgba(255,255,255,1)'/%3E%3C/svg%3E\")";
    console.log(1);
  }
});
