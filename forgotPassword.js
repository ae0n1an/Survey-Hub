// Sends a forgot your password email to the entered email and displays error if the email is invalid
function sendEmail(){
    var auth = firebase.auth();
    var emailAddress = document.getElementById("email_field").value;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        document.getElementById("EmailError").style.color = "black";
        document.getElementById("EmailError").innerHTML = `Email sent`;
    }).catch(function(error) {
        // An error happened.
        document.getElementById("EmailError").style.color = "red";
        document.getElementById("EmailError").innerHTML = `Invalid Email`;
    });
}

// Checks if the user is in the input field and presses enter triggering the button press
document.getElementById("email_field").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("send").click();
    }
});