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
            let projectDiv = placeholderGen("project", project.getName(), project.getDue(), project.getPriority(), project.getID())
            projectViewList.appendChild(projectDiv);
        })
    }

    const displayTasks = (projectID) => {
        taskViewList.innerHTML = "";
        if (appControl.lookupProject(projectID).tasks.length < 1) taskViewList.innerText = "No tasks! Add your first :)"
        appControl.lookupProject(projectID).tasks.forEach(task => {
            let taskDiv = placeholderGen("task", task.getName(), task.getDue(), task.getPriority(), task.getID(), task.getNotes())
            taskViewList.appendChild(taskDiv)
        })
    }

    function checkObjectType(e) {
        if (e.target.classList.includes("project")) return "project"
        else return "task"
    }

    function editProject(e) {
        let objectType = checkObjectType(e)
        let editName = e.target.parentNode.parentNode.querySelector(".project-name")
        let editDueDiv = e.target.parentNode.parentNode.querySelector(".project-due")
        let editPlaceholder = e.target.parentNode.parentNode
        editPlaceholder.classList.toggle("project-placeholder-edit")
        let editDue = editDueDiv.innerText
        let projectID = e.target.parentNode.parentNode.id
        let editProject = appControl.lookupProject(projectID)
        editDueDiv.innerHTML = `<input type="date" name="project-due" id="edit-date"> <button id="clear-date">X</button>`
        let editDueForm = e.target.parentNode.parentNode.querySelector("#edit-date")
        let clearDateDiv = e.target.parentNode.parentNode.querySelector("#clear-date")
        editDueForm.value = editDue
        editName.setAttribute('contenteditable', 'true');
        editName.focus();
        clearDateDiv.onclick = function () {
            editDueForm.value = ""
        }

        let priorityButton = e.target.parentNode.parentNode.querySelector(".project-priority-icon")
        priorityButton.addEventListener('click', priorityController)

        function priorityController() {
            let priorityButton = e.target.parentNode.parentNode.querySelector(".project-priority-icon")
            let newPriority = editPriority(priorityButton.src)
            priorityButton.src = `${newPriority}.svg`
            editProject.editPriority(newPriority)
        }

        let deleteButton = e.target.parentNode.parentNode.querySelector(".project-delete-icon")
        deleteButton.addEventListener('click', deleteController)

        function deleteController() {
            let indexToDelete = appControl.lookupProjectIndex(projectID)
            appData.projects.splice(indexToDelete, 1)
            editPlaceholder.remove()
        }

        let saveButton = e.target.parentNode.parentNode.querySelector(".project-save-icon")
        saveButton.onclick = function () {
            saveChanges(editProject, editName.innerText, editDueForm.value, editName, editDueDiv, editPlaceholder)
            priorityButton.removeEventListener('click', priorityController)
        }

    }

    function saveChanges(project, editedName, editedDueDate, editName, editDueDiv, editPlaceholder) {
        if (editedDueDate.length > 0) editDueDiv.innerText = editedDueDate
        else editDueDiv.innerText = "";
        editName.setAttribute('contenteditable', 'false');
        project.editName(editedName)
        project.editDue(editedDueDate)
        editPlaceholder.classList.toggle("project-placeholder-edit")
    }

    function editPriority(priority) {
        if (priority.includes("normal")) return "high"
        else if (priority.includes("high")) return "low"
        else if (priority.includes("low")) return "normal"
    }

    function placeholderGen(template, name, due, priority, ID, notes) {
        let placeholderTemplate = Template[`${template}Placeholder`](name, due, priority, ID, notes)
        let placeholder = ObjectToDOM.gen(placeholderTemplate)
        return placeholder;
    }

    function appendProject(placeholder) {
        projectViewList.appendChild(placeholder)
    }

    function appendTask(placeholder) {
        taskViewList.appendChild(placeholder)
    }

    projectViewList.onclick = function (e) {
        if (e.target.className == "project-name") {
            let projID = e.target.parentNode.parentNode.id
            displayTasks(projID)
            appControl.setActiveProject(projID)
        }
        else if (e.target.className == "project-edit-icon") {
            editProject(e)
        }
    }

    taskViewList.onclick = function (e) {
        if (e.target.className == "task-notes" || e.target.className == "task-notes-expanded") {
            let toExpand = e.target
            if (toExpand.classList.contains("task-notes-expanded")) {
                toExpand.classList.remove("task-notes-expanded")
                toExpand.classList.add("task-notes")
            }
            else {
                toExpand.classList.remove("task-notes")
                toExpand.classList.add("task-notes-expanded")
            }
        }
        else if (e.target.className === "task-edit-icon") {
            console.log(e)
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
        parent.insertBefore(form, parent.firstElementChild.nextSibling);
        formSubmitQuerySelector(template)
    }

    function formSubmitQuerySelector(template) {
        let submit = document.querySelector(`.${template}-submit`)
        submit.onclick = function (e) {
            e.preventDefault()
            appControl.formToObject(template)
            document.querySelector(`.${template}-form`).reset();
        }
    }

    function getFormInput(template) {

        let nameInput = document.querySelector(`[name="${template}-name"]`).value;
        if (nameInput == "") nameInput = "Untitled Project"

        let notesInput;
        if (document.querySelector(`[name="${template}-notes"]`)) {
            notesInput = document.querySelector(`[name="${template}-notes"]`).value
        }

        let dueInput;
        if (document.querySelector(`[name="${template}-due"]`).value) {
            dueInput = document.querySelector(`[name="${template}-due"]`).value
        }
        else {
            dueInput = null
        }

        let priorityInput = document.querySelector(`[name="${template}-priority"]`).value;

        return { nameInput, notesInput, dueInput, priorityInput }

    }

    return {
        displayProjects,
        displayTasks,
        appendProject,
        appendTask,
        placeholderGen,
        getFormInput,
    }


})();

export { DOMcontrol }