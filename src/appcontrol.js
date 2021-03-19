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
        pushObj(appData.projects[0].tasks, x.dT)
        setActiveProject(1)
        DOMcontrol.displayProjects();
        DOMcontrol.displayTasks(1); //need to change this fig later on when ID logic sorted!
    }

    const genDefault = () => {
        let dP = genDefaultProject()
        pushObj(appData.projects, dP)        
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
        pushObj(appData.projects, newProject)
        newProjectDisplayController(appData.projects, "project");
    }

    const createNewTask = (proj, name, notes="", due, priority) => {
        let newTask = Task(name, notes, due, priority)
        pushObj(proj, newTask)
        newProjectDisplayController(proj, "task");
    }

    const fetchNewestObject = (path) => {
        let newest = path[path.length - 1]
        return newest
    }

    const newProjectDisplayController = (target, template) => {
        let newest = fetchNewestObject(target)
        let nName = newest.getName()
        let nNotes;
        if (template == "task") nNotes = newest.getNotes()
        let nDue = newest.getDue()
        let nPriority = newest.getPriority() //need to include follow on logic for this later
        let nID = newest.getID()
        let nDiv;
        if (template == "project") {
            nDiv = DOMcontrol.placeholderGen(nName, nDue, nID, template)
            DOMcontrol.appendProject(nDiv)
        } else {
            nDiv = DOMcontrol.placeholderGen(nName, nDue, nID, template, nNotes)
            DOMcontrol.appendTask(nDiv)
        }
        
    }

    function setActiveProject(projID) {
        appData.setActiveProject(projID)
    }

    function getActiveProject() {
        return appData.getActiveProject()
    }

    function lookupProject(id) {
        let lookup = appData.projects.find(obj => obj.getID() == id)
        return lookup;
    }

    function formToObject(template) {

        let form = DOMcontrol.getFormInput(template)       

        if (!document.querySelector(`[name="${template}-notes"]`)) {
            appControl.createNewProject(form.nameInput, form.dueInput, form.priorityInput)
        } else {            
            let activeProject = lookupProject(getActiveProject())
            appControl.createNewTask(activeProject.tasks, form.nameInput, form.notesInput, form.dueInput, form.priorityInput)
        }
    }

    return {
        genDefaultProject,
        genDefaultTask,
        projectLoader,        
        storageCheck,
        createNewProject,
        newProjectDisplayController,
        createNewTask,
        formToObject,
        lookupProject,
        setActiveProject,
        getActiveProject,
    }

})();

export { appControl }