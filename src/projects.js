import { appData } from "./appdata";

const Project = (projectName, dueDate = null, pri = "normal") => {

    let name = projectName;
    const created = new Date();
    let due = dueDate;
    let completed = 0; //0 == uncompleted, 100 == completed
    let priority = pri
    const tasks = [];
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
    }

    function progress() {
        let totalTasks = tasks.length
        let tasksComplete = 0
        for (let i = 0; i < totalTasks; i++) {
            if (tasks[i].completed === 1) {
                tasksComplete++
            }            
        }
        let ratio = tasksComplete / totalTasks
        complete = ratio * 100
        return complete
    }


    return {
        name,
        created,
        due,
        completed,
        priority,
        tasks,
        id,
    }

}

export { Project }

