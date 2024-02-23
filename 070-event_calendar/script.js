"use strict";

window.onload = function () {
  generateCalendar();
};

function generateCalendar() {
  const calendar = document.querySelector("#calendar");
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay() - 1;
  const totalDays = lastDayOfMonth.getDate();

  for (let i = 0; i < firstDayOfWeek; i++) {
    let blankDay = document.createElement("div");
    calendar.append(blankDay);
  }

  for (let day = 1; day <= totalDays; day++) {
    let dayBlock = document.createElement("div");
    dayBlock.className = "calendar-day";
    dayBlock.textContent = day;
    dayBlock.id = `day-{day}`;
    calendar.append(dayBlock);
  }
}

function showAddTaskModal() {
  document.querySelector("#add-task-modal").style.display = "block";
}

function closeAddTaskModal() {
  document.querySelector("#add-task-modal").style.display = "none";
}

function deleteTask(taskElement) {
  if (confirm("Are you sure you want to delete this task?")) {
    taskElement.parentNode.removeChild(taskElement);
  }
}

function editTask(taskElement) {
  const newTaskDesc = prompt("Edit your task:", taskElement.textContent);
  if (newTaskDesc.trim()) {
    taskElement.textContent = newTaskDesc;
  }
}

function addTask() {
  const taskDate = new Date(document.getElementById("task-date").value);
  const taskDesc = document.getElementById("task-desc").value.trim();

  if (taskDesc && !isNaN(taskDate.getDate())) {
    const calendarDays = document.getElementById("calendar").children;
    Array.from(calendarDays).forEach((element) => {
      const day = element;
      if (parseInt(day.textContent) === taskDate.getDate()) {
        const taskElement = document.createElement("div");
        taskElement.className = "task";
        taskElement.textContent = taskDesc;
        taskElement.addEventListener("contextmenu", (e) => {
          e.preventDefault();
          deleteTask(taskElement);
        });
        taskElement.addEventListener("click", () => {
          editTask(taskElement);
        });
        day.append(taskElement);
        return;
      }
    });
    closeAddTaskModal();
  } else {
    alert("Please enter valid date and description!");
  }
}

/* https://youtu.be/QiVoPKzylck?si=KvgFRMayiGWAi1p2&t=1320 */
