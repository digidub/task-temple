import './style.css';
import { Project } from './projects'
import { Task } from './tasks'
import { lsControl } from './localstorage'
import { appControl } from './appcontrol'
import { DOMcontrol } from './domcontrol'
import { appData } from './appdata';
import favicon from './favicon.ico'
import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firebase-database"

const Fb = (() => {

    const firebaseConfig = {
        apiKey: "AIzaSyAsW_HADjTvTHAJ3i6dy0F2CpKC_MWETzs",
        authDomain: "tasktemple.firebaseapp.com",
        projectId: "tasktemple",
        storageBucket: "tasktemple.appspot.com",
        messagingSenderId: "525787043138",
        appId: "1:525787043138:web:52a4cd74410f00652c24db",
        measurementId: "G-V53NB69QCF",
        databaseURL: " https://tasktemple-default-rtdb.europe-west1.firebasedatabase.app",
    };

    firebase.initializeApp(firebaseConfig);

    let provider = new firebase.auth.GoogleAuthProvider();
    const auth = firebase.auth()

    auth.onAuthStateChanged(user => {
        if (user) {
            auth
            DOMcontrol.clearLists()
            DOMcontrol.logout.classList.remove("hide")
            DOMcontrol.login.classList.add("hide")
            appData.userId = firebase.auth().currentUser.uid;
            appData.projects = []
            localStorage.clear()
            getUserData(user.uid)
        } else {
            appData.userId = undefined;
            console.log(`not logged in`)
            DOMcontrol.logout.classList.add("hide")
            DOMcontrol.login.classList.remove("hide")
            DOMcontrol.clearLists()
            appData.projects = []
            appControl.lsLoadActiveProject()
            appControl.localStorageLoader('projects')
        }
    })

    function getUserData(userId) {
        firebase.database().ref().child("users").child(userId).get().then(function (snapshot) {
            if (snapshot.exists()) {
                let active = snapshot.val().active.active
                appControl.setActiveProject(active)
                appControl.restoreSavedObjects(snapshot.val().projects.projects)
            }
            else {
                console.log("No data available");
            }
        });
    }

    const dbRefObject = firebase.database().ref().child('projects')

    function saveProjects(id, projectObject) {
        firebase.database().ref('users/' + id + '/projects').set({
            projects: projectObject,
        });
    }

    function saveActive(id, activeProject) {
        firebase.database().ref('users/' + id + '/active').set({
            active: activeProject
        });
    }

    return {
        saveProjects,
        saveActive,
        auth,
        provider,
    }

})();

export { Fb }
