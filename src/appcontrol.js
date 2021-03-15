import { appData } from "./appdata";
import { lsControl } from "./localstorage";

const appControl = (() => {

const genDefaultProject = () => {
    let defaultProject = Project("Default Project")
}

const genDefaultTask = () => {
    let defaultTask = Task("Create your first project (or task!)", "tasktemple lets you organise your to do list by groups - or projects. Set due date, priority, and add notes")
}

const storageCheck = (obj) => {
    lsControl.storageCheck(obj)
}

const restore = (obj) => {
    appData.projects.push(obj)
}

const projectLoader = () => {
    let fetchedProjects = storageCheck('projects');
    restore(fetchedProjects)
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