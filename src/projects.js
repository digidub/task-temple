import { appData } from "./appdata";

const Project = (projectName, dueDate = null, pri = "normal") => {

    const name = projectName;
    const created = new Date();
    const due = dueDate;
    const completed = 0; //0 == uncompleted, 1 == completed
    const priority = pri
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

