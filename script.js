function showForm() {
  var test = document.getElementById("second-screen");
  test.style.display = "block";
}

function goBack() {
  var test = document.getElementById("second-screen");
  test.style.display = "none";
}

function closeDeletePopup() {
  var test = document.getElementById("outer-delete-div");
  test.style.display = "none";
}

function showDelete(taskItem) {
  var test = document.getElementById("outer-delete-div");
  test.style.display = "block";

  var confirmation = document.getElementById("confirm-delete-button");
  confirmation.onclick = function () {
    deleteTask(taskItem);
    closeDeletePopup();
  };
}

function deleteTask(taskItem) {
  taskItem.remove();
  let myAudio = document.querySelector("#audio");
  myAudio.play();
  saveData();
}

function addingtask(event) {
  event.preventDefault();
  var taskname = document.getElementById("task-name");
  var description = document.getElementById("description");
  var startdate = document.getElementById("start-date");
  var enddate = document.getElementById("end-date");
  var prior = document.getElementById("priority");
  var category = document.getElementById("category");

  const list = document.getElementById("task-list");
  var message = document.getElementById("message");
  var li = document.createElement("li");
  li.setAttribute('id', 'li');


  if (taskname.value === "") {
    alert("Task name can't be empty");
    return;
  } else if (description.value === "") {
    alert("Description can't be empty");
    return;
  } else if (startdate.value === "") {
    alert("Start date can't be empty");
    return;
  } else if (enddate.value === "") {
    alert("End date can't be empty");
    return;
  } else if (prior.value === "") {
    alert("Please select a priority for your task");
    return;
  } else if (category.value === "") {
    alert("Please select a category for your task");
    return;
  }

  if (enddate.value < startdate.value) {
    alert("End date can not be before starting date!");
    return;
  }

  var taskContent = document.createElement("span");

  // creating checkbox
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  taskContent.textContent = `Task: ${taskname.value} - Description: ${description.value} - Start Date: ${startdate.value} - End Date: ${enddate.value} - Priority: ${prior.value} - Category: ${category.value}`;

  var taskActions = document.createElement("div");
  taskActions.className = "task-actions";

  var editButton = document.createElement("button");
  editButton.className = "edit";
  editButton.textContent = "Edit";
  editButton.onclick = function () {
    editTask(li, taskContent);
  };

  var deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    showDelete(li);
  };

  li.setAttribute('category', category.value);
  li.setAttribute('status', "Pending");


  taskActions.appendChild(editButton);
  taskActions.appendChild(deleteButton);
  li.appendChild(checkbox);
  li.appendChild(taskContent);
  li.appendChild(taskActions);

  if (prior.value === "High") {
    li.classList.add("high-priority");
  } else if (prior.value === "Medium") {
    li.classList.add("medium-priority");
  } else if (prior.value === "Low") {
    li.classList.add("low-priority");
  }

  list.appendChild(li);

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      taskContent.style.textDecoration = "line-through";
      li.setAttribute('status', "Completed");
    } else {
      taskContent.style.textDecoration = "none";
      li.setAttribute('status', "Pending");
    }
  });

  saveData();

  // making every text input box empty again
  taskname.value = "";
  description.value = "";
  startdate.value = "";
  enddate.value = "";
  prior.value = "";
  category.value = "";
  goBack();
}

function editTask(taskItem, taskContent) {
  // var popup = document.getElementById("second-screen");
  // popup.style.display = "block";

  // var taskname = document.getElementById("task-name");
  // var description = document.getElementById("description");
  // var startdate = document.getElementById("start-date");
  // var enddate = document.getElementById("end-date");
  // var prior = document.getElementById("priority");


  // var taskParts = taskContent.textContent.split(" - ");

  // taskname.value = taskParts[0];
  // description.value = taskParts[1];
  // startdate.value = taskParts[2];
  // enddate.value = taskParts[3];
  // prior.value = taskParts[4];

  // document.getElementById("click-to-add-task").style.display = "none";
  // document.getElementById("save-changes").style.display = "inline";

  var taskParts = taskContent.textContent.split(" - ");
  var taskname = prompt("Edit Task Name", taskParts[0].replace("Task: ", ""));
  var description = prompt("Edit Description", taskParts[1].replace("Description: ", ""));
  var startdate = prompt("Edit Start Date", taskParts[2].replace("Start Date: ", ""));
  var enddate = prompt("Edit End Date", taskParts[3].replace("End Date: ", ""));
  var prior = prompt("Edit Priority", taskParts[4].replace("Priority: ", ""));
  var category = prompt("Edit Category", taskParts[5].replace("Category: ", ""));

  if (
    taskname !== null &&
    description !== null &&
    startdate !== null &&
    enddate !== null &&
    prior !== null &&
    category !== null
  ) {
    if (new Date(enddate) >= new Date(startdate)) {
      taskContent.textContent = `Task: ${taskname} - Description: ${description} - Start Date: ${startdate} - End Date: ${enddate} - Priority: ${prior} - Category: ${category}`;
      taskItem.setAttribute('category', category);
      // saveChanges(li, taskContent);

      // Remove existing priority classes
      taskItem.classList.remove(
        "high-priority",
        "medium-priority",
        "low-priority"
      );

      // Add new priority class
      if (prior === "High") {
        taskItem.classList.add("high-priority");
      } else if (prior === "Medium") {
        taskItem.classList.add("medium-priority");
      } else if (prior === "Low") {
        taskItem.classList.add("low-priority");
      }
      saveData();
    } else {
      alert("End date cannot be before start date!");
    }
  }
}

