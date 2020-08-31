//This javascipt file if for function that are used by all html pages

// The firbase key used by all html pages on the app
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

// Signs the user out of their account
function logout(){
  firebase.auth().signOut();
}

// Established the global variable balance
var balance = 0;

// Checks if data is changed in the users node and calls a function if so
function update() {
  let database = firebase.database();
  database.ref('users').on('value', updateBalance, errData)
};

// Checks the users current balance and sets it to the balance variable and displays this to the user
function updateBalance(data){
  let users = data.val();
  let user = firebase.auth().currentUser.uid;
  balance = users[user].balance;
  document.getElementById("balance").innerHTML = "balance: " + balance.toFixed(2);
}

// Checks for data errors and logs them to the console
function errData(err){
  console.log(err);
}