//Local Storage array to hold note values
let notesLS = [];
//Unique note ID
let counter = 0;

function addNote() {

    //Get user inputs
    let taskInput = document.getElementById("taskInput").value;
    //Fix task input to show line breaks (if added)
    taskInput = taskInput.replace(/\n\r?/g, '<br/>');
    let dateInput = document.getElementById("dateInput").value;
    //Fix date to match user input format (yyyy-mm-dd to mm-dd-yyyy)
    dateInput = fixDateDisplay(dateInput);
    const timeInput = document.getElementById("timeInput").value;

    //Add note and place inputs in position
    noteContent(taskInput, dateInput, timeInput);

    //Add Fade-In class to the latest note 
    const addedNote = document.getElementsByClassName("note");
    setTimeout(function () {
        addedNote[addedNote.length - 1].className += " visible";
    }, 0);

    //Add to local storage
    if (typeof (Storage) !== "undefined") {
        const taskObj = { 'task': taskInput, 'date': dateInput, 'time': timeInput };
        if (localStorage.getItem('notes') !== null) {
            notesLS = JSON.parse(localStorage.getItem('notes'));
        }
        notesLS.push(taskObj);
        JSONnotesLS = JSON.stringify(notesLS);
        localStorage.setItem('notes', JSONnotesLS);
    } else {
        // Sorry! No Web Storage support..
    }

    //reset form and prevent submition
    const form = document.getElementById("form");
    form.reset();
    event.preventDefault();
};

form.addEventListener("submit", addNote);

//Get local storage on pageload
function getLocalStorage() {
    if (localStorage.getItem("notes") !== null) {
        LSarray = localStorage.getItem("notes");
        LSarray = JSON.parse(LSarray);
        for (let i = 0; i < LSarray.length; i++) {
            if (document.getElementById(i) == null) {
                const LStask = LSarray[i].task;
                const LSdate = LSarray[i].date;
                const LStime = LSarray[i].time;
                noteContent(LStask, LSdate, LStime);
                const addedNoteFromLS = document.getElementsByClassName("note");
                addedNoteFromLS[addedNoteFromLS.length - 1].className += (" visible");
            } else {
                break;
            }
        }
    }
};


//Add note and user inputs
function noteContent(task, date, time) {
    document.getElementById("noteDisplay").innerHTML +=
        `<div id=${counter} class="col-md-3 note border border-secondary">
            <span class="X" onclick="removeNote(this)">
                <i class="far fa-window-close fa-lg"></i>
            </span>
            <span class="taskLocation">${task}</span>
            <span class="dateLocation">${date}</span>
            <span class="timeLocation">${time}</span>
            </div>`
    counter++;
};


//Remove from page and local storage
function removeNote(currentNote) {
    //Remove from page
    const noteID = currentNote.parentNode.id;
    document.getElementById(noteID).remove();
    counter--;

    //Rearrange note ID (so it matches to local storage array note index)
    const changeId = document.getElementsByClassName("note");
    for (let i = noteID; i < changeId.length; i++) {
        changeId[i].id--;
    }

    //Remove note from local storage and re - set it without removed note
    LSarray = localStorage.getItem("notes");
    LSarray = JSON.parse(LSarray);
    LSarray.splice(noteID, 1);
    JSONnewLS = JSON.stringify(LSarray);
    localStorage.setItem("notes", JSONnewLS);
};


//YYYY-MM-DD to MM-DD-YYYY (as user inputs)
function fixDateDisplay(date) {
    const year = date.slice(0, 4);
    const month = date.slice(5, 7);
    const day = date.slice(8, 10);
    fixedDateInput = [month, day, year].join('-');
    return fixedDateInput;
};




