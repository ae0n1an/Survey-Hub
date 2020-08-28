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

var key = document.location.href.split('?')[document.location.href.split('?').length - 1];

window.onload = function() {
  let database = firebase.database();
  let ref = database.ref('surveys')
  ref.on('value', gotData, errData)
};

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

var credits = 0;

function addSurveyToPage(link, length){
  let homeDiv = document.getElementById("home-div");
  let div = document.createElement('div');
  credits = length * 10;
  div.id = 'survey_completion_div';
  div.innerHTML = `<iframe src="${link}?embedded=true" id="myFrame" width="640" height="685" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>`
  homeDiv.insertBefore(div, homeDiv.firstChild);
};


function errData(err){
  console.log(err);
}

document.getElementById("finish").addEventListener("click", function(){
  console.log(credits);
  window.open("home.html","_self");
});