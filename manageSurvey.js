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
    ref.on('value', gotData, errData)
};


function gotData(data){
    var surveys = data.val();
    let keys = Object.keys(surveys);
    
    for (let i = 0; i < keys.length; i++){ //add foreach => function 
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
        let homeDiv = document.getElementById("user_div");
        let div = document.createElement('div');
        div.id = 'survey_edit_div';
        div.className = 'survey_edit-div';
        div.innerHTML = `<table><tr><th>Link:</th><td>${link}</td></tr><tr><th>Title:</th><td>${title}</td></tr><tr><th>Length:</th><td>${length} minutes</td></tr><tr><th>Description:</th><td>${description}</td></tr></table><br><p id="edit">Edit <img src="pencil.png"></p><p id="delete">Delete <img src="bin.png"></p>`
        homeDiv.appendChild(div);
    }
    else {
      
    }
}