function checkEmptyList() {
  var list = document.getElementById("task-list");
  var message = document.getElementById("message");

  if (list.children.length === 0) {
    message.style.display = "block";
  } else {
    message.style.display = "none";
  }
}

checkEmptyList();

setInterval(checkEmptyList, 1);

function saveData() {
  const list = document.getElementById("task-list");
  localStorage.setItem("data", list.innerHTML);
}

function saveChanges(li, taskContent){
  var taskname = document.getElementById("task-name");
  var description = document.getElementById("description");
  var startdate = document.getElementById("start-date");
  var enddate = document.getElementById("end-date");
  var prior = document.getElementById("priority");
  var category = document.getElementById("category");

  taskContent.textContent = `Task: ${taskname} - Description: ${description} - Start Date: ${startdate} - End Date: ${enddate} - Priority: ${prior} - Category: ${category}`;
}

function showTasks() {
  const list = document.getElementById("task-list");
  const data = localStorage.getItem("data");
  if (data) {
    list.innerHTML = data;

    // Reattach everything from local storage back to the variables from our code
    const tasks = list.getElementsByTagName("li");

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const checkbox = task.querySelector("input[type='checkbox']");
      const taskContent = task.querySelector("span");
      const editButton = task.querySelector(".edit");
      const deleteButton = task.querySelector(".delete");

      checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
          taskContent.style.textDecoration = "line-through";
        } else {
          taskContent.style.textDecoration = "none";
        }
      });

      editButton.onclick = function () {
        editTask(task, taskContent);
      };

      deleteButton.onclick = function () {
        deleteTask(task);
      };
    }
  }
}
showTasks();


function getSelectedCategories() {
  var selectedCategories = [];
  var categoryCheckboxes = document.querySelectorAll('#filter-container input[type = "checkbox"]');
  categoryCheckboxes.forEach(function(checkbox)
  {
    if (checkbox.checked)
      {
        selectedCategories.push(checkbox.value);
      }
  })
  return selectedCategories;
}


function filter() {

  var selectedCategories = getSelectedCategories();
  var selectedStatus = document.getElementById("filter-status").value;
  var all_tasks = document.querySelectorAll("#task-list li");

  all_tasks.forEach(function(task) {
    var taskCategory = task.getAttribute('category');
    var taskStatus = task.getAttribute('status');
    
    var categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(taskCategory);
    var statusMatch = selectedStatus === "All" || selectedStatus === "" || taskStatus === selectedStatus;

    if (categoryMatch && statusMatch) {
        task.style.display = "block";
    } else {
        task.style.display = "none";
    }
});
hideFilter();
}

function hideFilter(){
  event.preventDefault(); 
  var form = document.getElementById("filter-container");
  form.style.display = "none";
}

function showFilter(){
  var form = document.getElementById("filter-container");
  form.style.display = "block";
}


function sortTasks() {
  var sortOption = document.getElementById("sorting").value;
  var tasks = document.querySelectorAll("#task-list li");
  var tasksArray = Array.from(tasks);

  if (sortOption === "Priority") {
      tasksArray.sort(function(a, b) {
          var priorityA = a.querySelector('span').textContent.split(" - ")[4];
          var priorityB = b.querySelector('span').textContent.split(" - ")[4];
          return getPriorityValue(priorityA) - getPriorityValue(priorityB);
      });
  } else if (sortOption === "Duedate") {
      tasksArray.sort(function(a, b) {
          var dueDateA = new Date(a.querySelector('span').textContent.split(" - ")[3]);
          var dueDateB = new Date(b.querySelector('span').textContent.split(" - ")[3]);
          return dueDateA - dueDateB;
      });
  }

  var ul = document.getElementById("task-list");
  ul.innerHTML = "";
  tasksArray.forEach(function(task) {
      ul.appendChild(task);
  });
}

function getPriorityValue(priority) {
  switch (priority) {
      case "High":
          return 4;
      case "Medium":
          return 3;
      case "Low":
          return 2;
      default:
          return 1;
  }
}

