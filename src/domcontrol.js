import { appControl } from "./appcontrol";
import { appData } from "./appdata";
import { Template } from "./template";
import { ObjectToDOM } from "./objectdom";
import hideIcon from './hide.svg'
import addIcon from './add.svg'

const DOMcontrol = (() => {

    const projectView = document.querySelector(".project-view")
    const taskView = document.querySelector(".task-view")
    const projectViewList = document.querySelector(".project-view-list")
    const taskViewList = document.querySelector(".task-view-list")
    const newProject = document.querySelector(".add-project")
    const newTask = document.querySelector(".add-task")
    const newProjectIcon = newProject.querySelector("img")
    const newTaskIcon = newTask.querySelector("img")
    const login = document.querySelector(".login")
    const aboutBtn = document.querySelector(".nav-about");
    const logout = document.querySelector(".logout")
    const modal = document.querySelector(".modal")
    newProjectIcon.src = addIcon
    newTaskIcon.src = addIcon


    aboutBtn.onclick = function () {
        modal.style.display = "block";
        modal.addEventListener("click", () => {
            modal.style.display = "none"
        })
    }

    function clearLists() {
        projectViewList.textContent = ""
        taskViewList.textContent = ""
    }

    logout.onclick = function () {
        appControl.fbLogout()
    }

    login.onclick = function () {
        appControl.fbLogin()

    }

    function noProjectsWarning() {
        taskViewList.innerText = "Please add a project before adding individual tasks"
    }

    function NoTasksWarning() {
        taskViewList.innerText = "No tasks! Add your first :)"
    }

    function clearNoTasksWarning() {
        taskViewList.innerText = ""
    }


    const displayAllProjects = () => {
        appData.projects.forEach(project => {
            displayProject(project)
        })
    }

    function displayProject(project) {
        let projectDiv = placeholderGen("project", project.getName(), project.getDue(), project.getPriority(), project.getId())
        projectViewList.appendChild(projectDiv);
    }

    const displayTasks = (projectID) => {
        taskViewList.innerHTML = "";
        if (appControl.lookupProject(projectID).tasks.length < 1) NoTasksWarning()
        appControl.lookupProject(projectID).tasks.forEach(task => {
            let taskDiv = placeholderGen("task", task.getName(), task.getDue(), task.getPriority(), task.getId(), task.getNotes(), task.getCompleted())
            taskViewList.appendChild(taskDiv)
            if (task.getCompleted() === 1) strikeThroughCompleted(task.getId())
        })
    }

    function checkObjectType(e) {
        if (e.target.classList.contains("project-edit-icon")) return "project"
        else return "task"
    }

    //finds the actual object that is being edited so that its methods can be used to edit the object properties 
    function activeEditingObject(type, editingID) {
        if (type === "project") return appControl.lookupProject(editingID)
        else {
            let activeProject = appControl.lookupProject(appControl.getActiveProject())
            return appControl.lookupTask(activeProject, editingID)
        }
    }

    function toggleEditable([...elements]) {
        for (let i = 0; i < [...elements].length; i++) {
            if ([...elements][i] !== undefined) {
                if ([...elements][i].isContentEditable) [...elements][i].setAttribute('contenteditable', 'false')
                else[...elements][i].setAttribute('contenteditable', 'true')
            }
        }
    }

    function checkWhetherEditNotes(e) {
        if (e.target.parentNode.parentNode.querySelector(`.task-notes`) || e.target.parentNode.parentNode.querySelector(`.task-notes-expanded`)) {
            let editNotesDiv = e.target.parentNode.parentNode.querySelector(`.task-notes`) || e.target.parentNode.parentNode.querySelector(`.task-notes-expanded`)
            if (e.target.parentNode.parentNode.querySelector(`.task-notes`)) {
                editNotesDiv.classList.toggle("task-notes-expanded")
                editNotesDiv.classList.toggle("task-notes")
            }
            return editNotesDiv
        }
    }

    function editDOMFinders(e, objectType) {
        let placeholder = e.target.parentNode.parentNode
        let name = e.target.parentNode.parentNode.querySelector(`.${objectType}-name`)
        let notesDiv = checkWhetherEditNotes(e)
        let dueDiv = e.target.parentNode.parentNode.querySelector(`.${objectType}-due`)
        let priorityButton = e.target.parentNode.parentNode.querySelector(`.${objectType}-priority-icon`)
        let id = e.target.parentNode.parentNode.getAttribute(`data-${objectType}-id`)
        let deleteButton = e.target.parentNode.parentNode.querySelector(`.${objectType}-delete-icon`)
        let saveButton = e.target.parentNode.parentNode.querySelector(`.${objectType}-save-icon`)
        return { placeholder, name, notesDiv, dueDiv, priorityButton, deleteButton, saveButton, id }
    }


    function editProject(e) {
        //check whether project or task
        let objectType = checkObjectType(e)
        //dom identifiers
        let editing = editDOMFinders(e, objectType)
        let existingEditDueValue = editing.dueDiv.innerText
        editing.dueDiv.innerHTML = `<input type="date" name="${objectType}-due" id="edit-date"> <button id="clear-date">X</button>`
        let editDueForm = e.target.parentNode.parentNode.querySelector("#edit-date")
        let clearDateDiv = e.target.parentNode.parentNode.querySelector("#clear-date")
        editDueForm.value = existingEditDueValue
        if (editing.notesDiv.classList.contains("strikethrough")) editing.notesDiv.classList.remove("strikethrough")
        editing.placeholder.classList.toggle(`${objectType}-placeholder-edit`)
        toggleEditable([editing.name, editing.notesDiv])
        //locate actual object being edited
        let actualObjectBeingEdited = activeEditingObject(objectType, editing.id)
        //find active project for notes
        let activeProject = appControl.lookupProject(appControl.getActiveProject())
        clearDateDiv.onclick = function () {
            editDueForm.value = ""
        }
        editing.priorityButton.addEventListener('click', () => {
            appControl.priorityController(editing.priorityButton, actualObjectBeingEdited)
        })
        editing.deleteButton.addEventListener('click', () => {
            appControl.deleteController(objectType, editing.placeholder, activeProject, editing.id)
        })
        editing.saveButton.onclick = function () {
            editing.dueDiv.innerText = editDueForm.value
            toggleEditable([editing.name, editing.notesDiv])
            if (editing.notesDiv && editing.name.classList.contains("strikethrough")) {
                editing.notesDiv.classList.remove("task-notes-expanded")
                editing.notesDiv.classList.add("task-notes")
                editing.notesDiv.classList.add("strikethrough")
            }
            if (editing.notesDiv && editing.notesDiv.innerText == "") {
                editing.notesDiv.classList.remove("task-notes-expanded")
                editing.notesDiv.classList.add("task-notes")
            }
            editing.placeholder.classList.toggle(`${objectType}-placeholder-edit`)
            if (editing.notesDiv) appControl.saveChanges(actualObjectBeingEdited, editing.name.innerText, editDueForm.value, editing.notesDiv.innerText)
            else appControl.saveChanges(actualObjectBeingEdited, editing.name.innerText, editDueForm.value)
            editing.priorityButton.removeEventListener('click', appControl.priorityController)
        }
    }

    function placeholderGen(template, name, due, priority, ID, notes, completed) {
        let placeholderTemplate = Template[`${template}Placeholder`](name, due, priority, ID, notes, completed)
        let placeholder = ObjectToDOM.gen(placeholderTemplate)
        return placeholder;
    }

    function appendProject(placeholder) {
        projectViewList.appendChild(placeholder)
    }

    function appendTask(placeholder) {
        taskViewList.appendChild(placeholder)
    }

    function setActive(placeholder) {
        placeholder.classList.toggle("project-placeholder-active")
        placeholder.classList.toggle("project-placeholder")
    }

    function removeActive() {
        let removeActive = projectViewList.querySelector(".project-placeholder-active")
        removeActive.classList.toggle("project-placeholder-active")
        removeActive.classList.toggle("project-placeholder")
    }

    projectViewList.onclick = function (e) {
        if (e.target.className === "project-name" || e.target.classList.contains("project-edit-icon") || e.target.className === "project-due") {
            let placeholder = e.target.parentNode.parentNode
            let projID = placeholder.getAttribute(`data-project-id`)
            displayTasks(projID)
            if (projectViewList.querySelector(".project-placeholder-active")) removeActive()
            setActive(placeholder)
            appControl.switchActiveProject(projID)
            if (e.target.classList.contains("project-edit-icon")) {
                editProject(e)
            }
        }
    }

    function strikeThroughCompleted(id) {
        let taskPlaceholder = taskViewList.querySelector(`[data-task-id="${id}"]`)
        let taskName = taskPlaceholder.querySelector(".task-name")
        taskName.classList.toggle("strikethrough")
        if (taskPlaceholder.querySelector(".task-due")) {
            let taskDue = taskPlaceholder.querySelector(".task-due")
            taskDue.classList.toggle("strikethrough")
        }
        if (taskPlaceholder.querySelector(".task-notes")) {
            let taskNotes = taskPlaceholder.querySelector(".task-notes")
            taskNotes.classList.toggle("strikethrough")
        }
        if (taskPlaceholder.querySelector(".task-notes-expanded")) {
            let taskNotes = taskPlaceholder.querySelector(".task-notes-expanded")
            taskNotes.classList.toggle("strikethrough")
        }
    }

    function hoverIcons(target, template) {
        let placeholder = target
        let editIcon = placeholder.querySelector(`.${template}-edit-icon`)
        let priorityIcon = placeholder.querySelector(`.${template}-priority-icon`)
        editIcon.classList.add(`icon-hover`);
        priorityIcon.classList.add(`icon-hover`);
    }

    function rmHoverIcons(target, template) {
        let placeholder = target
        let editIcon = placeholder.querySelector(`.${template}-edit-icon`)
        let priorityIcon = placeholder.querySelector(`.${template}-priority-icon`)
        editIcon.classList.remove(`icon-hover`);
        priorityIcon.classList.remove(`icon-hover`);
    }

    projectViewList.onmouseover = function (e) {
        if (e.target.classList.contains("project-placeholder") || e.target.classList.contains("project-placeholder-active") || e.target.classList.contains("project-placeholder-active")) hoverIcons(e.target, "project")
        if (e.target.parentNode.classList.contains("project-placeholder") || e.target.parentNode.classList.contains("project-placeholder-active") || e.target.parentNode.classList.contains("project-placeholder-active")) hoverIcons(e.target.parentNode, "project")
        if (e.target.parentNode.parentNode.classList.contains("project-placeholder") || e.target.parentNode.parentNode.classList.contains("project-placeholder-active")) hoverIcons(e.target.parentNode.parentNode, "project")
    }

    projectViewList.onmouseout = function (e) {
        if (e.target.classList.contains("project-placeholder") || e.target.classList.contains("project-placeholder-active")) rmHoverIcons(e.target, "project")
        if (e.target.parentNode.classList.contains("project-placeholder") || e.target.parentNode.classList.contains("project-placeholder-active")) rmHoverIcons(e.target.parentNode, "project")
        if (e.target.parentNode.parentNode.classList.contains("project-placeholder") || e.target.parentNode.parentNode.classList.contains("project-placeholder-active")) rmHoverIcons(e.target.parentNode.parentNode, "project")
    }

    taskViewList.onmouseover = function (e) {
        if (e.target.className === "task-placeholder") hoverIcons(e.target, "task")
        if (e.target.parentNode.className === "task-placeholder") hoverIcons(e.target.parentNode, "task")
        if (e.target.parentNode.parentNode.className === "task-placeholder") hoverIcons(e.target.parentNode.parentNode, "task")
    }

    taskViewList.onmouseout = function (e) {
        if (e.target.className === "task-placeholder") rmHoverIcons(e.target, "task")
        if (e.target.parentNode.className === "task-placeholder") rmHoverIcons(e.target.parentNode, "task")
        if (e.target.parentNode.parentNode.className === "task-placeholder") rmHoverIcons(e.target.parentNode.parentNode, "task")
    }

    taskViewList.onclick = function (e) {
        if ((e.target.className === "task-notes" || e.target.className === "task-notes-expanded") && (!e.target.parentNode.parentNode.classList.contains("task-placeholder-edit"))) {
            let toExpand = e.target
            toExpand.classList.toggle("task-notes-expanded")
            toExpand.classList.toggle("task-notes")
        }
        else if (e.target.classList.contains("task-edit-icon")) {
            editProject(e)
        }
        else if (e.target.className === "task-completed") {
            let taskID = e.target.parentNode.parentNode.getAttribute(`data-task-id`)
            appControl.completedController(taskID)
        }
    }

    newProject.onclick = function () {
        if (!document.querySelector(".add-project-form")) {
            newProjectIcon.src = hideIcon
            generateForm("project", projectView)
        }
        else {
            projectView.removeChild(document.querySelector(".add-project-form"))
            newProjectIcon.src = addIcon
        }
    }

    newTask.onclick = function () {
        if (!document.querySelector(".add-task-form")) {
            newTaskIcon.src = hideIcon
            if (appControl.checkForProjects() > 0) generateForm("task", taskView)
            else noProjectsWarning()
        }
        else {
            taskView.removeChild(document.querySelector(".add-task-form"))
            newTaskIcon.src = addIcon
        }
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
            appControl.addObjectController(template)
            document.querySelector(`.${template}-form`).reset();
        }
    }

    function getFormInput(template) {
        let nameInput = document.querySelector(`[name="${template}-name"]`).value;
        if (nameInput == "" && template === "project") nameInput = "Untitled Project"
        else if (nameInput == "" && template === "task") nameInput = "Untitled Task"
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

    function progressPaint(id, progress) {
        let projectPlaceholder = projectViewList.querySelector(`[data-project-id="${id}"]`)
        projectPlaceholder.style.background = `linear-gradient(135deg, rgba(232, 235, 241) ${progress}%, rgba(238,238,238,0) ${progress}%)`;
    }

    return {
        login,
        logout,
        clearLists,
        noProjectsWarning,
        clearNoTasksWarning,
        displayAllProjects,
        displayProject,
        displayTasks,
        appendProject,
        appendTask,
        placeholderGen,
        getFormInput,
        progressPaint,
        setActive,
        strikeThroughCompleted,
    }


})();

export { DOMcontrol }