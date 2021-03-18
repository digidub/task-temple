const appData = (() => {
    let projects = []

    const activeProject = {
        id: "",
    }

    const setActiveProject = (id) => {
        activeProject.id = id
    }

    const getActiveProject = () => activeProject.id

    return {        
        projects,
        setActiveProject,
        getActiveProject,
    }
})();

export { appData }
