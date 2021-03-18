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

    const createElement = (el) => {
        return document.createElement(el)
    }

    const classElement = (el, style) => {
        el.classList.add(`${style}`)
    }

    const idElement = (el, id) => {
        el.id = id
    }

    const textElement = (el, name) => {
        el.innerText = `${name}`
    }

    const setupDiv = (name, style) => {
        let div = createElement("div")
        let p = createElement("p")
        classElement(div, style)
        textElement(p, name)
        div.appendChild(p)
        return div
    }

    const displayProjects = () => {
        appData.projects.forEach(project => {
            let projectDiv = projectPlaceholderGen(project.getName(), project.getDue(), project.getID())            
            projectViewList.appendChild(projectDiv);
        })
    }

    function projectPlaceholderGen(name, due, ID) {
        let placeholderTemplate = Template.projectPlaceholder(name, due, ID)
        let placeholder = ObjectToDOM.gen(placeholderTemplate)
        return placeholder;
    }

    function appendProject(placeholder) {        
        projectViewList.appendChild(placeholder)
    }

    function taskPlaceholderGen(name, notes, due, id) {
        let placeholderTemplate = Template.taskPlaceholder(name, notes, due, id)
        let placeholder = ObjectToDOM.gen(placeholderTemplate)
        return placeholder;
    }

    function appendProject(placeholder) {        
        projectViewList.appendChild(placeholder)
    }

    const displayTasks = (projectID) => {
        let lookup = appData.projects.find(obj => obj.getID() == projectID) //applogic        
        taskViewList.innerHTML = "";
        if (lookup.tasks.length < 1) taskViewList.innerText = "No tasks! Add your first :)"
        
        lookup.tasks.forEach(task => {
            let taskDiv = taskPlaceholderGen(task.getName(), task.getNotes(), task.getDue(), 1)
            taskViewList.appendChild(taskDiv)
        })       
    }

    projectViewList.onclick = function(e) {
        if (e.target.className == "project-name") {
            let projID = e.target.parentNode.id
            displayTasks(projID)
        }
        
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
            //appControl.createNewTask(nameInput, dueInput, priorityInput)
        }

    }

    return {
        displayProjects,
        displayTasks,
        appendProject,
        projectPlaceholderGen,
        taskPlaceholderGen,
    }


})();

export { DOMcontrol }