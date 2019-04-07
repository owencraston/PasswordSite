import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDuK3yBJJRWrrRJ_sTkMqDYZoTfbxGE6DI",
    authDomain: "password-generator-e4e47.firebaseapp.com",
    databaseURL: "https://password-generator-e4e47.firebaseio.com",
    projectId: "password-generator-e4e47",
    storageBucket: "password-generator-e4e47.appspot.com",
    messagingSenderId: "723298110874"
};

firebase.initializeApp(config);

const db = firebase.database();
