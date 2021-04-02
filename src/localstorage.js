import { appControl } from "./appcontrol";

const lsControl = (() => {

    const storageCheck = (obj) => {
        if (!localStorage.getItem(obj)) {
            return false;
        }
        else {
            return true;
        }
    }

    const saveStorage = (name, obj) => {
        localStorage.setItem(name, JSON.stringify(obj))
    }

    const fetchStorage = (obj) => {
        let storageJSON = localStorage.getItem(`${obj}`)
        let JSONtoObj = JSON.parse(storageJSON)
        return JSONtoObj;
    }

    return {
        storageCheck,
        saveStorage,
        fetchStorage
    }


})();

export { lsControl };