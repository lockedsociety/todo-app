let add_task_btn = document.querySelector(".options__button--add");
let download_btn = document.querySelector(".options__button--download");
let history_btn = document.querySelector(".options__button--history");
let today_btn = document.querySelector(".date__hbtn");

let add_task_form = document.querySelector(".add_task_form");
let history_form = document.querySelector(".history_form");

function get_element(name, attr, texts) {
  let elm = document.createElement(name);
  for (let i in attr) elm.setAttribute(i, attr[i]);
  elm.textContent = texts;
  return elm;
}

function check_time_over() {
  let time = get_current_time();
  let rendered_tasks = document.querySelectorAll(".tasks__task");
  rendered_tasks.forEach((e) => {
    let elm = e.children[1].children[3].children[0];
    if (
      elm.textContent !== "unspecified time" &&
      elm.textContent != time &&
      e.children[0].classList.contains("task-done-false")
    ) {
      e.children[0].style.backgroundColor = "var(--main-task-time-over-bg)";
    }
  });
}
setInterval(check_time_over, 1000);

function toggle_today() {
  let current_date = get_current_date();
  let display_date = localStorage.getItem("current_display_date");
  if (current_date !== display_date)
    document.querySelector(".date__history").style.display = "block";
  else document.querySelector(".date__history").style.display = "none";
}

function get_current_date() {
  let date = new Date();
  let d = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  return d;
}

function get_current_display_date() {
  return localStorage.getItem("current_display_date");
}

function get_current_time() {
  let date = new Date();
  let time = `${date.getHours()}:${date.getMinutes()}`;
  return time;
}

function display_edit_form(obj, task) {
  let task_info = task.children[1];

  let task_name = task_info.children[0];
  let task_description = task_info.children[1];
  let task_done_time = task_info.children[3].children[0];

  if (task_info.dataset.mode === "normal") {
    let task_name_input = get_element(
      "input",
      {
        type: "text",
        value: task_name.textContent,
        class: "tasks__name tasks__name--input",
      },
      ""
    );
    let task_description_input = get_element(
      "input",
      {
        type: "text",
        value: task_description.textContent,
        class: "tasks__description tasks__description--input",
      },
      ""
    );
    let task_done_input = get_element(
      "input",
      {
        type: "time",
        value: task_done_time.textContent.split(" ")[1],
        class: "tasks__done_time--content tasks__done_time--content--input",
      },
      ""
    );
    let task_submit = get_element(
      "input",
      { type: "submit", value: "Edit", class: "tasks__submit" },
      ""
    );

    task_submit.addEventListener("click", (e) => {
      obj.edit(
        task_name_input.value,
        task_description_input.value,
        task_done_input.value
      );
    });

    task_name.replaceWith(task_name_input);
    task_description.replaceWith(task_description_input);
    task_done_time.replaceWith(task_done_input);

    task_info.appendChild(task_submit);
    task_name_input.focus();

    task_info.dataset.mode = "edit";
  } else {
    let task_name_input = task_info.children[0];
    let task_description_input = task_info.children[1];
    let task_done_time_input = task_info.children[3].children[0];
    let task_submit = task_info.children[4];

    let task_name = get_element(
      "h2",
      { class: "tasks__name" },
      task_name_input.value
    );
    let task_description = get_element(
      "p",
      {
        class: "tasks__description",
      },
      task_description_input.value
    );
    let task_done_time = get_element(
      "span",
      {
        class: "tasks__done_time--content",
      },
      task_done_time_input.value
    );

    task_name_input.replaceWith(task_name);
    task_description_input.replaceWith(task_description);
    task_done_time_input.replaceWith(task_done_time);
    task_submit.remove();

    task_info.dataset.mode = "normal";
  }
}

class Initialize {
  initialize_localstorage() {
    let date = get_current_date();

    if (!localStorage.getItem("tasks")) {
      let tasks = {};
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!(date in tasks)) {
      tasks[date] = [];
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    if (!localStorage.getItem("task_id")) localStorage.setItem("task_id", "0");

    if (!localStorage.getItem("current_display_date"))
      localStorage.setItem("current_display_date", get_current_date());
  }

  initialize_tasks(date = undefined) {
    this.initialize_localstorage();
    document.querySelector(".tasks").textContent = "";
    // let d = localStorage.getItem("current_display_date");
    if (!date) date = get_current_display_date();
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!(date in tasks) || !tasks[date].length)
      document.querySelector(".tasks").textContent = "No tasks available.";
    else
      for (let task of tasks[date])
        document.querySelector(".tasks").prepend(Task.prototype.get(task));

    this.initialize_date(date);
    toggle_today();
  }

