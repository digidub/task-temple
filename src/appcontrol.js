import { appData } from "./appdata";
import { lsControl } from "./localstorage";
import { Project } from './projects'
import { Task } from './tasks'
import { DOMcontrol } from './domcontrol'
import { Template } from "./template";

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

    const genDefault = () => {
        let dP = genDefaultProject()
        let dT = genDefaultTask()
        return { dP, dT }
    }

    const genDefaultProject = () => {
        let defaultProject = Project("Default Project")
        return defaultProject
    }

    const genDefaultTask = () => {
        let defaultTask = Task("Create your first project (or task!)", "tasktemple lets you organise your to do list by groups - or projects. Set due date, priority, and add notes")
        return defaultTask
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

    const createNewProject = (name, due, priority) => {
        let newProject = Project(name, due, priority)
        appData.projects.push(newProject)
        newProjectDisplayController();
    }

    const createNewTask = (name, desc, due, priority) => {
        let newTask = Task(name, due, priority)
        appData.projects.push(newProject)
    }

    const fetchNewestObject = (path) => {
        let newest = path[path.length - 1]
        return newest
    }

    const newProjectDisplayController = () => {
        let newest = fetchNewestObject(appData.projects)
        let nName = newest.getName()
        let nDue = newest.getDue()
        let nPriority = newest.getPriority() //need to include follow on logic for this later
        let nID = newest.getID()        
        let nDiv = DOMcontrol.placeholderGen(nName, nDue, nID)
        DOMcontrol.appendProject(nDiv)
    }

    return {
        genDefaultProject,
        genDefaultTask,
        projectLoader,
        restore,
        storageCheck,
        createNewProject,
        newProjectDisplayController,
    }

})();

export { appControl }