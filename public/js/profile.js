const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#task-name').value.trim();
  const task_priority = document.querySelector('#task-priority').value.trim();
  const description = document.querySelector('#task-desc').value.trim();
  //const mondayTask = document.querySelector('#Monday').checked;

  if (name && task_priority && description) {
    const response = await fetch(`/api/tasks`, {
      method: 'POST',
      body: JSON.stringify({ name, task_priority, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/task/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete task');
    }
  }
};

document
  .querySelector('.new-task-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.task-list')
  .addEventListener('click', delButtonHandler);
