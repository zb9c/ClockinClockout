function regUser(){
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var fullString = '/addWorker/'+firstName+" "+lastName;
    console.log("Go to this address: " + fullString);
    const Http = new XMLHttpRequest();
    Http.open("GET", fullString);
    Http.send()
    Http.onreadystatechange= (e)=>{
      console.log(Http.responseText);
    }
    location.reload();
  }
function clockIn(){
      var firstName = document.getElementById('firstName').value;
      var lastName = document.getElementById('lastName').value;
      var fullString = '/clockIn/' + firstName + " " + lastName;
      console.log("Go to this address: " + fullString);
      const Http = new XMLHttpRequest();
      Http.open("GET", fullString);
      Http.send();
      Http.onreadystatechange= (e)=>{
        console.log(Http.responseText);
      }
    }
function clockOut(){
      var firstName = document.getElementById('firstName').value;
      var lastName = document.getElementById('lastName').value;
      var fullString = '/clockOut/' + firstName + " " + lastName;
      console.log("Go to this address: " + fullString);
      const Http = new XMLHttpRequest();
      Http.open("GET", fullString);
      Http.send();
      Http.onreadystatechange= (e)=>{
        console.log(Http.responseText);
      }
    }
function getPay() {
      var firstName = document.getElementById('firstName').value;
      var lastName = document.getElementById('lastName').value;
      var fullString = '/getPay/' + firstName + " " + lastName;
      console.log("Go to this address: " + fullString);
      const Http = new XMLHttpRequest();
      Http.open("GET", fullString);
      Http.send();
      Http.onreadystatechange= (e)=>{
        console.log(Http.responseText);
      }

      //TO-DO: update DOM to display the returned JSON data
    }
function resetEverything(){
    const Http = new XMLHttpRequest();
    Http.open("GET", "/resetEverything");
    Http.send();
    Http.onreadystatechange = (e) => {
      console.log(Http.responseText);
    }
    location.reload();
  }


//P5.JS stuff
function setup(){
  console.log("SETUP FUNCTION RUN!")  
  loadJSON('/allHours', gotData);
    console.log("USER DATA LOADED");
}
function gotData(data){
  
  var users = Object.keys(data);

    for(var user in users){
      var node = document.createElement("LI");
      var textNode = document.createTextNode(users[user]);
      node.appendChild(textNode);
      document.getElementById("users").appendChild(node);
    }

}