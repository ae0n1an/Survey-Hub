// Signs the user out if they are not logged in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      
      var user = firebase.auth().currentUser;
        
        if(user != null){
          
        }
  
    } else {
      // No user is signed in.
      window.open("login.html","_self");
    }
});

// Show the user their balance in the top right
window.onload = function() {
  update();
};