var app_fireBase = {};
(function(){
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAZG4i1Ih8N0vz0-Tz_WjrobIIx_cqpZ18",
    authDomain: "survey-hub-fbeda.firebaseapp.com",
    databaseURL: "https://survey-hub-fbeda.firebaseio.com",
    projectId: "survey-hub-fbeda",
    storageBucket: "survey-hub-fbeda.appspot.com",
    messagingSenderId: "392902327878",
    appId: "1:392902327878:web:dd262f13953f11f91e1447",
    measurementId: "G-FQ985DERC3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  app_fireBase = firebase;
})()

function logout(){
  firebase.auth().signOut();
}