import { appData } from "./appdata";
import { Task } from './tasks'

const Project = (projectName, dueDate = null, pri = "normal", comp = 0) => {

    let name = projectName;
    let due = dueDate;
    const tasks = [];
    let completed = comp; //0 == uncompleted, 100 == completed
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

    function getId() {
        return id;
    }

    function genID() {
        if (appData.projects.length < 1) {
            let id = 1;
            return id;
        } else {
            let arr = appData.projects;
            let maxID = Math.max(...arr.map(arr => arr.getId()));
            let id = maxID + 1;
            return id;
        }
    }

    function updateProgress() {
        let totalTasks = tasks.length
        if (totalTasks === 0) return completed = 0;
        let tasksComplete = 0
        for (let i = 0; i < totalTasks; i++) {
            if (tasks[i].getCompleted() === 1) {
                tasksComplete++
            }
        }
        let ratio = tasksComplete / totalTasks
        let progress = ratio * 100
        return completed = progress
    }

    function getProgress() {
        updateProgress()
        return completed;
    }

    function getTasks() {
        let taskList = []
        for (let i = 0; i < tasks.length; i++) {
            let taskObj = { "name": tasks[i].getName(), "notes": tasks[i].getNotes(), "due": tasks[i].getDue(), "priority": tasks[i].getPriority(), "completed": tasks[i].getCompleted(), "id": tasks[i].getId() }
            taskList.push(taskObj)
        }
        return taskList
    }

    function toString () {
        return { "name": name, "due": due, "priority": priority, "completed": completed, "tasks": getTasks() }
    }

    return {
        tasks,
        editDue,
        editName,
        editPriority,
        getName,
        getDue,
        getPriority,
        getId,
        getProgress,
        toString,
        getTasks,
    }

}

export { Project }

