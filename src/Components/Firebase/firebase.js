import app from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAbf3yC_6pGA2hfgmnINgctdRa6mcGlabo",
    authDomain: "game-dc846.firebaseapp.com",
    projectId: "game-dc846",
    storageBucket: "game-dc846.appspot.com",
    messagingSenderId: "229147538167",
    appId: "1:229147538167:web:82b3d67b3a069701db19f2",
    measurementId: "G-DGQM64R45X"
};


// Initialize
class Firebase {

    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
    }

    // Inscription
    signupUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)

    // Connexion
    loginUser = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    // Déconnexion
    signoutUser = () => this.auth.signOut()

}

export default Firebase;