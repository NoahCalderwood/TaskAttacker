// Handle the edit task button by deleting old task and use PUT to replace with the new one
const task_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];

const updateTaskFormHandler = async (event) => {
    event.preventDefault();

    const task = document.querySelector('#task-edit-name').value.trim();
    const category = document.querySelector('#task-edit-category').value.trim();
    const priority = document.querySelector('#task-edit-priority');
    // const due = document.querySelector('#task-edit-date);
    // const time = document.querySelector('#task-edit-time);
    // const tododay = document.querySelector('#task-edit-day');
    // const week = document.querySelector('#task-edit-week');

    if (task && category && priority) {
        const response = await fetch(`/api/task/${task_id}`, {
            method: "PUT",
            body: JSON.stringify({ task, category, priority }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to update a task.');
        }
    }
};

const deleteTaskFormHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(`/api/posts/${post_id}`, {
        method: "DELETE",
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete a task.');
    }
};

document
    .querySelector('.update-task-form')
    .addEventListener('submit', updateTaskFormHandler);

document
    .querySelector('#delete-task')
    .addEventListener('click', deleteTaskFormHandler);

