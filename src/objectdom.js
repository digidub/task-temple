const ObjectToDOM = (() => {

    const gen = obj => {

        let domEl = document.createElement(obj.tag)
        console.log(obj)
        if (obj.content) domEl.innerText = obj.content
        if (obj.classes) for (let cssClass of obj.classes) {
            domEl.classList.add(cssClass)
        }
        if (obj.id) domEl.id = obj.id
        if (obj.dataTaskId) domEl.setAttribute('data-task-id', obj.dataTaskId)
        if (obj.dataProjectId) domEl.setAttribute('data-project-id', obj.dataProjectId)
        if (obj.src) domEl.src = obj.src
        if (obj.for) domEl.htmlFor = obj.for
        if (obj.placeholder) domEl.placeholder = obj.placeholder
        if (obj.tag) domEl.tag = obj.tag
        if (obj.completed === 1) domEl.checked = "true"
        if (obj.type) domEl.type = obj.type
        if (obj.name) domEl.name = obj.name
        if (obj.value) domEl.value = obj.value
        if (obj.rows) domEl.rows = obj.rows
        if (obj.cols) domEl.cols = obj.cols
        if (obj.selected) domEl.selected = "true"
        if (obj.required) domEl.required = obj.required
        if (obj.children) for (let child of obj.children) {
            gen(child)
            domEl.append(gen(child))
        }
        return domEl
    }

    return {
        gen
    }

})();
export { ObjectToDOM }