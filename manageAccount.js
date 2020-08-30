firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      
      var user = firebase.auth().currentUser;
        
        if(user != null) {

        }
  
    } else {
      // No user is signed in.
      window.open("login.html","_self");
    }
});

window.onload = function() {
    let database = firebase.database();
    let ref = database.ref('surveys')
    update();
    ref.on('value', gotData, errData)
};


function gotData(data){
    console.log("yes");
};