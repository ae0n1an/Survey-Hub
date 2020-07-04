firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    
    var user = firebase.auth().currentUser;
    
    if(user != null){
      
      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id
    }
    
  } else {
    // No user is signed in.

  }
});

function login(){
    
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    
    window.alert("Error : " + errorMessage);
    
    // ...
  });
    
}

function logout(){
  firebase.auth().signOut();
}

function register(){
  let userEmail = document.getElementById("email_field").value;
  let userPass = document.getElementById("password_field_one").value;
  let userPassTwo = document.getElementById("password_field_two").value;
  if(document.getElementById("termsandconditions").checked == false){
    document.getElementById("checktoc").innerHTML = "please accept terms and conditions";
    document.getElementById("checktoc").style.display = "block";
    document.getElementById("checktoc").style.color = "red";
  }
  else if(userEmail == "" || userPass == ""){
    document.getElementById("checktoc").innerHTML = "please enter a valid email and password";
    document.getElementById("checktoc").style.display = "block";
    document.getElementById("checktoc").style.color = "red";
  }
  else if(userPass != userPassTwo){
    document.getElementById("checktoc").innerHTML = "your passwords do not match";
    document.getElementById("checktoc").style.display = "block";
    document.getElementById("checktoc").style.color = "red"; 
  }
  else{
    document.getElementById("checktoc").innerHTML = "an email has been sent to verify your address";
    document.getElementById("checktoc").style.display = "block";
    document.getElementById("checktoc").style.color = "black";

    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
  }
}