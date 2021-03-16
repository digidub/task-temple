import { appData } from "./appdata";

const DOMcontrol = (() => {

    const projectView = document.querySelector(".project-view-list")
    const taskView = document.querySelector(".task-view-list")


    const createElement = (el) => {
        return document.createElement(el)
    }

    const styleElement = (el, style) => {
        el.classList.add(`${style}`)
    }

    const textElement = (el, name) => {        
        el.innerText = `${name}`
    }

    const setupDiv = (name) => {        
        let div = createElement("div")
        let p = createElement("p")        
        styleElement(div, "project-name")
        textElement(p, name)
        div.appendChild(p)
        
        return div
    }

    const displayProjects = () => {
        appData.projects.forEach(project => {            
            let div = setupDiv(project.name)            
            projectView.appendChild(div);
        })
    }

    const displayTasks = () => {
        appData.projects.forEach(project => {
            project.tasks.forEach(task => {
                let div = setupDiv(task.name)
                taskView.appendChild(div);
            })            
        })
    }

    return {
        displayProjects,
        displayTasks
    }


})();

export { DOMcontrol }