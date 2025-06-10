// جلب العناصر
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// إضافة مهمة جديدة
function addTask(text = null, dateText = null, completed = false) {
  const taskText = text || taskInput.value.trim();
  if (taskText === "") {
    alert("من فضلك اكتب مهمة");
    return;
  }

  if (completed) return; // متعرضش المهام المنجزة في الصفحة دي

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;

  span.addEventListener("click", () => {
    span.classList.toggle("completed");
    saveTasks();
    li.remove(); // احذفها من القائمة لأنها بقيت منجزة
  });

  const dateSpan = document.createElement("small");
  dateSpan.textContent = dateText || new Date().toLocaleString();
  dateSpan.classList.add("task-date");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "حذف";
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
    saveTasks();
  });

  li.appendChild(span);
  li.appendChild(dateSpan);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  if (!text) taskInput.value = "";

  saveTasks();
}

// حفظ المهام في localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    const span = li.querySelector("span");
    const date = li.querySelector(".task-date").textContent;
    tasks.push({
      text: span.textContent,
      completed: span.classList.contains("completed"),
      date: date,
    });
  });

  // دمج مع المهام المنجزة لو فيه غيرها
  const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const uncompleted = allTasks.filter((t) => t.completed);
  const newList = [...tasks, ...uncompleted];
  localStorage.setItem("tasks", JSON.stringify(newList));
}

// تحميل المهام الغير منجزة فقط
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    if (!task.completed) {
      addTask(task.text, task.date, task.completed);
    }
  });
}

// الإضافات
addBtn.addEventListener("click", () => addTask());
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

loadTasks();
