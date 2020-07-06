firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    
    var user = firebase.auth().currentUser;

    if(user != null){
      
      var email_verified = user.emailVerified;

      if(email_verified == false){
        sendVerification();
        logout();
      }
      else {
        window.open("login.html","_self");
      }
    }
    
  } else {
    // No user is signed in.

  }
});

function createAccount(){
    
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    
    document.getElementById("checktoc").innerHTML = errorMessage;
    document.getElementById("checktoc").style.color = "red";
    
    // ...
  });
    
}

function sendVerification() {
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function() {
    // Email sent.
    document.getElementById("checktoc").innerHTML = "An email has been sent to verify your address";
    document.getElementById("checktoc").style.color = "black";
  }).catch(function(error) {
    // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;
    
    console.log("Error : " + errorMessage);
  });
}

function register(){

  let userEmail = document.getElementById("email_field").value;
  let userPass = document.getElementById("password_field").value;
  let userPassTwo = document.getElementById("password_field_two").value;

  if(document.getElementById("termsandconditions").checked == false){
    document.getElementById("checktoc").innerHTML = "Please accept terms and conditions";
    document.getElementById("checktoc").style.color = "red";
  }

  else if(userPass != userPassTwo){
    document.getElementById("checktoc").innerHTML = "Your passwords do not match";
    document.getElementById("checktoc").style.color = "red"; 
  }
  else{
    createAccount()
  }
}