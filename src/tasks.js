import { appData } from "./appdata";
import { appControl } from "./appcontrol";

const Task = (taskName, desc, dueDate = null, pri = "normal", completed = 0) => {

    let name = taskName;
    const notes = desc;
    const created = new Date();
    let due = dueDate;
    let completedController //0 == uncompleted, 1 == completed
    let priority = pri
    const id = genID();

    function editName(newName) {
        return name = newName
    }

    function editNotes(newNotes) {
        return notes = newNotes
    }

    function editDue(newDue) {
        return due = newDue
    }

    function editPriority(newPri) {
        return priority = newPri
    }

    function getName() {
        return name;
    }

    function getNotes() {
        return notes
    }

    function getDue() {
        return due;
    }

    function getPriority() {
        return priority;
    }

    function getId() {
        return id;
    }

    function getCompleted() {
        return completed;
    }

    function toggleCompleted() {
        if (completed === 0) {
            completed = 1
        }
        else {
            completed = 0
        }
    }

    function genID() {
        if (appData.projects.length == 1) { //if there is only one project
            if (appData.projects[0].tasks.length < 1) { //and there is one task
                let id = 1 //give it an ID of 1
                return id;
            }
            else {
                let arr = appData.projects[0].tasks;
                let maxID = Math.max(...arr.map(arr => arr.getId()));
                let id = maxID + 1;
                return id;
            }
        }
        else if (appControl.lookupProject(appControl.getActiveProject()).tasks.length < 1) {
            let id = 1;
            return id;
        } else {
            let arr = appControl.lookupProject(appControl.getActiveProject()).tasks;
            let maxID = Math.max(...arr.map(arr => arr.getId()));
            let id = maxID + 1;
            return id;
        }
    }

    const toString = function () {
        return { "name": name, "notes": notes, "due": due, "priority": priority, "completed": completed, "id": id }
    }

    return {
        editName,
        editNotes,
        editDue,
        editPriority,
        getName,
        getNotes,
        getDue,
        getPriority,
        getCompleted,
        getId,
        toggleCompleted,
        toString,
    }
}

export { Task };

