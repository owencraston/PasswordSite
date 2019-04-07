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

function writeAttemptData(userId, totalLogins, successfulLogins, failedLogins, averageSuccessTime, averageLoginTime) {
    db.ref('attempts/' + userId).set({
      user_id: userId,
      total_logins: totalLogins,
      successful_kogins : successfulLogins,
      failed_logins: failedLogins,
      average_success_time: averageSuccessTime,
      average_login_time: averageLoginTime
    });
  }
