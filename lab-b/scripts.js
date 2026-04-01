class Todo {
  constructor() {
    this.tasks = [];
    this.term = "";
    this.load();
    this.draw();
  }

  add(task) {
    this.tasks.push(task);
    this.save();
    this.draw();
  }

  remove(index) {
    this.tasks.splice(index, 1);
    this.save();
    this.draw();
  }

  edit(index, newTitle, newDate) {
    this.tasks[index] = { title: newTitle, date: newDate };
    this.save();
    this.draw();
  }

  get filteredTasks() {
    if (!this.term || this.term.length < 2) return this.tasks;
    const regex = new RegExp(`(${this.term})`, "gi");
    return this.tasks.map(task => ({
      ...task,
      title: task.title.replace(regex, '<mark>$1</mark>')
    })).filter(task => task.title.toLowerCase().includes(this.term.toLowerCase()));
  }

  draw() {
    const listDiv = document.querySelector("#todo-list");
    listDiv.innerHTML = "";

    this.filteredTasks.forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task-item";
      taskDiv.style.display = "flex";
      taskDiv.style.alignItems = "center";
      taskDiv.style.marginBottom = "5px";

      const titleSpan = document.createElement("span");
      titleSpan.innerHTML = task.title;
      titleSpan.style.cursor = "pointer";
      titleSpan.onclick = () => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = task.title.replace(/<mark>|<\/mark>/g, "");
        input.onblur = () => {
          this.edit(index, input.value, task.date);
        };
        taskDiv.replaceChild(input, titleSpan);
        input.focus();
      };
      taskDiv.appendChild(titleSpan);

      const dateSpan = document.createElement("span");
      dateSpan.textContent = task.date || "";
      dateSpan.style.marginLeft = "10px";
      dateSpan.style.cursor = "pointer";
      dateSpan.onclick = () => {
        const input = document.createElement("input");
        input.type = "date";
        input.value = task.date || "";
        input.onblur = () => {
          this.edit(index, task.title.replace(/<mark>|<\/mark>/g, ""), input.value);
        };
        taskDiv.replaceChild(input, dateSpan);
        input.focus();
      };
      taskDiv.appendChild(dateSpan);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Usuń";
      deleteBtn.style.marginLeft = "auto";
      deleteBtn.onclick = () => this.remove(index);
      taskDiv.appendChild(deleteBtn);

      listDiv.appendChild(taskDiv);
    });
  }

  save() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  load() {
    const stored = localStorage.getItem("tasks");
    if (stored) this.tasks = JSON.parse(stored);
  }
}

// Inicjalizacja
document.todo = new Todo();
