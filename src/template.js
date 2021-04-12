import saveIcon from './save.svg'
import editIcon from './edit.svg'
import deleteIcon from './delete.svg'
import lowPriorityIcon from './low.svg'
import normalPriorityIcon from './normal.svg'
import highPriorityIcon from './high.svg'

console.log(lowPriorityIcon)

const Template = (() => {

    const project = {

        tag: 'div',
        classes: ['add-project-form'],
        children: [
            {
                tag: 'form',
                classes: ['project-form'],
                children: [
                    {
                        tag: `div`,
                        children: [
                            {
                                tag: 'input',
                                type: 'text',
                                name: 'project-name',
                                required: 'required',
                                placeholder: 'Project Name'
                            }
                        ]
                    },
                    {
                        tag: `div`,
                        children: [
                            {
                                tag: 'input',
                                type: 'date',
                                name: 'project-due',
                                placeholder: 'Due Date'
                            }
                        ]
                    },
                    {
                        tag: `div`,
                        children: [
                            {
                                tag: 'select',
                                name: 'project-priority',
                                children: [
                                    {
                                        tag: 'option',
                                        value: 'normal',
                                        content: 'Normal Priority',
                                        selected: 'true',
                                    },
                                    {
                                        tag: 'option',
                                        value: 'high',
                                        content: 'High Priority',
                                    },
                                    {
                                        tag: 'option',
                                        value: 'low',
                                        content: 'Low Priority',
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        tag: `input`,
                        classes: ['project-submit'],
                        type: 'submit',
                        value: 'submit',
                    },
                ]
            }
        ]
    }

    const task = {

        tag: 'div',
        classes: ['add-task-form'],
        children: [
            {
                tag: 'form',
                classes: ['task-form'],
                children: [
                    {
                        tag: 'div',
                        classes: ['task-form-column-left'],
                        children: [
                            {
                                tag: `div`,
                                children: [
                                    {
                                        tag: 'input',
                                        type: 'text',
                                        name: 'task-name',
                                        required: 'required',
                                        placeholder: 'Task Name'
                                    }
                                ]
                            },
                            {
                                tag: `div`,
                                children: [
                                    {
                                        tag: 'input',
                                        type: 'date',
                                        name: 'task-due',
                                        required: 'required',
                                        placeholder: 'Due Date'
                                    }
                                ]
                            },
                            {
                                tag: 'select',
                                name: 'task-priority',
                                children: [
                                    {
                                        tag: 'option',
                                        value: 'normal',
                                        content: 'Normal Priority',
                                        selected: 'true',
                                    },
                                    {
                                        tag: 'option',
                                        value: 'high',
                                        content: 'High Priority',
                                    },
                                    {
                                        tag: 'option',
                                        value: 'low',
                                        content: 'Low Priority',
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        tag: 'div',
                        classes: ['task-form-column-right'],
                        children: [
                            {
                                tag: `div`,
                                children: [
                                    {
                                        tag: 'textarea',
                                        name: 'task-notes',
                                        placeholder: 'Notes'
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        tag: `input`,
                        classes: ['task-submit'],
                        type: 'submit',
                        value: 'submit',
                    },
                ]
            }
        ]
    }

    const projectPlaceholder = (projectName, projectDue = "", projectPriority, projectID) => {
        return {
            tag: "div",
            classes: ["project-placeholder"],
            dataProjectId: projectID,
            children: [
                {
                    tag: "div",
                    classes: ["project-name-due"],
                    children: [
                        {
                            tag: "div",
                            classes: ["project-name"],
                            content: projectName,
                        },
                        {
                            tag: "div",
                            classes: ["project-due"],
                            content: projectDue
                        }
                    ]
                },
                {
                    tag: "div",
                    classes: ["project-priority"],
                    children: [
                        {
                            tag: "img",
                            classes: ["project-priority-icon"],
                            src: prioritySelector(projectPriority)
                        },
                    ]
                },
                {
                    tag: "div",
                    classes: ["project-edit"],
                    children: [
                        {
                            tag: "img",
                            classes: ["project-edit-icon"],
                            src: editIcon
                        },
                    ]
                },
                {
                    tag: "div",
                    classes: ["edit-delete-save"],
                    children: [
                        {
                            tag: "div",
                            classes: ["edit-delete"],
                            children: [
                                {
                                    tag: "img",
                                    classes: ["project-delete-icon"],
                                    src: deleteIcon,
                                }
                            ]
                        },
                        {
                            tag: "div",
                            classes: ["edit-save"],
                            children: [
                                {
                                    tag: "img",
                                    classes: ["project-save-icon"],
                                    src: saveIcon,
                                }
                            ]
                        }
                    ]
                },

            ]

        }
    }

    const taskPlaceholder = (taskName, taskDue = "", taskPriority, taskID, taskNotes, taskCompleted) => {
        return {
            tag: "div",
            classes: ["task-placeholder"],
            dataTaskId: taskID,
            children: [
                {
                    tag: "div",
                    classes: ["task-status"],
                    children: [
                        {
                            tag: "input",
                            classes: ["task-completed"],
                            type: "checkbox",
                            completed: taskCompleted
                        }
                    ]
                },
                {
                    tag: "div",
                    classes: ["task-name-due-notes"],
                    children: [
                        {
                            tag: "div",
                            classes: ["task-name-due"],
                            children: [
                                {
                                    tag: "div",
                                    classes: ["task-name"],
                                    content: taskName,
                                },
                                {
                                    tag: "div",
                                    classes: ["task-due"],
                                    content: taskDue,
                                }
                            ]
                        },
                        {
                            tag: "div",
                            classes: ["task-notes"],
                            content: taskNotes
                        }
                    ]
                },
                {
                    tag: "div",
                    classes: ["task-priority"],
                    children: [
                        {
                            tag: "img",
                            classes: ["task-priority-icon"],
                            src: prioritySelector(taskPriority)
                        }
                    ]
                },
                {
                    tag: "div",
                    classes: ["task-edit"],
                    children: [
                        {
                            tag: "img",
                            classes: ["task-edit-icon"],
                            src: editIcon
                        }
                    ]
                },
                {
                    tag: "div",
                    classes: ["edit-delete-save"],
                    children: [
                        {
                            tag: "div",
                            classes: ["edit-delete"],
                            children: [
                                {
                                    tag: "img",
                                    classes: ["task-delete-icon"],
                                    src: deleteIcon,
                                }
                            ]
                        },
                        {
                            tag: "div",
                            classes: ["edit-save"],
                            children: [
                                {
                                    tag: "img",
                                    classes: ["task-save-icon"],
                                    src: saveIcon,
                                }
                            ]
                        }
                    ]
                },
            ]
        }
    }

    function prioritySelector(priority) {
        console.log(priority)
        if (priority === "normal") return normalPriorityIcon
        else if (priority === "high") return highPriorityIcon
        else return lowPriorityIcon
    }

    return {
        projectPlaceholder,
        taskPlaceholder,
        project,
        task,
    }

})();

export { Template }