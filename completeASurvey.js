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


function displayData(email, title, description, length, link){
  console.log(email, title, description, length, link);
}

function openPost(){
  window.open("postASurvey.html","_self");
}

window.onload = function() {
  var url = document.location.href,
  link = url.split('?');
  link = link[1].split('=')[1];
  credits = url.split('&');
  credits = credits[1].split('=')[1];
  addSurveyToPage(link, credits)
};

function addSurveyToPage(link, credits){
  let homeDiv = document.getElementById("user_div");
  let div = document.createElement('div');
  div.id = 'survey_completion_div';
  div.innerHTML = `<iframe src="${link}?embedded=true" width="640" height="685" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>`
  homeDiv.insertBefore(div, homeDiv.firstChild);
};