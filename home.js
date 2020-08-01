firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      
      var user = firebase.auth().currentUser;
        
        if(user != null){
          
          var email_id = user.email;
          document.getElementById("user_para").innerHTML = "Welcome User : " + email_id

          let database = firebase.database();
          let ref = database.ref('surveys')
          ref.on('value', gotData, errData)
        }
  
    } else {
      // No user is signed in.
      window.open("login.html","_self");
    }
});

function gotData(data){
  var surveys = data.val();
  let keys = Object.keys(surveys);
  for (let i = 0; i < keys.length; i++){
    let k = keys[i];
    let email = surveys[k].email;
    let title = surveys[k].title;
    let description = surveys[k].description;
    let length = surveys[k].length;
    let link = surveys[k].link;
    displayData(email, title, description, length, link);
  }
}

function errData(err){
  console.log(err);
}

function displayData(email, title, description, length, link){
  let email_id = firebase.auth().currentUser.email;
  if (email == email_id){
    
  }
  else {
    let homeDiv = document.getElementById("user_div");
    let a = document.createElement('a');
    a.id = 'survey_display_div';
    a.className = 'survey_display-div';
    a.href = link;
    a.innerHTML = '<p><u>' + title + '</u></p><br><p><img src="clock.jpg"> ' + length + ' minutes </p><p><img src="credits.png"> ' + length*10 + '</p><br><p>' + description + '</p>';
    homeDiv.appendChild(a);
  }
}

function openPost(){
  window.open("postASurvey.html","_self");
}