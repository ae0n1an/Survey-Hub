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

window.onload = function() {
  let database = firebase.database();
  let ref = database.ref('surveys')
  update();
  ref.on('value', gotData, errData)
};

function gotData(data){
  document.getElementById("surveys").innerHTML = ``
  let surveys = data.val();
  let keys = Object.keys(surveys);
  let order = [];
  let newOrder = [];
  
  for (let i = 0; i < keys.length; i++){ //add foreach => function 
    let k = keys[i];
    let boost = surveys[k].boost;
    newOrder.push(boost);
    order.push({boost: boost, key: k})
  }

  newOrder = newOrder.sort().reverse();
  console.log(newOrder);
  console.log(order.length);

  for (let i = 0; i < order.length; i++){ //add foreach => function 
    for (let j = 0; j < newOrder.length; j++){ //add foreach => function 
      if (order[i].boost == newOrder[j]) {
        newOrder[j] = order[i];
        j = newOrder.length;
      }
    }
  }
  console.log(newOrder);

  for (let i = 0; i < newOrder.length; i++){ //add foreach => function
    let k = newOrder[i].key
    let email = surveys[k].email;
    let title = surveys[k].title;
    let description = surveys[k].description;
    let length = surveys[k].length;
    createInfo(k, email, title, description, length);
  }
}

function errData(err){
  console.log(err);
}

function createInfo(key, email, title, description, length){
  let email_id = firebase.auth().currentUser.email;
  if (email == email_id){
    
  }
  else {
    let homeDiv = document.getElementById("surveys");
    let a = document.createElement('a');
    a.id = key;
    a.className = 'survey_display-div';
    a.href = 'completeASurvey.html?' + key;
    a.innerHTML = `<p><u class="title">${title}</u></p><br><p class="length"><img src="clock.jpg"> ${length} minutes</p><p><img src="credits.png"> ${length*10}</p><br><p class="desc">${description}</p>`
    homeDiv.appendChild(a);
  }
}

function openPost(){
  window.open("postASurvey.html","_self");
}

document.getElementById("search").addEventListener("keyup", filter);

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

document.getElementById("titleSelect").addEventListener("click", function() {
  document.getElementById("searchDropdown").innerHTML = `Title <i class="fa fa-caret-down"></i>`;
  filter();
});

document.getElementById("descriptionSelect").addEventListener("click", function() {
  document.getElementById("searchDropdown").innerHTML = `Description <i class="fa fa-caret-down"></i>`;
  filter();
});

document.getElementById("lengthSelect").addEventListener("click", function() {
  document.getElementById("searchDropdown").innerHTML = `Length <i class="fa fa-caret-down"></i>`;
  filter();
});