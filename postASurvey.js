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
    if(link == "") {
        document.getElementById("addError").style.color = "red";
        document.getElementById("addError").innerHTML = "Please add a valid google forms link";
    } else if(title == "") {
        document.getElementById("addError").style.color = "red";
        document.getElementById("addError").innerHTML = "Please add a valid title";
    } else if(description == "") {
        document.getElementById("addError").style.color = "red";
        document.getElementById("addError").innerHTML = "Please add a valid description";
    } else if(length == "" || Number.isNaN(length) || length <= 0 || length > 60) {
        document.getElementById("addError").style.color = "red";
        document.getElementById("addError").innerHTML = "Please add a valid survey length";
    } else{
        document.getElementById("addError").style.color = "black";
        document.getElementById("addError").innerHTML = "Your survey has been uploaded";
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