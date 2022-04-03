//window.localStorage
// localStorage.setItem('testObject', 'testValue');
// const testConst = localStorage.getItem('testObject');
// localStorage.removeItem('testObject');
// console.log(Storage.toString());


// add option to allow for duplicate tasks or not (add id for each task and use that to refer to instad of name)

window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const delete_all = document.querySelector("#delete_all");
    const print_all = document.querySelector("#print_all");
    let taskNames = [];
    let tasks = [];    

    
    function drawTasks() {
        // refresh task list based on local storage
        try {
            //tasks = JSON.parse(localStorage.tasks);
            taskNames = JSON.parse(localStorage.tasks).map(a => a.taskName)
            //console.log(testTasks);
        } catch (e) {
            taskNames = [];
        }
        
        // delete all drawn tasks
        try {
            const tempTasks = document.querySelectorAll('.task');
            tempTasks.forEach((drawnTask) => {
                drawnTask.remove();
            })
        } catch (e) {
            console.log("Failed to delete drawn tasks.")
            console.log(e)
        }
        
        // draw tasks
        try {
            taskNames.forEach((task) => {
                const list_el = document.querySelector("#tasks");
                
                // creates tasks
                const task_el = document.createElement("div");
                task_el.classList.add("task");
        
                const task_content_el = document.createElement("div");
                task_content_el.classList.add("content");
        
                task_el.appendChild(task_content_el);
        
                const task_input_el = document.createElement("input");
                task_input_el.classList.add("text");
                task_input_el.type = "text";
                // determines the displayed text
                task_input_el.value = task;
                task_input_el.setAttribute("readonly", "readonly");
        
                task_content_el.appendChild(task_input_el);
        
                // creates buttons (required to display)
                const task_actions_el = document.createElement("div");
                task_actions_el.classList.add("actions");
        
                const task_edit_el = document.createElement("button");
                task_edit_el.classList.add("edit");
                task_edit_el.innerHTML = "Edit";
        
                const task_delete_el = document.createElement("button");
                task_delete_el.classList.add("delete");
                task_delete_el.innerHTML = "Delete";
        
                task_actions_el.appendChild(task_edit_el);
                task_actions_el.appendChild(task_delete_el);
        
                task_el.appendChild(task_actions_el);
        
                list_el.appendChild(task_el);

                // edit button functionality
                task_edit_el.addEventListener('click', () => {
                    console.log("edit clicked")
                    if (task_edit_el.innerText.toLowerCase() == "edit") {
                        task_input_el.removeAttribute("readonly");
                        // need to look into .focus
                        task_input_el.focus();
                        task_edit_el.innerText = "Save";
                    } else {
                        task_input_el.setAttribute("readonly", "readonly");
                        task_edit_el.innerText = "Edit";
                    }
                });

                // delete button functionality
                task_delete_el.addEventListener('click', () => {
                        console.log("here")
                        console.log(task_el)
                        taskNames.remove(task)
                        list_el.removeChild(task_el);
                    });
            })
    
        } catch (e) {
            console.log("failed to draw tasks, error:");
            console.log(e);
        }
    };
    
    // drawTasks when page is first loaded
    drawTasks();


    // adding tasks
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        // this is a temporary task, objects need to be instanced and exist in the global scope (and saved in the local storage)
        const taskObj = {
            taskName:input.value, 
            status:"TEMP", 
            id: Math.floor(Date.now() + Math.random()),
            priority: "TEMP"
        }
        // alert if no task entered when submitted
        if (!task) {
            alert("no text entered");
            return;
        }
       
        tasks.push(taskObj);
        console.log("tasks array:")
        console.log(tasks)
        console.log("taskNames array")
        console.log(taskNames)
        console.log("=====")
        localStorage.setItem("tasks", JSON.stringify(tasks));
        // Storage.setItem("tasks", )
        
        input.value = "";

        // refresh tasks by calling drawTask function
        drawTasks();

        // edit button funcitonality
        task_edit_el.addEventListener('click', () => {
            console.log("edit clicked")
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "Save";
            } else {
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Edit";
            }
        });

    });
    
    // delete button functionality (not working)


    // console.log(task_delete_el);
    // task_delete_el.addEventListener('click', () => {
    //     console.log("here")
    //     list_el.removeChild(task_el);
    // });
    
    // const testVar = document.querySelector(".task .actions .delete");
    // console.log(testVar);

    // testVar.addEventListener('click', () => {
    //     console.log("here")
    //     list_el.removeChild(task_el);
    // });
    
    // delete_all functionality
    delete_all.addEventListener('click', () => {
        console.log("Local storage cleared.");
        localStorage.clear();
        drawTasks();
    });
    
    print_all.addEventListener('click', () => {
        try {
            console.log("local storage:")
            console.log(JSON.parse(localStorage.tasks))
            console.log("========")
        } catch (e) {
            console.log("No tasks in local storage.")
        }
    });
});

