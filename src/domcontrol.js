import { appControl } from "./appcontrol";
import { appData } from "./appdata";
import { Template } from "./formtemplates";
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
            let div = setupDiv(project.name, "project-name")
            projectViewList.appendChild(div);
        })
    }

    const displayTasks = () => {
        appData.projects.forEach(project => {
            project.tasks.forEach(task => {
                let div = setupDiv(task.name, "task-name")
                taskViewList.appendChild(div);
            })
        })
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
        submit.onclick = function(e) {
            e.preventDefault()
            getInput(template)
        }
    }

    function getInput(form) { //this probably needs moving to app logic.

        let nameInput = document.querySelector(`[name="${form}-name"]`).value;
        if (nameInput == null) nameInput = "Untitled Project"

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
        displayTasks
    }


})();

export { DOMcontrol }