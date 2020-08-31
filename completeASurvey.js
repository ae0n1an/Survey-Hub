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

// Graps the survey key from the page url
var key = document.location.href.split('?')[document.location.href.split('?').length - 1];

// Triggers functions on page load
window.onload = function() {
  let database = firebase.database();
  let ref = database.ref('surveys');
  update();
  ref.on('value', gotData, errData);
};

// Gets survey data based on the key
function gotData(data){
  document.getElementById("home-div").innerHTML = ``
  let surveys = data.val();
  //let email = surveys[key].email;
  //let title = surveys[key].title;
  //let description = surveys[key].description;
  let length = surveys[key].length;
  let link = surveys[key].link;
  addSurveyToPage(link, length);
}

// Creates the credits variable
var credits = 0;

// Creates the google forms survey on the page in an iframe and creates the finish button
function addSurveyToPage(link, length){
  let homeDiv = document.getElementById("home-div");
  let div = document.createElement('div');
  credits = length * 10;
  div.id = 'survey_completion_div';
  div.innerHTML = `<iframe src="${link}?embedded=true" id="myFrame" width="640" height="685" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>`
  homeDiv.insertBefore(div, homeDiv.firstChild);

  div = document.createElement('div');
  div.className = 'home-div';
  div.innerHTML = `<button id="finish">Finish</button>`
  document.body.appendChild(div);
  addlistener();
};

// Checks for data errors and logs them to the console
function errData(err){
  console.log(err);
}

// Listens for when the finish button is clicked and returns the user to the home page
function addlistener() {
  document.getElementById("finish").addEventListener("click", function(){
    addCredits(credits);
    window.open("home.html","_self");
  });
};

// Adds credits to the users account based on the length of the survey they finished
function addCredits(credits) {
  let id = firebase.auth().currentUser.uid;
  firebase.database().ref('users/' + id).set({
    balance: balance + credits,
  });
}