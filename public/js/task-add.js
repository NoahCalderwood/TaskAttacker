// Handle adding a new task
console.log("Here add task")
const newTaskFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#task-new-name').value.trim();
    const category = document.querySelector('#task-new-category').value.trim();
    const due = document.querySelector('#task-new-date').value;
    const priority = document.querySelector('#task-new-priority').value.trim();
    const time = document.querySelector('#task-new-time').value;

    if (!name || !category || !priority || !time || !due) {
        alert('Please fill out all fields.')
        return;
    }
    console.log({ name, category, due, priority, time })
    const response = await fetch('/api/task', {
        method: 'POST',
        body: JSON.stringify({ name, category, due, priority, time }),
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
