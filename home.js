// Checks if user is signed in and diplays their email address on the home page or logs them out if they are not logged in
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      
      var user = firebase.auth().currentUser;
        
        if(user != null){
          
          var email_id = user.email;
          //use backtick syntax
          document.getElementById("user_para").innerHTML = `Welcome User : ${email_id}`
        }
  
    } else {
      // No user is signed in.
      window.open("login.html","_self");
    }
});


// Calls functions on page load and checks if data changes
window.onload = function() {
  let database = firebase.database();
  let ref = database.ref('surveys')
  update();
  ref.on('value', gotData, errData)
};

// Gets data from server and re-orders data so it is sent in the order of the surveys with the greatest boost rating
function gotData(data){
  document.getElementById("surveys").innerHTML = ``
  let surveys = data.val();
  let keys = Object.keys(surveys);
  let order = [];
  let newOrder = [];
  
  for (let i = 0; i < keys.length; i++){
    let k = keys[i];
    let boost = surveys[k].boost;
    newOrder.push(boost);
    order.push({boost: boost, key: k})
  }

  newOrder = newOrder.sort().reverse();

  for (let i = 0; i < order.length; i++){
    for (let j = 0; j < newOrder.length; j++){ 
      if (order[i].boost == newOrder[j]) {
        newOrder[j] = order[i];
        j = newOrder.length;
      }
    }
  }

  for (let i = 0; i < newOrder.length; i++){
    let k = newOrder[i].key
    let email = surveys[k].email;
    let title = surveys[k].title;
    let description = surveys[k].description;
    let length = surveys[k].length;
    let boost = surveys[k].boost;
    createInfo(k, email, title, description, length, boost);
  }
}

// logs errors to the console if they occur when collecting data
function errData(err){
  console.log(err);
}

// Displays data to the home page
function createInfo(key, email, title, description, length, boost){
  let email_id = firebase.auth().currentUser.email;
  if (email == email_id){
    
  }
  else {
    let homeDiv = document.getElementById("surveys");
    let a = document.createElement('a');
    a.id = key;
    a.className = 'survey_display-div';
    a.href = 'completeASurvey.html?' + key;
    a.innerHTML = `<p><u class="title">${title}</u></p><br><p class="length"><img src="clock.jpg"> ${length} minutes</p><p><img src="credits.png"> ${length*10}</p><p><img src="boost.png"> ${boost}</p><br><p class="desc">${description}</p>`
    homeDiv.appendChild(a);
  }
}

// Opens post a survey page
function openPost(){
  window.open("postASurvey.html","_self");
}

// Checks if kekup event id triggered while tying in the search bar and calls filter function if it is
document.getElementById("search").addEventListener("keyup", filter);

// Filters the surveys on the home page based on the search bar and the selected value i the dropdown
function filter() {
  let selected = document.getElementById("searchDropdown").innerHTML.split(' ')[0];
  let input = document.getElementById('search');
  let filter = input.value.toUpperCase();
  let surveyBoxes = document.getElementsByClassName("survey_display-div");
  let titleList = document.getElementsByClassName("title");
  let descList = document.getElementsByClassName("desc");
  let lengthList = document.getElementsByClassName("length");
  let titles = [];
  let descs = [];
  let lengths = [];

  if (selected == "Title") {

    for (i = 0; i < titleList.length; i++) {
      titles.push(titleList[i].innerHTML)
    }

    for (i = 0; i < titles.length; i++) {
      txtValue = titles[i];
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        surveyBoxes[i].style.display = "";
      } else {
        surveyBoxes[i].style.display = "none";
      }
    }

  } else if (selected == "Description") {

    for (i = 0; i < descList.length; i++) {
      descs.push(descList[i].innerHTML)
    }

    for (i = 0; i < descs.length; i++) {
      txtValue = descs[i];
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        surveyBoxes[i].style.display = "";
      } else {
        surveyBoxes[i].style.display = "none";
      }
    }

  } else if (selected == "Length") {
    for (i = 0; i < lengthList.length; i++) {
      lengths.push(parseInt(lengthList[i].innerText.split(" ")[1]));
    }

    for (i = 0; i < lengths.length; i++) {
      txtValue = lengths[i];
      if (txtValue == parseInt(filter) || filter == "") {
        surveyBoxes[i].style.display = "";
      } else {
        surveyBoxes[i].style.display = "none";
      }
    }
  }

};

// Checks if title is selected in the dropdown and changes the innerhtml and triggers the filter function
document.getElementById("titleSelect").addEventListener("click", function() {
  document.getElementById("searchDropdown").innerHTML = `Title <i class="fa fa-caret-down"></i>`;
  filter();
});

// Checks if description is selected in the dropdown and changes the innerhtml and triggers the filter function
document.getElementById("descriptionSelect").addEventListener("click", function() {
  document.getElementById("searchDropdown").innerHTML = `Description <i class="fa fa-caret-down"></i>`;
  filter();
});

// Checks if length is selected in the dropdown and changes the innerhtml and triggers the filter function
document.getElementById("lengthSelect").addEventListener("click", function() {
  document.getElementById("searchDropdown").innerHTML = `Length <i class="fa fa-caret-down"></i>`;
  filter();
});