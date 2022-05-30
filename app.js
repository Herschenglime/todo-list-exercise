/*
Tasks:

* understand this code

* fix the joke button (very easy)

* add emoji button (more difficult)
    * this button should be added on the left of the edit button for each task
    * clicking this button will add a random emoji to the end of the task
    * you don't need to touch html file and css is just for styling, so focus on js
    * good luck!
    *
    * Could make a toggle if wanted for above and beyond

*/


var allowDuplicates = true;

window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const delete_all = document.querySelector("#delete_all");
    const print_all = document.querySelector("#print_all");
    const draw_tasks = document.querySelector("#drawTasks_button");
    
    // array that stores all tasks in easily-accessible format, but that doesn't save upon page refresh
    let tasks = [];    

    // Each task has its own HTML element, this function handles creating each element with a forEach() loop.
    // Function also refreshes all displayed tasks when called (refreshes task list)
    function drawTasks() {
        
        // refresh task array based on local storage
        try {
            tasks = [];
            JSON.parse(localStorage.tasks).forEach((task) => {
                tasks.push(task);
            }) 
        } catch (e) {
            console.log("caught error likely due to localStorage.tasks being empty. Is this an issue?")
            // HERE IS HOW TO TELL IF THERE ARE NO TASKS
        }
        
        // delete all drawn tasks (prevents duplication of drawn tasks)
        try {
            document.querySelectorAll('.task').forEach((drawnTask) => {
                drawnTask.remove();
            })
        } catch (e) {
            console.log("Failed to delete drawn tasks.")
            console.log(e)
        }
        
        // draw each task
        try {
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
                
                // determines the displayed text
                task_input_el.value = task.taskName;
                task_input_el.setAttribute("readonly", "readonly");
            
                task_content_el.appendChild(task_input_el);
        
                // creates buttons (required to display)
                const task_actions_el = document.createElement("div");
                task_actions_el.classList.add("actions");
        
                const task_edit_el = document.createElement("button");
                task_edit_el.classList.add("edit");
                task_edit_el.innerHTML = "Edit";
        
                const task_emoji_icon = document.createElement("i");
                task_emoji_icon.innerHTML = '<i class="fa-solid fa-face-laugh"></i>';

                const task_edit_icon = document.createElement("i");
                // creates the icon (this code is found at fontawesome.com)
                task_edit_icon.innerHTML = '<i class="fa-solid fa-pencil"></i>';

                const task_delete_icon = document.createElement("i");
                task_delete_icon.innerHTML = '<i class="fa-solid fa-trash""></i>';
                
                task_actions_el.appendChild(task_emoji_icon);
                task_actions_el.appendChild(task_edit_icon);
                task_actions_el.appendChild(task_delete_icon);
                
                task_el.appendChild(task_actions_el);
        
                list_el.appendChild(task_el);

                // emoji button functionality
                task_emoji_icon.addEventListener('click', () => {
                    let taskName =  tasks[getIndexById(task_el.id)].taskName;

                    //emoji detection: https://stackoverflow.com/questions/18862256/how-to-detect-emoji-using-javascript
                    // only toggles emoji at end of task, leaving others intact
                    if (/\.*\p{Extended_Pictographic}$/u.test(taskName)) {
                        tasks[getIndexById(task_el.id)].taskName = taskName.replace(/\p{Extended_Pictographic}$/gu, "") //cuts off emoji if there
                    }
                    else {
                        tasks[getIndexById(task_el.id)].taskName += randomEmoji() //otherwise adds emoji
                    }


                    localStorage.setItem("tasks", JSON.stringify(tasks));

                    drawTasks();
                });


                // edit button functionality
                task_edit_icon.addEventListener('click', () => {
                    task_input_el.removeAttribute("readonly");
                    task_input_el.focus();

                    document.addEventListener('keydown', function(event){
                        if(event.key === "Enter"){
                            task_input_el.setAttribute("readonly", "readonly")
                            
                            tasks[getIndexById(task_el.id)].taskName = task_input_el.value;
                            localStorage.setItem("tasks", JSON.stringify(tasks));

                            drawTasks();
                        }
                    });
                });

                // delete button functionality
                task_delete_icon.addEventListener('click', () => {
                        var tempLocalStorageDelete = JSON.parse(localStorage.getItem("tasks")); //TODO: inquire about scoping of this var
                        
                        tempLocalStorageDelete.splice(getIndexById(task_el.id), 1);

                        localStorage.setItem("tasks", JSON.stringify(tempLocalStorageDelete))

                        drawTasks();
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
        
        // prevent duplicates (if enabled)
        // TODO: Make it delete already duplicated entries
        var tempDupToggle;
        tasks.forEach((task) => {
            if (task.taskName == input.value && !allowDuplicates) {
                alert("duplicate task entered!")
                input.value = "";
                tempDupToggle = true;
                return;
            }
        })
        
        // prevent blank tasks
        if (!input.value) {
            if (tempDupToggle) {
                tempDupToggle = !tempDupToggle;
                return;
            }
            alert("no text entered");
            return;
        }

        // create task object
        // no such thing as a prototype/constructor in javascript?
        const taskObj = {
            taskName:input.value, 
            status:"TEMP", 
            id: Math.floor(Date.now() + Math.random()), //why? isn't there the possibility of not having a uid with this?
            priority: "TEMP"
        }

       // append individual task to tasks array, then update localStorage to match
        tasks.push(taskObj);
        localStorage.setItem("tasks", JSON.stringify(tasks)); //potentially wasteful, but idk how else to do it
        
        // clear input field
        input.value = "";

        // refresh tasks by calling drawTask function so that new task is displayed
        drawTasks();

    });
    
    // delete_all functionality
    delete_all.addEventListener('click', () => {
        console.log("Local storage cleared.");
        localStorage.clear();
        drawTasks();
    });
    
    // print all functionality
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

// allow user to use escape to toggle settings (note that this should be updated as it's currently constantly checking for escape, it should only check when the settings is opened)
document.addEventListener('keydown', function(event){
	if(event.key === "Escape"){
        document.getElementById("settings_popup").classList.toggle("active");
	}
});

function toggleDuplicates() {
    console.log("user wants to toggle duplicates!")
    allowDuplicates = !allowDuplicates;
    console.log(allowDuplicates)
}

// my saving-grace function that I somehow was able to figure out at 3:30 AM
function getIndexById(Id) {
    var tempLocalStorage = JSON.parse(localStorage.getItem("tasks"))
    var target;

    for (var i = 0; i < tempLocalStorage.length; i++) {
        var item = tempLocalStorage[i];
        if (item.id == Id) {
            target = i;
        }
    }
    return target;
}


// gpt-j fetch request for joke button
function testAPI() {
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
        alert(data.completions[0].data.text)
        console.log("funny acquired😎");
    });
}

