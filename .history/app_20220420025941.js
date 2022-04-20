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
    const draw_tasks = document.querySelector("#drawTasks_button");
    // let taskNames = [];
    let tasks = [];    

    function drawTasks() {
       // old version of drawTasks (worked)
        // // refresh task list based on local storage
        // try {
        //     //tasks = JSON.parse(localStorage.tasks);
        //     taskNames = JSON.parse(localStorage.tasks).map(a => a.taskName)
        //     //console.log(testTasks);
        // } catch (e) {
        //     taskNames = [];
        // }
        
        // // delete all drawn tasks
        // try {
        //     const tempTasks = document.querySelectorAll('.task');
        //     tempTasks.forEach((drawnTask) => {
        //         drawnTask.remove();
        //     })
        // } catch (e) {
        //     console.log("Failed to delete drawn tasks.")
        //     console.log(e)
        // }
        
        // // draw tasks
        // try {
        //     taskNames.forEach((task) => {
        //         const list_el = document.querySelector("#tasks");
                
        //         // creates tasks
        //         const task_el = document.createElement("div");
        //         task_el.classList.add("task");
        
        //         const task_content_el = document.createElement("div");
        //         task_content_el.classList.add("content");
        
        //         task_el.appendChild(task_content_el);
        
        //         const task_input_el = document.createElement("input");
        //         task_input_el.classList.add("text");
        //         task_input_el.type = "text";
        //         // determines the displayed text
        //         task_input_el.value = task;
        //         task_input_el.setAttribute("readonly", "readonly");
        
        //         task_content_el.appendChild(task_input_el);
        
        //         // creates buttons (required to display)
        //         const task_actions_el = document.createElement("div");
        //         task_actions_el.classList.add("actions");
        
        //         const task_edit_el = document.createElement("button");
        //         task_edit_el.classList.add("edit");
        //         task_edit_el.innerHTML = "Edit";
        
        //         const task_delete_el = document.createElement("button");
        //         task_delete_el.classList.add("delete");
        //         task_delete_el.innerHTML = "Delete";
        
        //         task_actions_el.appendChild(task_edit_el);
        //         task_actions_el.appendChild(task_delete_el);
        
        //         task_el.appendChild(task_actions_el);
        
        //         list_el.appendChild(task_el);

        //         // edit button functionality
        //         task_edit_el.addEventListener('click', () => {
        //             console.log("edit clicked")
        //             console.log("selected task:")
        //             console.log(task_el)
        //             if (task_edit_el.innerText.toLowerCase() == "edit") {
        //                 task_input_el.removeAttribute("readonly");
        //                 // need to look into .focus
        //                 task_input_el.focus();
        //                 task_edit_el.innerText = "Save";
        //             } else {
        //                 task_input_el.setAttribute("readonly", "readonly");
        //                 task_edit_el.innerText = "Edit";
        //             }
        //         });

        //         // delete button functionality
        //         task_delete_el.addEventListener('click', () => {
        //                 console.log("here")
        //                 console.log(task_el)
        //                 taskNames.remove(task)
        //                 list_el.removeChild(task_el);
        //             });
        //     })
    
        // } catch (e) {
        //     console.log("failed to draw tasks, error:");
        //     console.log(e);
        // }
        
        //=======
        // new version
        
        // refresh task list based on local storage
        try {
            tasks = [];
            JSON.parse(localStorage.tasks).forEach((task) => {
                tasks.push(task);
            });
            // console.log("session tasks array:")
            // console.log(tasks)
            // console.log("local storage tasks")
            // console.log(localStorage.tasks)
            // //console.log(testTasks);
        } catch (e) {
            console.log("caught error likely due to localStorage.tasks being empty. Is this an issue?")
            // HERE IS HOW TO TELL IF THERE ARE NO TASKS
        }
        
        // delete all drawn tasks (prevents dupplication of drawn tasks)
        try {
            document.querySelectorAll('.task').forEach((drawnTask) => {
                drawnTask.remove();
            })
        } catch (e) {
            console.log("Failed to delete drawn tasks.")
            console.log(e)
        }
        
        // draw tasks
        try {
            console.log(tasks)
            tasks.forEach((task) => {
                const list_el = document.querySelector("#tasks");
                
                // creates tasks
                const task_el = document.createElement("div");
                task_el.classList.add("task");
                task_el.id = task.id;
        
                const task_content_el = document.createElement("div");
                task_content_el.classList.add("content");
        

                task_el.appendChild(task_content_el);
                
                
                const task_input_el = document.createElement("input");
                task_input_el.classList.add("text");
                task_input_el.type = "text";
                
                // id code
                const task_id_el = document.createElement("input");
                task_id_el.classList.add("text");
                
                // determines the displayed text
                task_input_el.value = task.taskName;
                task_id_el.value = task.id;
                task_input_el.setAttribute("readonly", "readonly");
                task_id_el.setAttribute("readonly", "readonly");
                task_id_el.setAttribute("style", "display:none");
                
                // new code (temp comment)

                task_content_el.appendChild(task_input_el);
                task_content_el.appendChild(task_id_el);
        
                // creates buttons (required to display)
                const task_actions_el = document.createElement("div");
                task_actions_el.classList.add("actions");
        
                const task_edit_el = document.createElement("button");
                task_edit_el.classList.add("edit");
                task_edit_el.innerHTML = "Edit";
        
                // const task_delete_el = document.createElement("button");
                // task_delete_el.classList.add("delete");
                // task_delete_el.innerHTML = "Delete";
                const task_edit_icon = document.createElement("i");
                task_edit_icon.innerHTML = '<i class="fa-solid fa-pencil"></i>';

                const task_delete_icon = document.createElement("i");
                task_delete_icon.innerHTML = '<i class="fa-solid fa-trash" onclick="deleteTask()"></i>';
                

        
                task_actions_el.appendChild(task_edit_icon);
                // task_actions_el.appendChild(task_delete_el);
                task_actions_el.appendChild(task_delete_icon);
        
                task_el.appendChild(task_actions_el);
        
                list_el.appendChild(task_el);

                // edit button functionality
                task_edit_el.addEventListener('click', () => {
                    // console.log("selected task:")
                    // console.log(task_el)
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
                task_delete_icon.addEventListener('click', () => {
                        // console.log("here")
                        console.log(task_el.id)
                        // var getLocalStorage = JSON.parse(localStorage);
                        // console.log(JSON.parse(localStorage.tasks).length)
                        
                        // JSON.parse(localStorage.tasks).indexOf()
                        const tempLocalStorage = [];

                        for (var i = 0; i < JSON.parse(localStorage.tasks).length; i++){
                            console.log("yay")
                            var value = getLocalStorage[i]

                            // console.log(JSON.parse(localStorage.tasks))
                            // console.log(getLocalStorage.length)
                        }
                        
                        const index = JSON.parse(localStorage.tasks).findIndex(object => {
                            console.log("here")
                            console.log(object.id === task_el.id);
                        })
                        
                        for (var i = 0; i < JSON.parse(localStorage.tasks).length; i++){
                            console.log("yay")
                            var value = getLocalStorage[i]

                            // console.log(JSON.parse(localStorage.tasks))
                            // console.log(getLocalStorage.length)
                        }

                        // console.log(task.id)
                        // remove task from tasks array, may need a better solution as project scales (memory management, this still creates a new array)
                        // tasks = tasks.filter(function(el) { return el.id != task.id; });
                        // tasks.forEach((currentTask) => {
                        //     console.log(currentTask.id)
                        //     console.log(task.id)
                        //     if (currentTask.id == task.id) {
                        //         console.log("Found it")
                        //         console.log("remove this task")
                        //     } {
                        //         console.log("nope")
                        //     }
                        //     console.log("====")
                        // })

                        // list_el.removeChild(task_el);
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

        // const task = input.value;
        // task object is created here
        const taskObj = {
            taskName:input.value, 
            status:"TEMP", 
            id: Math.floor(Date.now() + Math.random()),
            priority: "TEMP"
        }
        // alert if no task entered when submitted
        if (!input.value) {
            alert("no text entered");
            return;
        }
       
        tasks.push(taskObj);
        console.log("tasks array:")
        console.log(tasks)
        console.log("=====")
        localStorage.setItem("tasks", JSON.stringify(tasks));
        // Storage.setItem("tasks", )
        
        input.value = "";

        // refresh tasks by calling drawTask function
        drawTasks();

        // edit button funcitonality
        // task_edit_el.addEventListener('click', () => {
        //     console.log("edit clicked")
        //     if (task_edit_el.innerText.toLowerCase() == "edit") {
        //         task_input_el.removeAttribute("readonly");
        //         task_input_el.focus();
        //         task_edit_el.innerText = "Save";
        //     } else {
        //         task_input_el.setAttribute("readonly", "readonly");
        //         task_edit_el.innerText = "Edit";
        //     }
        // });

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
            console.log("session tasks array:")
            console.log(tasks)
            console.log("local storage:")
            console.log(JSON.parse(localStorage.tasks))
            console.log("========")
        } catch (e) {
            console.log("No tasks in local storage.")
        }
    });

    // drawTasks dev button functionality
    draw_tasks.addEventListener('click', () => {
        drawTasks();
    });

});

// temp settings popup functionality
function toggleSettings() {
    document.getElementById("settings_popup").classList.toggle("active");
}

document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
        document.getElementById("settings_popup").classList.toggle("active");
	}
});

