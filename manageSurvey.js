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
    let ref = database.ref('surveys');
    update();
    ref.on('value', gotData, errData);
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
    let boostButtons = document.querySelectorAll("#b");

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

    boostButtons.forEach(function(userItem) {
        userItem.parentElement.addEventListener("click", function(){
            let key = userItem.parentElement.parentElement.id;
            boostItem(key, surveys);
        });
    });
}

function boostItem(key, surveys) {
    let boost = surveys[key].boost;
    document.getElementById('notEnoughFunds').innerText = ''
    let modal = document.getElementById("boost");

    modal.style.display = "block";

    document.getElementById("boostClose").addEventListener("click", function(){
        modal.style.display = "none";
    });

    document.getElementById("cancel").addEventListener("click", function(){
        modal.style.display = "none";
    });

    document.getElementById("oneHundred").addEventListener("click", function(){
        if (balance < 100) {
            document.getElementById("addError").style.color = "red";
            document.getElementById("notEnoughFunds").innerHTML = `Not enough credits`;
        } else {
            let id = firebase.auth().currentUser.uid;
            firebase.database().ref('users/' + id).set({
                balance: balance - 100,
            });
            boost = boost + 100;
            writeUserData(key, surveys[key].link, surveys[key].title, surveys[key].description, surveys[key].length, boost)
            modal.style.display = "none";
        }
    });

    document.getElementById("fiveHundred").addEventListener("click", function(){
        if (balance < 500) {
            document.getElementById("addError").style.color = "red";
            document.getElementById("notEnoughFunds").innerHTML = `Not enough credits`;
        } else {
            let id = firebase.auth().currentUser.uid;
            firebase.database().ref('users/' + id).set({
                balance: balance - 500,
            });
            boost = boost + 500;
            writeUserData(key, surveys[key].link, surveys[key].title, surveys[key].description, surveys[key].length, boost)
            modal.style.display = "none";
        }
    });

    document.getElementById("twoThousand").addEventListener("click", function(){
        if (balance < 2000) {
            document.getElementById("addError").style.color = "red";
            document.getElementById("notEnoughFunds").innerHTML = `Not enough credits`;
        } else {
            let id = firebase.auth().currentUser.uid;
            firebase.database().ref('users/' + id).set({
                balance: balance - 2000,
            });
            boost = boost + 2000;
            writeUserData(key, surveys[key].link, surveys[key].title, surveys[key].description, surveys[key].length, boost)
            modal.style.display = "none";
        }
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
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

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function editItem(key, surveys) {
    let modal = document.getElementById("edit");

    modal.style.display = "block";

    document.getElementById('addError').innerText = ''
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
        let boost = surveys[key].boost;

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
        if(link.startsWith("https://docs.google.com/forms/d/e/") == false || link.endsWith("/viewform?usp=sf_link") == false) {
            document.getElementById("addError").style.color = "red";
            document.getElementById("addError").innerHTML = `Please add a valid google forms link e.g. https://docs.google.com/forms/d/e/xxx/viewform?usp=sf_link Shortened links not accepted`;
        } else if(Number.isNaN(length) || length <= 0 || length > 60) {
            document.getElementById("addError").style.color = "red";
            document.getElementById("addError").innerHTML = `Please add a valid survey length`;
        } else {
            writeUserData(key, link, title, description, length, boost)
            modal.style.display = "none";
        }
    });

    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
}

function writeUserData(key, link, title, description, length, boost) {
    let email_id = firebase.auth().currentUser.email;
    firebase.database().ref('surveys/' + key).set({
      boost: boost,
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
        div.innerHTML = `<table><tr><th>Link:</th><td>${link}</td></tr><tr><th>Title:</th><td>${title}</td></tr><tr><th>Length:</th><td>${length} minutes</td></tr><tr><th>Description:</th><td>${description}</td></tr></table><br><p>Edit <img id="e" src="pencil.png"></p><p>Delete <img id="d" src="bin.png"></p><p>Boost <img id="b" src="boost.png"></p>`
        homeDiv.appendChild(div);
    }
    else {
      
    }
}