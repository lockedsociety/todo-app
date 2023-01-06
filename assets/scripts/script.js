// Initialization
Initialize.prototype.initialize();

// Update
//Update.prototype.update();

// add task

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

history_btn.addEventListener("click", () => {
  if (history_form.style.display == "flex") {
    form.style.display = "none";
  } else {
    history_form.style.display = "flex";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let namef = document.querySelector(".form__name");
  let descriptionf = document.querySelector(".form__description");
  let timef = document.querySelector(".form__time");

  let name = namef.value;
  let description = descriptionf.value;
  let add_time = new Date().toLocaleTimeString();
  let done_time = timef.value;

  let task = new Task(name, description, add_time, done_time);
  task.save();

  Initialize.prototype.initialize_tasks();

  namef.value = "";
  descriptionf.value = "";
  timef.value = "";
});

history_form.addEventListener("submit", (e) => {
  e.preventDefault();

  let date = history_form.children[0].value;
  date = date.split("-");
  date = parseInt(date[1]) + "/" + parseInt(date[2]) + "/" + date[0];

  let tasks = JSON.parse(localStorage.getItem(date));
  document.querySelector(".tasks").textContent = "";
  if (tasks)
  for (let task of tasks) {
    document.querySelector(".tasks").prepend(Task.prototype.get(task));
  }
  else
  {

    document.querySelector(".tasks").textContent = "No task available.";
  }
});
