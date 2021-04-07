const appData = (() => {
    let projects = []
    let userId;

    const activeProject = {
        id: "",
    }

    const setActiveProject = (id) => {
        activeProject.id = id
    }

    const getActiveProject = () => activeProject.id

    return {
        projects,
        userId,
        setActiveProject,
        getActiveProject,
    }
})();

export { appData }
