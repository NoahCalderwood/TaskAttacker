// const deleteFormHandler = async (event) => {
//   event.preventDefault();

//   const id = window.location.toString().split("/")[
//     window.location.toString().split("/").length - 1
//   ];

//   console.log(id);

//   const response = await fetch(`/api/task/${id}`, {
//     method: "DELETE",
//     body: JSON.stringify({
//       task_id: id,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (response.ok) {
//     document.location.replace("/profile");
//   } else {
//     alert(response.statusText);
//   }


// };

// document.querySelector("#delete").addEventListener("click", deleteFormHandler);

// Handle the delete task button
const deleteTask = async (task_id) => {
  const response = await fetch(`/api/task/${task_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert('Failed to delete task.');
  }
};
console.log(deleteTask)
const deleteTaskHandler = (event) => {
  if (event.target.hasAttribute('.delete-task')) {
    const task_id = event.target.getAttribute('data-task-id');
    deleteTask(task_id);
  }
};

document.addEventListener('click', deleteTaskHandler);