function toggleDuplicates() {
    console.log("user wants to toggle duplicates!")
}

function deleteTask() {
    console.log("icon clicked")
    return this.id
}






// testing gpt-j fetch request
let returnedText = "";
function testAPI() {
    console.log("this should hold response:")
    fetch("https://api.ai21.com/studio/v1/j1-jumbo/complete", {
      headers: {
        "Authorization": "Bearer X9U5ZKe7tI7oe5ni0zPLyIUo3w19xJCS",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          "prompt": "Joke: ",
          "numResults": 1,
          "maxTokens": 64,
          "temperature": 0.7,
          "topKReturn": 0,
          "topP":1,
          "countPenalty": {
            "scale": 0,
            "applyToNumbers": false,
            "applyToPunctuations": false,
            "applyToStopwords": false,
            "applyToWhitespaces": false,
            "applyToEmojis": false
          },
          "frequencyPenalty": {
            "scale": 0,
            "applyToNumbers": false,
            "applyToPunctuations": false,
            "applyToStopwords": false,
            "applyToWhitespaces": false,
            "applyToEmojis": false
          },
          "presencePenalty": {
            "scale": 0,
            "applyToNumbers": false,
            "applyToPunctuations": false,
            "applyToStopwords": false,
            "applyToWhitespaces": false,
            "applyToEmojis": false
          },
          "stopSequences":["\n"]
        }),
      method: "POST"
    }).then(response => response.json()).then(data => {
        returnedText = data;
        printResponse();
    });
}

function printResponse() {
    console.log(returnedText)
    alert(returnedText.completions[0].data.text)
}