import { appData } from "./appdata";
import { lsControl } from "./localstorage";
import { Project } from './projects'
import { Task } from './tasks'
import { DOMcontrol } from './domcontrol'

const appControl = (() => {

    const projectLoader = (obj) => {
        if (storageCheck(`${obj}`)) fetch(`${obj}`)
        else {
            firstUse()
        }
    }

    const firstUse = () => {
        let x = genDefault()
        restore(appData.projects, x.dP)
        restore(appData.projects[0].tasks, x.dT)
        DOMcontrol.displayProjects();
        DOMcontrol.displayTasks();
    }

    const genDefaultProject = () => {
        let defaultProject = Project("Default Project")
        return defaultProject
    }

    const genDefaultTask = () => {
        let defaultTask = Task("Create your first project (or task!)", "tasktemple lets you organise your to do list by groups - or projects. Set due date, priority, and add notes")
        return defaultTask
    }

    const genDefault = () => {
        let dP = genDefaultProject()
        let dT = genDefaultTask()
        return { dP, dT }
    }    

    const storageCheck = (obj) => {
        lsControl.storageCheck(obj)
    }

    const restore = (target, payload) => {
        pushObj(target, payload)
    }

    const pushObj = (target, payload) => {
        target.push(payload)
    }

    const fetch = (obj) => {
        lsControl.fetchStorage(obj)
    }

    const projectSaver = (obj) => {
        lsControl.saveStorage(obj)
    }

    return {
        genDefaultProject,
        genDefaultTask,
        projectLoader,
        restore,
        storageCheck,
    }

})();

export { appControl }