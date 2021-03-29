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
                                tag: 'label',
                                for: 'priority',
                                content: 'priority',
                            },
                            {
                                tag: 'select',
                                name: 'project-priority',
                                children: [
                                    {
                                        tag: 'option',
                                        value: 'High',
                                        content: 'High',
                                    },
                                    {
                                        tag: 'option',
                                        value: 'Normal',
                                        selected: 'true',
                                        content: 'Normal',
                                    },
                                    {
                                        tag: 'option',
                                        value: 'Low',
                                        content: 'Low',
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
                                type: 'text',
                                name: 'task-notes',
                                placeholder: 'Notes'
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
                        tag: `div`,
                        children: [
                            {
                                tag: 'label',
                                for: 'priority',
                                content: 'priority',
                            },
                            {
                                tag: 'select',
                                name: 'task-priority',
                                children: [
                                    {
                                        tag: 'option',
                                        value: 'High',
                                        content: 'High',
                                    },
                                    {
                                        tag: 'option',
                                        value: 'Normal',
                                        selected: 'true',
                                        content: 'Normal',
                                    },
                                    {
                                        tag: 'option',
                                        value: 'Low',
                                        content: 'Low',
                                    },
                                ]
                            }
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
            id: projectID,
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
                            src: `${projectPriority.toLowerCase()}.svg`
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
                            src: "edit.svg"
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
                                    classes: ["delete-icon"],
                                    src: "delete.svg",
                                }
                            ]
                        },
                        {
                            tag: "div",
                            classes: ["edit-save"],
                            children: [
                                {
                                    tag: "img",
                                    classes: ["save-icon"],
                                    src: "save.svg",
                                }
                            ]
                        }
                    ]
                },

            ]

        }
    }

    const taskPlaceholder = (taskName, taskDue = "", taskPriority, taskID, taskNotes) => {
        return {
            tag: "div",
            classes: ["task-placeholder"],
            id: taskID,
            children: [
                {
                    tag: "div",
                    classes: ["task-status"],
                    children: [
                        {
                            tag: "input",
                            type: "checkbox",
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
                            src: `${taskPriority.toLowerCase()}.svg`
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
                            src: "edit.svg"
                        }
                    ]
                },
            ]
        }
    }

    const ProjectEdit = {
        tag: "div",
        classes: ["edit-delete-save"],
        children: [
            {
                tag: "div",
                classes: ["edit-delete"],
                children: [
                    {
                        tag: "img",
                        classes: ["delete-icon"],
                        src: "delete.svg",
                    }
                ]
            },
            {
                tag: "div",
                classes: ["edit-save"],
                children: [
                    {
                        tag: "img",
                        classes: ["save-icon"],
                        src: "save.svg",
                    }
                ]
            }
        ]
    }

    return {
        projectPlaceholder,
        taskPlaceholder,
        project,
        task,
        ProjectEdit,
    }

})();

export { Template }