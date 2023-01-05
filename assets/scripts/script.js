// Initialization
Initialize.prototype.initialize();

// Update
Update.prototype.update();

// add task

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
