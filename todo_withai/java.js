import { todoList } from './todoList.js';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const dueDate = document.getElementById('due-date');
  const todoListElem = document.getElementById('todo-list');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const todoText = input.value.trim();
    const todoDate = dueDate.value;
    if (todoText !== '') {
      const newItem = todoList.add(todoText, todoDate);
      renderTodoItem(newItem);
      input.value = '';
      dueDate.value = '';
    }
  });

  // To-Do 항목 표시
  function renderTodoItem(todoItem) {
    const li = document.createElement('li');
    li.textContent = `${todoItem.title} (Due: ${todoItem.dueDate})`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.addEventListener('click', function () {
      li.remove();
      todoList.remove(todoItem);
    });

    li.appendChild(deleteButton);
    todoListElem.appendChild(li);

    li.addEventListener('click', function () {
      li.classList.toggle('completed');
      todoList.toggleComplete(todoItem);
    });
  }

  // 저장된 To-Do 항목 표시
  todoList.load();
  todoList.items.forEach(item => {
    renderTodoItem(item);
  });
});
