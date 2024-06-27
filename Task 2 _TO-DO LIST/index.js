"use strict";

const todo_container = document.getElementById("card-container");

function AddList(todo) {
  const input = todo.querySelector("input");
  const todo_task = input.value;
  if (todo_task) {
    input.value = "";
    InsertCard(todo, { text: todo_task, priority: "low", deadline: "No Deadline" });
  }
}

function EditTask(task) {
  const taskText = task.querySelector('.todo');
  const prioritySpan = task.querySelector('.priority');
  const deadlineSpan = task.querySelector('.deadline');

  const newText = prompt('Edit task text', taskText.textContent);
  const newPriority = prompt('Edit task priority (high, medium, low)', prioritySpan.className.replace('priority ', ''));
  const newDeadline = prompt('Edit task deadline', deadlineSpan.textContent);

  if (newText !== null) taskText.textContent = newText;
  if (newPriority !== null) {
    prioritySpan.className = `priority ${newPriority}`;
    prioritySpan.textContent = newPriority.charAt(0).toUpperCase() + newPriority.slice(1);
  }
  if (newDeadline !== null) deadlineSpan.textContent = newDeadline;
}

const InsertTodo = (todo_name, lists = []) => {
  const card = `
    <div class="header flex">
      <h2 class="list-name">${todo_name}</h2>
      <div class="add">
        <input type="text" placeholder="Add todo" aria-label="Add todo" autocomplete="off" />
        <div class="add-btn" data-todo_name="${todo_name}">
          <i class="fa-solid fa-plus"></i>
        </div>
      </div>
    </div>
    <div class="lists">
      <ul id="list-container"></ul>
    </div>
  `;

  const card_container = document.createElement("div");
  card_container.className = "card";
  card_container.innerHTML = card;

  card_container.querySelector(".add-btn").addEventListener("click", () => {
    AddList(card_container);
  });

  const card_delete_btn = document.createElement("div");
  card_delete_btn.className = "card-delete-btn";
  card_delete_btn.innerHTML = `<i class="fa-solid fa-minus"></i>`;
  card_delete_btn.addEventListener("click", () => {
    RemoveTask(card_container);
  });
  card_container.appendChild(card_delete_btn);

  todo_container.appendChild(card_container);

  lists.forEach((todo) => InsertCard(card_container, todo));
};

function CompleteTask(obj) {
  obj.classList.toggle("complete");
}

function RemoveTask(obj) {
  obj.remove();
}

const InsertCard = (todo, todo_list) => {
  const list_container = todo.querySelector("#list-container");

  const cardElement = document.createElement("li");
  cardElement.className = "list";

  const task = document.createElement("span");
  task.className = "todo";
  task.textContent = todo_list.text;
  task.addEventListener("click", () => CompleteTask(task));
  cardElement.appendChild(task);

  const delete_btn = document.createElement("div");
  delete_btn.className = "btn";
  delete_btn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  delete_btn.addEventListener("click", () => RemoveTask(cardElement));
  cardElement.appendChild(delete_btn);

  const edit_btn = document.createElement("div");
  edit_btn.className = "btn";
  edit_btn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
  edit_btn.addEventListener("click", () => EditTask(cardElement));
  cardElement.appendChild(edit_btn);

  const priority_span = document.createElement("span");
  priority_span.className = `priority ${todo_list.priority}`;
  priority_span.textContent = todo_list.priority.charAt(0).toUpperCase() + todo_list.priority.slice(1);
  cardElement.appendChild(priority_span);

  const deadline_span = document.createElement("span");
  deadline_span.className = "deadline";
  deadline_span.textContent = todo_list.deadline;
  cardElement.appendChild(deadline_span);

  list_container.appendChild(cardElement);
};

document.getElementById("add-card-btn").addEventListener("click", () => {
  const input = document.querySelector(".add-card input");
  const todo = input.value;
  if (todo) {
    InsertTodo(todo);
    input.value = "";
  }
});

InsertTodo("Shopping", [
  { text: "Buy an apple", priority: "low", deadline: "Tomorrow" },
  { text: "Buy coconut oil", priority: "medium", deadline: "This week" }
]);
InsertTodo("Habits", [
  { text: "Wake up at 5 AM", priority: "high", deadline: "Every day" },
  { text: "Workout at 5 PM", priority: "high", deadline: "Every day" }
]);
