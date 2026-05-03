const taskInput = document.getElementById("taskInput");
const timeInput = document.getElementById("timeInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load saved tasks
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  const taskTime = timeInput.value;

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  const task = {
    text: taskText,
    time: taskTime,
    completed: false
  };

  createTaskElement(task);
  saveTask(task);

  taskInput.value = "";
  timeInput.value = "";
}

function createTaskElement(task) {
  const li = document.createElement("li");

  if (task.completed) {
    li.classList.add("completed");
  }

  const taskInfo = document.createElement("div");
  taskInfo.classList.add("task-info");

  taskInfo.innerHTML = `
    <strong>${task.text}</strong>
    <small>${task.time || ""}</small>
  `;

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✔";
  completeBtn.classList.add("complete");

  completeBtn.onclick = () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.classList.add("delete");

  deleteBtn.onclick = () => {
    li.remove();
    updateLocalStorage();
  };

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(taskInfo);
  li.appendChild(actions);

  taskList.appendChild(li);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task));
}

function updateLocalStorage() {
  const allTasks = [];

  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector("strong").textContent;
    const time = li.querySelector("small").textContent;

    allTasks.push({
      text,
      time,
      completed: li.classList.contains("completed")
    });
  });

  localStorage.setItem("tasks", JSON.stringify(allTasks));
}
