import { appData } from "./appdata";
import { lsControl } from "./localstorage";
import { Project } from './projects'
import { Task } from './tasks'
import { DOMcontrol } from './domcontrol'
import { Template } from "./template";

const appControl = (() => {

    function projectLoader(obj) {
        if (storageCheck(obj)) {
            let restored = fetch(obj);
            restoreSavedObjects(restored)
        }
        else {
            firstUse();
        }
    }

    const firstUse = () => {
        let x = genDefault()
        pushObj(appData.projects[0].tasks, x.dT)
        setActiveProject(1)
        DOMcontrol.displayAllProjects();
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
        if (lsControl.storageCheck(obj)) return true
        else return false
    }

    const pushObj = (target, payload) => {
        target.push(payload)
    }

    const fetch = (obj) => {
        let fetchedObj = lsControl.fetchStorage(obj)
        return fetchedObj
    }

    const projectSaver = (name, obj) => {
        lsControl.saveStorage(name, obj)
    }

    const restoreSavedObjects = (obj) => {
        let savedActiveProject = fetch('activeproject')
        for (let i = 0; i < obj.length; i++) {
            let x = Project(obj[i].name, obj[i].due, obj[i].priority, obj[i].completed)
            pushObj(appData.projects, x)
            setActiveProject(i + 1)
            for (let j = 0; j < obj[i].tasks.length; j++) {
                let y = Task(obj[i].tasks[j].name, obj[i].tasks[j].notes, obj[i].tasks[j].due, obj[i].tasks[j].priority, obj[i].tasks[j].completed)
                pushObj(appData.projects[i].tasks, y)
            }
            DOMcontrol.displayProject(lookupProject(getActiveProject()))
            projectProgressBar(lookupProject(getActiveProject()))
        }
        if (appData.projects.length > 0) DOMcontrol.displayTasks(savedActiveProject)
    }

    const createNewProject = (name, due, priority, completed) => {
        return Project(name, due, priority, completed)
    }

    const createNewTask = (name, notes = "", due, priority, completed) => {
        return Task(name, notes, due, priority, completed)
    }

    const newObjectDisplayController = (target, template) => {
        let newest = fetchNewestObject(target)
        let nName = newest.getName()
        let nNotes;
        if (template == "task") nNotes = newest.getNotes()
        let nDue = newest.getDue()
        let nPriority = newest.getPriority()
        let nID = newest.getId()
        let nDiv;
        if (template == "project") {
            nDiv = DOMcontrol.placeholderGen(template, nName, nDue, nPriority, nID)
            DOMcontrol.appendProject(nDiv)
        } else {
            nDiv = DOMcontrol.placeholderGen(template, nName, nDue, nPriority, nID, nNotes)
            DOMcontrol.appendTask(nDiv)
            return nID
        }
    }

    const fetchNewestObject = (path) => {
        let newest = path[path.length - 1]
        return newest
    }

    function setActiveProject(projID) {
        appData.setActiveProject(projID)
        projectSaver('activeproject', getActiveProject())
    }

    //returns ID of active project
    function getActiveProject() {
        return appData.getActiveProject()
    }

    function switchIDByIndex(index) {
        if (appData.projects.length === 0) return 0;
        if (appData.projects.length === 1) return appData.projects[0].getId();
        if (appData.projects[index] == appData.projects[0]) {
            return appData.projects[1].getId();
        }
        else return appData.projects[index - 1].getId();
    }

    //returns actual object
    function lookupProject(id) {
        let lookup = appData.projects.find(obj => obj.getId() == id)
        return lookup;
    }

    function lookupProjectIndex(id) {
        let idInt = parseInt(id, 10)
        let lookupIndex = appData.projects.findIndex(obj => obj.getId() === idInt)
        return lookupIndex
    }

    function lookupTask(activeProject, id) {
        let lookup = activeProject.tasks.find(obj => obj.getId() == id)
        return lookup
    }

    function lookupTaskIndex(activeProject, id) {
        let idInt = parseInt(id, 10)
        let lookupIndex = activeProject.tasks.findIndex(obj => obj.getId() === idInt)
        return lookupIndex
    }

    function addObjectController(template) {
        let form = collectForm(template)
        let newObj;
        if (!document.querySelector(`[name="${template}-notes"]`)) { //if there are no notes, implying project rather than task
            newObj = createNewProject(form.nameInput, form.dueInput, form.priorityInput)
            pushObj(appData.projects, newObj)
            newObjectDisplayController(appData.projects, "project");
        } else {
            let activeProject = lookupProject(getActiveProject())
            newObj = createNewTask(form.nameInput, form.notesInput, form.dueInput, form.priorityInput)
            pushObj(activeProject.tasks, newObj)
            newObjectDisplayController(activeProject.tasks, "task");
            projectProgressBar(activeProject)
        }
        projectSaver('projects', projectsToString())
    }

    function collectForm(template) {
        let form = DOMcontrol.getFormInput(template)
        return form

    }

    function projectsToString() {
        let stringedProjects = []
        for (let i = 0; i < appData.projects.length; i++) {
            let string = appData.projects[i].toString()
            stringedProjects.push(string)
        }
        return stringedProjects
    }

    function deleteController(objectType, objectPlaceholder, activeProject, objectID) {

        if (objectType === "project") {
            let indexToDelete = lookupProjectIndex(objectID)
            switchActiveProject(indexToDelete)
            DOMcontrol.displayTasks(getActiveProject())
            appData.projects.splice(indexToDelete, 1)
        }
        else {
            let indexToDelete = lookupTaskIndex(activeProject, objectID)
            activeProject.tasks.splice(indexToDelete, 1)
        }
        objectPlaceholder.remove()
        projectSaver('projects', projectsToString())
    }

    function switchActiveProject(index) {
        let newID = switchIDByIndex(index)
        if (newID === 0) return;
        setActiveProject(newID)
    }

    function completedController(id) {
        let activeProject = lookupProject(getActiveProject())
        let activeTask = lookupTask(activeProject, id)
        activeTask.toggleCompleted()
        projectProgressBar(activeProject)
        projectSaver('projects', projectsToString())
    }

    function projectProgressBar(activeProject) {
        let x = activeProject.getProgress()
        DOMcontrol.progressPaint(getActiveProject(), x)
    }

    return {
        genDefaultProject,
        genDefaultTask,
        projectLoader,
        projectSaver,
        storageCheck,
        newObjectDisplayController,
        lookupProject,
        setActiveProject,
        getActiveProject,
        lookupProjectIndex,
        lookupTask,
        lookupTaskIndex,
        deleteController,
        completedController,
        projectProgressBar,
        addObjectController,
        projectsToString,
    }

})();

export { appControl }