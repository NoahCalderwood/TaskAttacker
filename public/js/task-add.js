// Handle adding a new task
const newTaskFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#task-new-name').value.trim();
    const category = document.querySelector('#task-new-category').value.trim();
    const priority = document.querySelector('#task-new-priority');
    // const due = document.querySelector('#task-new-date);
    // const time = document.querySelector('#task-new-time);
    // const tododay = document.querySelector('#task-new-day');

    if (name && category && priority) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ name, category, priority }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/homepage');
        } else {
            alert('Failed to create new task');
        }
    }
};

document
    .querySelector('.new-task-form')
    .addEventListener('submit', newTaskFormHandler);
