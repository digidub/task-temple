const Task = (taskName, desc, dueDate = null, pri = "normal") => {

    const name = taskName;
    const notes = desc;
    const created = new Date();
    const due = dueDate;
    const completed = 0 //0 == uncompleted, 1 == completed
    const priority = pri

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

    function getDue() {
        return due;
    }

    function getPriority() {
        return priority;
    }

    function getID() {
        return id;
    }
    
    /* IN ORDER TO HAVE ID FOR TASKS - will need to have logic that passes through the overriding project that creates the task, in order to measure its length.
    Maybe this could be done by having a property in the task object with the project's name in it. 
    const id = genID()

    function genID() {
        if (appData.projects.length < 1) {
            let id = 1;
            return id;
        } else {
            let arr = appData.projects;
            let maxID = Math.max(...array.map(arr => arr.id));
            let id = maxID + 1;
            return id;
        }
    }*/

    return {
        editName,
        editNotes,
        editDue,
        editPriority,
        getName,
        getDue,
        getPriority,
        getID,
    }
}

export { Task };

