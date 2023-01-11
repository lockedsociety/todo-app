// Initialization
Initialize.prototype.initialize();

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
  }
});

history_btn.addEventListener("click", () => {
  if (history_form.style.display == "block") {
    history_form.style.display = "none";
  } else {
    history_form.style.display = "block";
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

  let d = get_current_date();

  Update.prototype.update_tasks(d);

  namef.value = "";
  descriptionf.value = "";
  timef.value = "";
});

history_form.addEventListener("submit", (e) => {
  e.preventDefault();

  let date = history_form.children[1].value;

  let tasks = JSON.parse(localStorage.getItem(date));

  document.querySelector(".tasks").textContent = "";

  Update.prototype.update_datetime(date);
  Update.prototype.update_tasks(date);

  history_form.style.display = "none";
  localStorage.setItem("current_display_date", date);
});

document.querySelector(".editform").addEventListener("submit", (e) => {
  e.preventDefault();
  let ef = document.querySelector(".editform");
  let nt = ef.children[0].value;
  let nd = ef.children[1].value;
  let ntim = ef.children[2].value;
  let id = ef.children[3].value;

  Task.prototype.edit(nt, nd, ntim, id);
});
