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
    document.getElementById("surveys").innerHTML=``
    let surveys = data.val();
    let keys = Object.keys(surveys);
    
    for (let i = 0; i < keys.length; i++){ //add foreach => function 
      let k = keys[i];
      let email = surveys[k].email;
      let title = surveys[k].title;
      let description = surveys[k].description;
      let length = surveys[k].length;
      let link = surveys[k].link;
      displayData(k, email, title, description, length, link);
    }

    let deleteButtons = document.querySelectorAll("#d");
    let editButtons = document.querySelectorAll("#e");

    deleteButtons.forEach(function(userItem) {
        userItem.parentElement.addEventListener("click", function(){
            let key = userItem.parentElement.parentElement.id;
            deleteItem(key);
        });
    });

    editButtons.forEach(function(userItem) {
        userItem.parentElement.addEventListener("click", function(){
            let key = userItem.parentElement.parentElement.id;
            editItem(key, surveys);
        });
    });
}

function deleteItem(key) {
    let modal = document.getElementById("delete");

    modal.style.display = "block";

    document.getElementById("deleteClose").addEventListener("click", function(){
        modal.style.display = "none";
    });

    document.getElementById("no").addEventListener("click", function(){
        modal.style.display = "none";
    });

    document.getElementById("yes").addEventListener("click", function(){
        modal.style.display = "none";
        let userRef = firebase.database().ref('surveys/' + key);
        userRef.remove()
    });
}

function editItem(key, surveys) {
    let modal = document.getElementById("edit");
    let span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    document.getElementById('googleform_field').value = ''
    document.getElementById('title_field').value = ''
    document.getElementById('description_field').value = ''
    document.getElementById('length_field').value = ''

    document.getElementById("editClose").addEventListener("click", function(){
        modal.style.display = "none";
    });

    document.getElementById("update").addEventListener("click", function(){

        let link = document.getElementById("googleform_field").value;
        let title = document.getElementById("title_field").value;
        let description = document.getElementById("description_field").value;
        let length = document.getElementById("length_field").value;

        if(link == "") {
            link = surveys[key].link;
        } 
        if(title == "") {
            title = surveys[key].title;
        } 
        if(description == "") {
            description = surveys[key].description;
        } 
        if(length == "") {
            length = surveys[key].length;
        } 
        if(Number.isNaN(length) || length <= 0 || length > 60) {
            document.getElementById("addError").style.color = "red";
            document.getElementById("addError").innerHTML = `Please add a valid survey length`;
        } else {
            writeUserData(key, link, title, description, length)
            modal.style.display = "none";
        }
    });

    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
}

function writeUserData(key, link, title, description, length) {
    let email_id = firebase.auth().currentUser.email;
    firebase.database().ref('surveys/' + key).set({
      email: email_id,
      link: link,
      title: title,
      description: description,
      length: length
    });
}
  
function errData(err){
    console.log(err);
}
  
function displayData(k, email, title, description, length, link){
    let email_id = firebase.auth().currentUser.email;
    if (email == email_id){
        let homeDiv = document.getElementById("surveys");
        let div = document.createElement('div');
        div.id = k;
        div.className = 'survey_edit-div';
        div.innerHTML = `<table><tr><th>Link:</th><td>${link}</td></tr><tr><th>Title:</th><td>${title}</td></tr><tr><th>Length:</th><td>${length} minutes</td></tr><tr><th>Description:</th><td>${description}</td></tr></table><br><p>Edit <img id="e" src="pencil.png"></p><p>Delete <img id="d" src="bin.png"></p>`
        homeDiv.appendChild(div);
    }
    else {
      
    }
}