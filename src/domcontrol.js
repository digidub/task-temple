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
                if ([...elements][i].isContentEditable) element.setAttribute('contenteditable', 'false')
                else[...elements][i].setAttribute('contenteditable', 'true')
            }
        }
    }

    function checkWhetherEditNotes(e) {
        if (e.target.parentNode.parentNode.querySelector(`.task-notes`) || e.target.parentNode.parentNode.querySelector(`.task-notes-expanded`)) {
            let editNotes = e.target.parentNode.parentNode.querySelector(`.task-notes`) || e.target.parentNode.parentNode.querySelector(`.task-notes-expanded`)
            if (e.target.parentNode.parentNode.querySelector(`.task-notes`)) {
                editNotes.classList.toggle("task-notes-expanded")
                editNotes.classList.toggle("task-notes")
            }
            return editNotes
        }
    }

    function editDOMFinders(e, objectType) {
        let placeholder = e.target.parentNode.parentNode
        let name = e.target.parentNode.parentNode.querySelector(`.${objectType}-name`)
        let notes = checkWhetherEditNotes(e)
        let dueDiv = e.target.parentNode.parentNode.querySelector(`.${objectType}-due`)
        let priorityButton = e.target.parentNode.parentNode.querySelector(`.${objectType}-priority-icon`)
        let id = e.target.parentNode.parentNode.id
        let deleteButton = e.target.parentNode.parentNode.querySelector(`.${objectType}-delete-icon`)
        let saveButton = e.target.parentNode.parentNode.querySelector(`.${objectType}-save-icon`)
        return { placeholder, name, notes, dueDiv, priorityButton, deleteButton, saveButton, id }
    }


    function editProject(e) {
        //check whether project or task
        let objectType = checkObjectType(e)

        //dom identifiers
        let editing = editDOMFinders(e, objectType)
        let editDue = editing.dueDiv.innerText
        editing.dueDiv.innerHTML = `<input type="date" name="${objectType}-due" id="edit-date"> <button id="clear-date">X</button>`
        let editDueForm = e.target.parentNode.parentNode.querySelector("#edit-date")
        let clearDateDiv = e.target.parentNode.parentNode.querySelector("#clear-date")

        editDueForm.value = editDue

        editing.placeholder.classList.toggle(`${objectType}-placeholder-edit`)


        toggleEditable([editing.name, editing.notes])

        //locate actual object being edited
        let actualObjectBeingEdited = activeEditingObject(objectType, editing.id)

        //find active project for notes
        let activeProject = appControl.lookupProject(appControl.getActiveProject())

        clearDateDiv.onclick = function () {
            editDueForm.value = ""
        }

        editing.priorityButton.addEventListener('click', () => {
            priorityController(editing.priorityButton, actualObjectBeingEdited)
        })

        editing.deleteButton.addEventListener('click', () => {
            appControl.deleteController(objectType, editing.placeholder, activeProject, editing.id)
        })

        editing.saveButton.onclick = function () {
            saveChanges(objectType, actualObjectBeingEdited, editing.name.innerText, editDueForm.value, editing.name, editing.dueDiv, editing.placeholder, editing.notes)
            editing.priorityButton.removeEventListener('click', priorityController)
        }

    }

    function saveChanges(objectType, objectBeingEdited, editedName, editedDueDate, editName, editDueDiv, editPlaceholder, editNotes) {
        if (editedDueDate.length > 0) editDueDiv.innerText = editedDueDate
        else editDueDiv.innerText = "";
        editName.setAttribute('contenteditable', 'false');
        if (editNotes) editNotes.setAttribute('contenteditable', 'false');
        objectBeingEdited.editName(editedName)
        objectBeingEdited.editDue(editedDueDate)
        editPlaceholder.classList.toggle(`${objectType}-placeholder-edit`)
    }

    function priorityController(priorityButton, actualObjectBeingEdited) {
        let newPriority = editPriority(priorityButton.src)
        priorityButton.src = `${newPriority}.svg`
        actualObjectBeingEdited.editPriority(newPriority)
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
        if (e.target.className === "project-name" || e.target.className === "project-edit-icon") {
            let projID = e.target.parentNode.parentNode.id
            displayTasks(projID)
            appControl.setActiveProject(projID)
            if (e.target.className == "project-edit-icon") {
                editProject(e)
            }
        }
    }

    taskViewList.onclick = function (e) {
        if ((e.target.className == "task-notes" || e.target.className == "task-notes-expanded") && (!e.target.parentNode.parentNode.classList.contains("task-placeholder-edit"))) {
            let toExpand = e.target
            toExpand.classList.toggle("task-notes-expanded")
            toExpand.classList.toggle("task-notes")
        }
        else if (e.target.className === "task-edit-icon") {
            editProject(e)
        }
        else if (e.target.className === "task-completed") {
            let taskID = e.target.parentNode.parentNode.id
            //let tickbox = e.target
            appControl.completedController(taskID)
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