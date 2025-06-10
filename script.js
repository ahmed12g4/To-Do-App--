// جلب العناصر من الصفحة
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// دالة لإضافة مهمة جديدة
function addTask(text = null, completed = false, dateText = null) {
  const taskText = text || taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task');
    return;
  }

  // إنشاء عنصر قائمة جديد (li)
  const li = document.createElement('li');

  // إنشاء span للنص
  const span = document.createElement('span');
  span.textContent = taskText;

  // لو المهمة متعلم عليها
  if (completed) {
    span.classList.add('completed');
  }

  // عند الضغط على النص يشطب المهمة (toggle completed)
  span.addEventListener('click', () => {
    span.classList.toggle('completed');
    saveTasks();
  });

  // إنشاء عنصر التاريخ
  const dateSpan = document.createElement('small');
  dateSpan.textContent = dateText || new Date().toLocaleString();
  dateSpan.classList.add('task-date');

  // زر الحذف
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';

  // حذف المهمة عند الضغط على زر الحذف
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(li);
    saveTasks();
  });

  // إضافة العناصر لعنصر الـ li
  li.appendChild(span);
  li.appendChild(dateSpan);
  li.appendChild(deleteBtn);

  // إضافة المهمة لقائمة المهام
  taskList.appendChild(li);

  // تأثير المهمة الجديدة (active)
  li.classList.add('active');
  setTimeout(() => {
    li.classList.remove('active');
  }, 2000);

  // مسح النص من حقل الإدخال
  if (!text) taskInput.value = '';

  // حفظ المهام
  saveTasks();
}

// حدث الضغط على زر الإضافة
addBtn.addEventListener('click', () => addTask());

// إضافة المهمة لما تضغط Enter في الحقل
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// التخزين
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    const span = li.querySelector('span');
    const dateSpan = li.querySelector('.task-date');
    tasks.push({
      text: span.textContent,
      completed: span.classList.contains('completed'),
      date: dateSpan.textContent
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// تحميل المهام عند فتح الصفحة
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTask(task.text, task.completed, task.date));
}
loadTasks();

// جلب أيقونة الليست والمينيو
const listIcon = document.querySelector('.fa-list');
const dropdownMenu = document.getElementById('dropdownMenu');

// عند الضغط على الأيقونة
listIcon.addEventListener('click', (e) => {
  e.stopPropagation(); // عشان المينيو ما يتقفلش على طول
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// إغلاق المينيو لما تدوس في أي مكان تاني
document.addEventListener('click', (e) => {
  if (!listIcon.closest('li').contains(e.target) && !dropdownMenu.contains(e.target)) {
    dropdownMenu.style.display = 'none';
  }
});



