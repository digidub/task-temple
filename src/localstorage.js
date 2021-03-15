const lsControl = (() => {

    const storageCheck = (obj) => {
        if (!localStorage.getItem(`${obj}`)) {
            saveStorage(obj)
        }
        else {
            fetchStorage(obj)

        }
    }

    const saveStorage = (obj) => {
        localStorage.setItem(`${obj}`, JSON.stringify(obj))
    }

    const fetchStorage = (obj) => {
        let storageJSON = localStorage.getItem(`${obj}`)
        let JSONtoObj = JSON.parse(storageJSON)
        
    }

return {
    storageCheck,
    saveStorage,
    fetchStorage
}


})();

export { lsControl };