const lsControl = (() => {

    const storageCheck = (obj) => {
        if (!localStorage.getItem(`${obj}`)) {

        }
        else {

        }
    }

    const populateStorage = (obj) => {
        localStorage.setItem(`${obj}`, JSON.stringify(obj))
    }

    const fetchStorage = (obj) => {
        let storageJSON = localStorage.getItem(`${obj}`)
        let JSONtoObj = JSON.parse(storageJSON)
        
    }
/*    
    function storageCheck() {
	if (!localStorage.getItem('library')) { //if local storage does not exist
		populateStorage(); //save initial storage
	} else { //otherwise...
		retrieveStorage();
		displayLibrary();
	}
}

//save to storage 
function populateStorage() {
	localStorage.setItem('library', JSON.stringify(library));
}

//retreive from local storage
function retrieveStorage() {
	let retrievedStorage = localStorage.getItem('library'); //parse stored JSON to variable
	let bookObj = JSON.parse(retrievedStorage)
	for (let i = 0; i < bookObj.length; i++) {
		addBookToLibrary(bookObj[i].title, bookObj[i].author, bookObj[i].pages, bookObj[i].read, bookObj[i].comments)
	}
}
*/


})();

export { lsControl };