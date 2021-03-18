const Template = (() => {

    const project = {

        tag: 'div',
        classes: ['add-project-form'],
        children: [
            {
                tag: 'form',
                classes: ['project-form']
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
                classes: ['task-form']
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

    const projectPlaceholder = (projectName, projectDue, projectID) => {
        return {
        tag: "div",
        classes: ["project-placeholder"],
        id: projectID,
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

    }
}

    return {
        projectPlaceholder,
        project,
        task,
    }

})();

export { Template }