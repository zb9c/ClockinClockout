var fs = require('fs');
//read the userHours json file
var datauserHours = fs.readFileSync('userHours.json');
var userHours = JSON.parse(datauserHours);
console.log("User Data from json file loaded");
//read the userClockIn json file
var dataUserClockInTime = fs.readFileSync('userClockIn.json');
var userClockIn = JSON.parse(dataUserClockInTime);
console.log("User Clock In times file loaded");
//read the userClockout json file
var dataUserClockOutTime = fs.readFileSync('userClockout.json');
var userClockOut = JSON.parse(dataUserClockOutTime);
console.log("User Clockout times file loaded");

//create global variables so we can figure out the difference between times
var clockInTime = {}
var clockOutTime = {}
let userClockInTime;

const express = require('express');
const app = express();
app.listen(1111, () => console.log('listening at port 1111'));
//app.use(express.static('public2'));
app.use(express.static('public'));

app.get('/addWorker/:worker/',addWorkerToDB);
function addWorkerToDB(request, response){
    var data = request.params;
    var worker = data.worker;
    if(worker in userHours){
        ans = {"msg" : "User is already in database"};
    }else{
        var defaultHours = 0;
        userHours[worker] = defaultHours;
        var data = JSON.stringify(userHours, null, 2);
        fs.writeFile('userHours.json', data, finished)   
        function finished(err){
            console.log("New Worker Added!");
        }
        var ans = {"msg" : "User: " + worker + " added to DB with " + defaultHours + "hrs."}
    } 
response.send(ans);

}
app.get('/userMinutes/:user', getUserMinutes);
function getUserMinutes(request, response){
    var u = request.params.user;
    var hours = userHours[u];
    ans = {"msg" : hours};
    response.send(ans);
}
app.get('/clockin/:user/', clockIn);
function clockIn(request, response) {
    var userClockingIn = request.params.user;
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    //Makes sure the user isnt already clocked in
    if(userClockingIn in clockInTime){
        ans = {"msg" : "User is already clocked in @ " + clockInTime[cuserClockingIn]};
    }else {
        userClockInTime = hours * 60 + minutes;
        clockInTime[userClockingIn] = userClockInTime;
        //Save the new Data to file
        var data = JSON.stringify(clockInTime, null, 2);
        fs.writeFile('userClockIn.json', data, finished)
        function finished(err){
            console.log("New hours Added!");
        }
        //Send data to client and log it in the terminal
        ans = {"msg" : "Clocking In " + userClockingIn + " @ " + userClockInTime};
    }
}
app.get("/clockout/:user/", clockOut);
function clockOut(request, response){ 
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    var userClockingout = request.params.user;
    userClockoutTime = hours * 60 + minutes;

    console.log("User " + userClockingout + " clocked out @ " + hours % 12 + ":" + minutes);
    clockOutTime[userClockingout] = userClockoutTime;
    //Save data to clockout file
    var data = JSON.stringify(clockOutTime, null, 2);
    fs.writeFile('userClockOut.json', data, a)
    function a(err){
        console.log("User clock out time addedd to DB");
    }

    //Need to update userHours dict with the minutes that the user worked and then update the file
    //take time user clocked-out and subtract it from the time the user clocked-in
    var minutesUserWorked = clockOutTime[userClockingout] - clockInTime[userClockingout];
    console.log("User worked: " + minutesUserWorked + " minutes.");
    userHours[userClockingout] += minutesUserWorked;
    var data = JSON.stringify(userHours, null, 2);
    fs.writeFile('userHours.json', data, b);
    function b(err){
        console.log("User Clocked out and minutes updated in DB");
    }

    //reset clockIn file to 0
    userClockIn[userClockingout] = 0;
    var data = JSON.stringify(userClockIn, null, 2);
    fs.writeFile('userClockIn.json', data, c);
    function c(err){
        console.log("userClockIn file updated after user clocked out.")
    }
    //Send data to client and log it in the terminal
    response.send("User " + userClockingout + " clocked Out @" + userClockoutTime.toString());
}
app.get('/allHours', sendAll);
function sendAll(request, response){
    response.send(userHours);
}
app.get('/giveMinutes/:user/:hours', giveMinutes);
function giveMinutes(request, response){ 
    if(request.params.user in userHours){
        var usrHrs = userHours[request.params.user];
        
        userHours[request.params.user] += Number(request.params.hours) * 60;
        var data = JSON.stringify(userHours, null, 2);
        fs.writeFile('userHours.json', data, finished)
        function finished(err){
            console.log("New Worker Added!");
        }
        ans = {"msg":"User " + request.params.user + " has added " + request.params.hours + " more hours."};
    }else{
        ans = {"msg":"User Not found."};
    }
    response.send(ans);
}
app.get('/getPay/:user/', getPay);
function getPay(request, response){
    var hourlyPay = 10;
    var minutePay = hourlyPay / 60;
    if(request.params.user in userHours){
        ans = {"msg" : request.params.user +" is being paid $" + userHours[request.params.user] * minutePay + " for " + userHours[request.params.user] + " minutes of work." };
    }else{
        ans = {"msg" : "Invalid User"};
    }
    response.send(ans);
}
app.get('/resetEverything' , reset);
function reset(request, response) {
   userHours = {};
   userClockOut = {};
   userClockIn = {};
   ans = {"msg" : "Everything has been reset"};
   response.send(ans);
}

