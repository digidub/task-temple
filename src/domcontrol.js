import { appData } from "./appdata";
import { Template } from "./formtemplates";
import { ObjectToDOM } from "./objectdom";

const DOMcontrol = (() => {

    const projectView = document.querySelector(".project-view-list")
    const taskView = document.querySelector(".task-view-list")
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
            projectView.appendChild(div);
        })
    }

    const displayTasks = () => {
        appData.projects.forEach(project => {
            project.tasks.forEach(task => {
                let div = setupDiv(task.name, "task-name")
                taskView.appendChild(div);
            })
        })
    } 

    function genForm(template) {
        let form = ObjectToDOM.gen(Template[`${template}`]);
        projectView.prepend(form); //perhaps revisit this and have it placed in a DIV ABOVE the list of projects..
    }       

    newProject.addEventListener('click', () => {
        if (!document.querySelector(".add-project-form")) {
            genForm("addProject")
        }
        else projectView.removeChild(document.querySelector(".add-project-form"))
    })    

    return {
        newProject,
        displayProjects,
        displayTasks
    }


})();

export { DOMcontrol }