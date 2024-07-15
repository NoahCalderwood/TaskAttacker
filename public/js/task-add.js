// Handle adding a new task
const newTaskFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#task-new-name').value.trim();
    const category = document.querySelector('#task-new-category').value.trim();
    const due = document.querySelector('#task-new-date');
    const tododay = document.querySelector('#task-new-day');
    const priority = document.querySelector('#task-new-priority');
    const time = document.querySelector('#task-new-time');

    if (!name || !category || !priority) {
        alert('Please fill out all fields.')
        return;
    }
    if (!due && !tododay) {
        alert('Please fill out either due date or day checkboxes.')
        return;
    }

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ name, category, due, tododay, priority, time }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        alert('Failed to create new task');
        return;
    }

    document.location.replace('/homepage');
};

document
    .querySelector('.new-task-form')
    .addEventListener('submit', newTaskFormHandler);
