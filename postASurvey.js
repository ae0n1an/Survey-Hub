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

function add() {
    let link = document.getElementById("googleform_field").value;
    let title = document.getElementById("title_field").value;
    let description = document.getElementById("description_field").value;
    let length = document.getElementById("length_field").value;
    if(toomany === false) {
        document.getElementById("addError").style.color = "red";
        document.getElementById("addError").innerHTML = `The maximum number of surveys allowed is 3`;
    } else if(link == "" || link.startsWith("https://docs.google.com/forms/d/e/") == false || link.endsWith("/viewform?usp=sf_link") == false) {
        document.getElementById("addError").style.color = "red";
        document.getElementById("addError").innerHTML = `Please add a valid google forms link e.g. https://docs.google.com/forms/d/e/xxx/viewform?usp=sf_link shortened links not accepted`;
    } else if(title == "") {
        document.getElementById("addError").style.color = "red";
        document.getElementById("addError").innerHTML = `Please add a valid title`;
    } else if(description == "") {
        document.getElementById("addError").style.color = "red";
        document.getElementById("addError").innerHTML = `Please add a valid description`;
    } else if(length == "" || Number.isNaN(length) || length <= 0 || length > 60) {
        document.getElementById("addError").style.color = "red";
        document.getElementById("addError").innerHTML = `Please add a valid survey length`;
    } else{
        document.getElementById("addError").style.color = "black";
        document.getElementById("addError").innerHTML = `Your survey has been uploaded`;
        let database = firebase.database();
        let ref = database.ref('surveys');
        let data = {
            email: firebase.auth().currentUser.email,
            link: link, 
            title: title, 
            description: description,
            length: parseInt(length)
        }
        ref.push(data);
    }
}

window.onload = function() {
    let database = firebase.database();
    let ref = database.ref('surveys');
    ref.on('value', checkData, errData);
};

var toomany = false

function checkData(data){
    var surveys = data.val();
    let counter = 0
    let email_id = firebase.auth().currentUser.email;
    let keys = Object.keys(surveys);
    for (let i = 0; i < keys.length; i++){
        let k = keys[i];
        let email = surveys[k].email;
        if (email == email_id){
            counter =  counter + 1;
        }
    }
    if (counter >= 3){
        toomany = false;
    } else {
        toomany = true;
    }
}
  
function errData(err){
    console.log(err);
}