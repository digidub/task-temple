import { appData } from "./appdata";

const Project = (projectName, dueDate = null, pri = "normal") => {

    let name = projectName;
    const created = new Date();
    let due = dueDate;
    const tasks = [];
    let completed = 0; //0 == uncompleted, 100 == completed
    let priority = pri    
    const id = genID()

    function editName(newName) {
        return name = newName
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
    

    function genID() {
        if (appData.projects.length < 1) {
            let id = 1;
            return id;
        } else {
            let arr = appData.projects;
            let maxID = Math.max(...arr.map(arr => arr.id));
            let id = maxID + 1;
            return id;
        }
    }

    function updateProgress() {           
        let totalTasks = tasks.length
        if (totalTasks > 1) return completed = 0;
        let tasksComplete = 0
        for (let i = 0; i < totalTasks; i++) {
            if (tasks[i].completed === 1) {
                tasksComplete++
            }            
        }
        let ratio = tasksComplete / totalTasks
        let progress = ratio * 100
        return completed = progress
    }


    return {
        editDue,
        editName,
        editPriority,
        getName,
        getDue,
        getPriority,
        getID,
        updateProgress,        
    }

}

export { Project }

