firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      
      var user = firebase.auth().currentUser;
        
        if(user != null){
          
          var email_id = user.email;
          document.getElementById("user_para").innerHTML = "Welcome User : " + email_id

          let database = firebase.database();
          console.log(database)
          let ref = database.ref('surveys')
          ref.on('value', gotData, errData)
        }
  
    } else {
      // No user is signed in.
      window.open("login.html","_self");
    }
});

function gotData(data){
  console.log(data.val());
}

function errData(err){
  console.log(err);
}
function openPost(){
    window.open("postASurvey.html","_self");
}