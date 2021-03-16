const Template = (() => {

    const addProject = {

        tag: 'div',
        classes: ['add-project-form'],
        children: [
            {
                tag: 'form',
                children: [
                    {
                        tag: `div`,
                        children: [
                            {
                                tag: 'input',
                                type: 'text',
                                name: 'name',
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
                                name: 'due',
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
                                name: 'priority',
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
                        type: 'submit',
                        value: 'submit',
                    },
                ]
            }
        ]
    }

    const addTask = {

        tag: 'div',
        classes: ['add-task-form'],
        children: [
            {
                tag: 'form',
                children: [
                    {
                        tag: `div`,
                        children: [
                            {
                                tag: 'input',
                                type: 'text',
                                name: 'name',
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
                                name: 'notes',
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
                                name: 'due',
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
                                name: 'priority',
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
                        type: 'submit',
                        value: 'submit',
                    },
                ]
            }
        ]
    }

})();

export { Template }