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


function displayData(email, title, description, length, link){
  console.log(email, title, description, length, link);
}

function openPost(){
  window.open("postASurvey.html","_self");
}