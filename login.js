// Checks user is signed in and if their email is verified if their email isnt verified then it wont let them log in
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    
    var user = firebase.auth().currentUser;
    var email_verified = user.emailVerified;

    if(email_verified == true){

      window.open("home.html","_self");
      
      if(user != null){
        
        var email_id = user.email;
        document.getElementById("user_para").innerHTML = `Welcome User : ${email_id}`
      }

    } else {
      logout();
      document.getElementById("loginError").innerHTML = `Please verify your email address`
    }

  } else {
    // No user is signed in.
    
  }
});

// Attempts to login the user using the data entered into the input fields
function login(){
    
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    
    document.getElementById("loginError").innerHTML = `Please enter a valid email and password`
    
    // ...
  });
}

// Check if the user is in the last input field and if they press enter it will trigger the button to attempt login
document.getElementById("password_field").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("login").click();
  }
});