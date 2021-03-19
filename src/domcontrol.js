import { appControl } from "./appcontrol";
import { appData } from "./appdata";
import { Template } from "./template";
import { ObjectToDOM } from "./objectdom";

const DOMcontrol = (() => {

    const projectView = document.querySelector(".project-view")
    const taskView = document.querySelector(".task-view")
    const projectViewList = document.querySelector(".project-view-list")
    const taskViewList = document.querySelector(".task-view-list")
    const newProject = document.querySelector(".add-project")
    const newTask = document.querySelector(".add-task")    

    const displayProjects = () => {
        appData.projects.forEach(project => {
            let projectDiv = placeholderGen(project.getName(), project.getDue(), project.getID(), "project")
            projectViewList.appendChild(projectDiv);
        })
    }

    function placeholderGen(name, due, ID, template, notes) {
        let placeholderTemplate = Template[`${template}Placeholder`](name, due, ID, notes)        
        let placeholder = ObjectToDOM.gen(placeholderTemplate)
        return placeholder;
    }

    function appendProject(placeholder) {
        projectViewList.appendChild(placeholder)
    }    

    function appendProject(placeholder) {
        projectViewList.appendChild(placeholder)
    }

    function appendTask(placeholder) {
        taskViewList.appendChild(placeholder)
    }

    const displayTasks = (projectID) => {           
        taskViewList.innerHTML = "";
        if (lookupProject(projectID).tasks.length < 1) taskViewList.innerText = "No tasks! Add your first :)"        
        lookupProject(projectID).tasks.forEach(task => {
            let taskDiv = placeholderGen(task.getName(), task.getDue(), task.getID(), "task", task.getNotes())
            taskViewList.appendChild(taskDiv)
        })
    }

    projectViewList.onclick = function (e) {
        if (e.target.className == "project-name") {
            let projID = e.target.parentNode.id
            displayTasks(projID)
            setActiveProject(projID)
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

    newProject.onclick = function () {
        if (!document.querySelector(".add-project-form")) {
            generateForm("project", projectView)
        }
        else projectView.removeChild(document.querySelector(".add-project-form"))
    }

    newTask.onclick = function () {
        if (!document.querySelector(".add-task-form")) {
            generateForm("task", taskView)
        }
        else taskView.removeChild(document.querySelector(".add-task-form"))
    }

    function generateForm(template, parent) {
        let form = ObjectToDOM.gen(Template[`${template}`]);
        parent.insertBefore(form, parent.firstElementChild.nextSibling); //perhaps revisit this and have it placed in a DIV ABOVE the list of projects..
        formSubmitQuerySelector(template)
    }

    function formSubmitQuerySelector(template) {
        let submit = document.querySelector(`.${template}-submit`)
        submit.onclick = function (e) {
            e.preventDefault()
            getInput(template)
            document.querySelector(`.${template}-form`).reset();
        }
    }    

    function getInput(form) { //this probably needs moving to app logic.

        let nameInput = document.querySelector(`[name="${form}-name"]`).value;
        if (nameInput == "") nameInput = "Untitled Project"

        let notesInput;
        if (document.querySelector(`[name="${form}-notes"]`)) {
            notesInput = document.querySelector(`[name="${form}-notes"]`).value
        }

        let dueInput;
        if (document.querySelector(`[name="${form}-due"]`).value) {
            dueInput = document.querySelector(`[name="${form}-due"]`).value
        }
        else {
            dueInput = null
        }

        let priorityInput = document.querySelector(`[name="${form}-priority"]`).value;

        if (!document.querySelector(`[name="${form}-notes"]`)) {
            appControl.createNewProject(nameInput, dueInput, priorityInput)
        } else {            
            let activeProject = lookupProject(getActiveProject())
            appControl.createNewTask(activeProject.tasks, nameInput, notesInput, dueInput, priorityInput)
        }

    }

    return {
        displayProjects,
        displayTasks,
        appendProject,
        appendTask,
        placeholderGen,        
        lookupProject,
        getActiveProject,
    }


})();

export { DOMcontrol }