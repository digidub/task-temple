import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firebase-database"
import { appControl } from "./appcontrol";
import { appData } from "./appdata";
import { DOMcontrol } from "./domcontrol";

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

    let firebaseui = require('firebaseui');
    //let ui = new firebaseui.auth.AuthUI(firebase.auth());
    let database = firebase.database();

    let provider = new firebase.auth.GoogleAuthProvider();
    const auth = firebase.auth()

    auth.onAuthStateChanged(user => {
        if (user) {
            Fb.auth
            DOMcontrol.logout.classList.remove("hide")
            DOMcontrol.login.classList.add("hide")
            appData.userId = firebase.auth().currentUser.uid;
            getUserData(user.uid)
        } else {
            appData.userId = undefined;
            console.log(`not logged in`)
            DOMcontrol.logout.classList.add("hide")
            DOMcontrol.login.classList.remove("hide")
            appControl.localStorageLoader('projects')
        }
    })

    function getUserData(userId) {
        firebase.database().ref().child("users").child(userId).child("projects").get().then(function (snapshot) {
            if (snapshot.exists()) {
                appControl.restoreSavedObjects(snapshot.val().projects, "1")
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