//based on implementation from here https://erikmartinjordan.com/get-random-emoji-javascript , slows my editor down real bad though
// considering including in another file instead
var randomEmoji = () => {
    var emojis = [
	'😄','😃','😀','😊','☺','😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞','😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷','😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳','👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿','😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨','👂','👀','👃','👅','👄','👍','👎','👌','👊','✊','✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏','☝','👏','💪','🚶','🏃','💃','👫','👪','👬','👭','💏','💑','👯','🙆','🙅','💁','🙋','💆','💇','💅','👰','🙎','🙍','🙇','🎩','👑','👒','👟','👞','👡','👠','👢','👕','👔','👚','👗','🎽','👖','👘','👙','💼','👜','👝','👛','👓','🎀','🌂','💄','💛','💙','💜','💚','❤','💔','💗','💓','💕','💖','💞','💘','💌','💋','💍','💎','👤','👥','💬','👣','💭','🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷','🐽','🐮','🐗','🐵','🐒','🐴','🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜','🐞','🐌','🐙','🐚','🐠','🐟','🐬','🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕','🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸','🌷','🍀','🌹','🌻','🌺','🍁','🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰','🌱','🌼','🌐','🌞','🌝','🌚','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌜','🌛','🌙','🌍','🌎','🌏','🌋','🌌','🌠','⭐','☀','⛅','☁','⚡','☔','❄','⛄','🌀','🌁','🌈','🌊','🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃','👻','🎅','🎄','🎁','🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾','💻','📱','☎','📞','📟','📠','📡','📺','📻','🔊','🔉','🔈','🔇','🔔','🔕','📢','📣','⏳','⌛','⏰','⌚','🔓','🔒','🔏','🔐','🔑','🔎','💡','🔦','🔆','🔅','🔌','🔋','🔍','🛁','🛀','🚿','🚽','🔧','🔩','🔨','🚪','🚬','💣','🔫','🔪','💊','💉','💰','💴','💵','💷','💶','💳','💸','📲','📧','📥','📤','✉','📩','📨','📯','📫','📪','📬','📭','📮','📦','📝','📄','📃','📑','📊','📈','📉','📜','📋','📅','📆','📇','📁','📂','✂','📌','📎','✒','✏','📏','📐','📕','📗','📘','📙','📓','📔','📒','📚','📖','🔖','📛','🔬','🔭','📰','🎨','🎬','🎤','🎧','🎼','🎵','🎶','🎹','🎻','🎺','🎷','🎸','👾','🎮','🃏','🎴','🀄','🎲','🎯','🏈','🏀','⚽','⚾','🎾','🎱','🏉','🎳','⛳','🚵','🚴','🏁','🏇','🏆','🎿','🏂','🏊','🏄','🎣','☕','🍵','🍶','🍼','🍺','🍻','🍸','🍹','🍷','🍴','🍕','🍔','🍟','🍗','🍖','🍝','🍛','🍤','🍱','🍣','🍥','🍙','🍘','🍚','🍜','🍲','🍢','🍡','🍳','🍞','🍩','🍮','🍦','🍨','🍧','🎂','🍰','🍪','🍫','🍬','🍭','🍯','🍎','🍏','🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍','🍠','🍆','🍅','🌽','🏠','🏡','🏫','🏢','🏣','🏥','🏦','🏪','🏩','🏨','💒','⛪','🏬','🏤','🌇','🌆','🏯','🏰','⛺','🏭','🗼','🗾','🗻','🌄','🌅','🌃','🗽','🌉','🎠','🎡','⛲','🎢','🚢','⛵','🚤','🚣','⚓','🚀','✈','💺','🚁','🚂','🚊','🚉','🚞','🚆','🚄','🚅','🚈','🚇','🚝','🚋','🚃','🚎','🚌','🚍','🚙','🚘','🚗','🚕','🚖','🚛','🚚','🚨','🚓','🚔','🚒','🚑','🚐','🚲','🚡','🚟','🚠','🚜','💈','🚏','🎫','🚦','🚥','⚠','🚧','🔰','⛽','🏮','🎰','♨','🗿','🎪','🎭','📍','🚩','⬆','⬇','⬅','➡','🔠','🔡','🔤','↗','↖','↘','↙','↔','↕','🔄','◀','▶','🔼','🔽','↩','↪','ℹ','⏪','⏩','⏫','⏬','⤵','⤴','🆗','🔀','🔁','🔂','🆕','🆙','🆒','🆓','🆖','📶','🎦','🈁','🈯','🈳','🈵','🈴','🈲','🉐','🈹','🈺','🈶','🈚','🚻','🚹','🚺','🚼','🚾','🚰','🚮','🅿','♿','🚭','🈷','🈸','🈂','Ⓜ','🛂','🛄','🛅','🛃','🉑','㊙','㊗','🆑','🆘','🆔','🚫','🔞','📵','🚯','🚱','🚳','🚷','🚸','⛔','✳','❇','❎','✅','✴','💟','🆚','📳','📴','🅰','🅱','🆎','🅾','💠','➿','♻','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','🔯','🏧','💹','💲','💱','©','®','™','〽','〰','🔝','🔚','🔙','🔛','🔜','❌','⭕','❗','❓','❕','❔','🔃','🕛','🕧','🕐','🕜','🕑','🕝','🕒','🕞','🕓','🕟','🕔','🕠','🕕','🕖','🕗','🕘','🕙','🕚','🕡','🕢','🕣','🕤','🕥','🕦','✖','➕','➖','➗','♠','♥','♣','♦','💮','💯','✔','☑','🔘','🔗','➰','🔱','🔲','🔳','◼','◻','◾','◽','▪','▫','🔺','⬜','⬛','⚫','⚪','🔴','🔵','🔻','🔶','🔷','🔸','🔹'
];

  return emojis[Math.floor(Math.random() * emojis.length)];

}
