import { renderTasks } from "./ui.js";
import { getTasks, saveTasks } from "./storage.js";

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

let tasks = getTasks();
renderTasks(tasks);

const addTask = () => {
  const text = taskInput.value.trim();

  if (!text) return;

  if (text.length > 80) {
    alert("Task cannot exceed 80 characters.");
    return;
  }

  const task = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  tasks.push(task);
  saveTasks(tasks);
  renderTasks(tasks);
  taskInput.value = "";
};

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

taskList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);

  if (e.target.closest(".delete-task")) {
    tasks = tasks.filter((task) => task.id !== id);
  }
  if (e.target.closest(".complete-task")) {
    tasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );
  }
  saveTasks(tasks);
  renderTasks(tasks);
});

const charCount = document.getElementById("char-count");
taskInput.addEventListener("input", () => {
  const length = taskInput.value.length;
  charCount.textContent = `${length} / 80`;
});