  initialize_date(date = undefined) {
    if (!date) {
      document.querySelector(".dateinfo__date").textContent =
        get_current_date();
    } else {
      document.querySelector(".dateinfo__date").textContent = date;
    }
  }

  initialize() {
    this.initialize_localstorage();
    this.initialize_tasks();
  }
}

class Task {
  constructor(
    name,
    description,
    add_time,
    done_time,
    is_done = false,
    id = undefined
  ) {
    this.name = name;
    this.description = description;
    this.add_time = add_time;
    this.done_time = done_time;
    this.is_done = is_done;
    if (id === undefined) {
      let task_id = parseInt(localStorage.getItem("task_id"));
      this.id = task_id;
      localStorage.setItem("task_id", task_id + 1);
    } else this.id = id;
  }

  save() {
    let date = get_current_date();
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks[date].push(this);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  done() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for (let key in tasks)
      for (let task of tasks[key])
        if (task.id == this.id)
          task.is_done ? (task.is_done = false) : (task.is_done = true);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    Initialize.prototype.initialize_tasks();
  }

  delete() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for (let key in tasks)
      for (let task of tasks[key])
        if (task.id == this.id) {
          let index = tasks[key].indexOf(task);
          tasks[key].splice(index, 1);
        }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    Initialize.prototype.initialize_tasks();
  }

  edit(name, description, done_time) {
    !done_time ? (done_time = "unspecified time") : done_time;

    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for (let key in tasks) {
      for (let task of tasks[key]) {
        if (task.id == this.id) {
          task.name = name;
          task.description = description;
          task.done_time = done_time;
        }
      }
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    Initialize.prototype.initialize_tasks();
  }

  get(task) {
    task = new Task(
      task.name,
      task.description,
      task.add_time,
      task.done_time,
      task.is_done,
      task.id
    );

    let task_name = get_element("h2", { class: "tasks__name" }, task.name);

    let task_add_time = get_element(
      "p",
      { class: "tasks__add_time" },
      "Task added: "
    );
    let task_add_time_content = get_element(
      "span",
      { class: "tasks__add_time--content" },
      task.add_time
    );
    task_add_time.appendChild(task_add_time_content);

    // description
    let task_description = get_element(
      "p",
      { class: "tasks__description" },
      task.description
    );
    // done time
    if (task.done_time === "") task.done_time = "unspecified time";
    let task_done_time = get_element(
      "p",
      { class: "tasks__done_time" },
      "Deadline: "
    );

    let task_done_time_content = get_element(
      "span",
      { class: "tasks__done_time--content" },
      task.done_time
    );
    task_done_time.appendChild(task_done_time_content);

    let info = get_element("div", { class: "tasks__info" }, "");
    info.appendChild(task_name);
    info.appendChild(task_description);
    info.appendChild(task_add_time);
    info.appendChild(task_done_time);
    info.dataset.mode = "normal";

    // options

    // delete
    let task_delete_btn = get_element(
      "button",
      { class: "tasks__option", "data-id": task.id },
      ""
    );

    let task_delete_text = get_element(
      "span",
      { class: "tasks__option--text" },
      "Delete"
    );
    task_delete_btn.appendChild(task_delete_text);
    task_delete_btn.addEventListener("click", (e) => {
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
      display_edit_form(task, e.target.parentElement.parentElement);
    });

    // mask as done button

    let task_markdone_btn = get_element(
      "button",
      { class: "tasks__option", "data-id": task.id },
      ""
    );
    let task_markdone_text = get_element(
      "span",
      { class: "tasks__option--text" },
      "Mad"
    );
    task_markdone_btn.appendChild(task_markdone_text);
    task_markdone_btn.addEventListener("click", (e) => {
      task.done();
    });

    let options = get_element(
      "div",
      { class: `tasks__options task-done-${task.is_done}` },
      ""
    );
    options.appendChild(task_markdone_btn);
    options.appendChild(edit_btn);
    options.appendChild(task_delete_btn);

    let task_div = get_element("div", { class: "tasks__task" }, "");
    task_div.appendChild(options);
    task_div.appendChild(info);

    return task_div;
  }
}
