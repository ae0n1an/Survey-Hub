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
      window.open("login.html","_self");
    }
});