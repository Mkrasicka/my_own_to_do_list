const list = document.querySelector('ul');
const textInput = document.querySelector('input.search');
const form = document.querySelector('form');
const taskCount = document.querySelector('h1 span');
const toDoList = [];

const addTask = function(e) {
  e.preventDefault();
  const input = form.querySelector('input');
  const taskTitle = input.value;
  if (taskTitle.trim() === "") return;

  const task = document.createElement('li');
  task.className = "task";
  task.innerHTML = taskTitle + "<button>Delete</button>";
  toDoList.push(task);

  list.appendChild(task);

  input.value = "";
  taskCount.textContent = toDoList.length;

  const btn = task.querySelector('button');
  btn.addEventListener('click', removeTask);
}

const removeTask = (e) => {
  const taskIndex = toDoList.indexOf(e.currentTarget.parentNode);
  if (taskIndex !== -1) {
    toDoList.splice(taskIndex, 1);
  }
  e.currentTarget.parentNode.remove();
  taskCount.textContent = toDoList.length;
}

const searchTask = () => {
  const inputSearch = textInput.value.toLowerCase();

  toDoList.forEach(task => {
    const taskText = task.textContent.toLowerCase();
    if (taskText.includes(inputSearch)) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });

  const visibleTasks = toDoList.filter(task => task.style.display !== "none");
  taskCount.textContent = visibleTasks.length;
}

form.addEventListener('submit', addTask);
textInput.addEventListener('input', searchTask);
