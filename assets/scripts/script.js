Initialize.prototype.initialize();

download_btn.addEventListener("click", () => {
  window.print();
});

add_task_btn.addEventListener("click", () => {
  let styles = window.getComputedStyle(history_form);
  if (styles.getPropertyValue("display") !== "none") history_btn.click();

  if (add_task_form.style.display == "flex") {
    add_task_form.style.display = "none";
    add_task_btn.style.backgroundImage =
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z' fill='rgba(255,255,255,1)'/%3E%3C/svg%3E\")";
  } else {
    add_task_form.style.display = "flex";
    document.querySelector(".form__name").focus();
    add_task_btn.style.backgroundImage =
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z' fill='rgba(255,255,255,1)'/%3E%3C/svg%3E\")";
  }
});

history_btn.addEventListener("click", () => {
  let styles = window.getComputedStyle(add_task_form);
  if (styles.getPropertyValue("display") !== "none") add_task_btn.click();

  if (history_form.style.display == "block") {
    history_form.style.display = "none";
  } else {
    history_form.style.display = "block";

  }
});

add_task_form.addEventListener("submit", (e) => {
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
  Initialize.prototype.initialize_tasks(date);
  history_form.style.display = "none";
});
