
// Backend logic

//Ride constructor

function Ride (from, to, date, time, seats, price){
  this.id = null;
  this.from = from;
  this.to = to;
  this.date = date;
  this.time = time;
  this.seats = seats;
  this.driver = [];
  this.riders = [];
  this.price = price;
}

//Ride protoype methods

Ride.prototype.addRider = function(user) {
  if(this.seats > 0){
    this.riders.push(user);
    this.seats--;
  return true;
}else {
  return false;
}
};

Ride.prototype.addDriver = function(driverName, allUsersArray) {
  var newDriverArray = [];
  console.log("this.driver: " + this.driver);

  allUsersArray.forEach(function(user){
    console.log("user.username: " + user.username);
    if (driverName === user.username) {
      newDriverArray.push(user);
    }
  })
  this.driver = newDriverArray;
  console.log("this.driver: " + this.driver[0].username);
};

//User constructor
function User (username, firstName, lastName, age, image){
  this.id =null;
  this.username = username;
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.image = image;
}

//User prototype methods


function RideList () {
  this.rides = [];
};

RideList.prototype.addRide = function (ride) {
  this.rides.push(ride);
};

RideList.prototype.removeRide = function (rideId) {
  this.rides.splice(rideId, 1);
};

RideList.prototype.search = function (from, to, date) {
  var result = [];
  for (var i = 0; i < this.rides.length; i++) {
    if (!date){
      if (this.rides[i].from === from && this.rides[i].to === to){
        result.push(this.rides[i].id);
      }
    }else if (this.rides[i].from === from && this.rides[i].to === to && this.rides[i].date === date){
      result.push(this.rides[i].id);
    }
  }
  return result;
};

RideList.prototype.listRides = function (idList) {
  var htmlText = "";
  var tempList = this;
  idList.forEach(function(id){
    console.log(tempList.rides[id]);
    htmlText = htmlText +
    '<div class="row result" id ="' + id + '">' +
      '<p>' +
        'From: ' + tempList.rides[id].from + '<br>' +
        'To: ' + tempList.rides[id].to + '<br>' +
        'Date: ' + tempList.rides[id].date + '<br>' +
        'Driver: ' + tempList.rides[id].driver[0].username+ '<br>' +
        '<span class = "btn btn-success join" id="' + id + '">Join Ride</span>'+
        // '   '+
        // '<span class = "btn btn-danger leave" id="' + id + '">Leave Ride</span>'+
      '</p>'+
    '</div>';
  });
return htmlText
};

var getCurrentUser = function (allUsers,username){
  allUsers.forEach (function (user) {
    if(user.username === username){
      return user;
    }
  });
  return false
}

// UI Logic
$(document).ready(function() {
  var allRides = new RideList();
  var allUsers = [];
  var currentUser = null;

  // Create a user and add him to allUsers
  $("form#new-user").submit(function(event) {
    event.preventDefault();
    var username = $("#username").val();
    var firstName = $("#firstname").val();
    var lastName = $("#lastname").val();
    var age = $("#age").val();
    var image = $("#image").val();
    var newUser = new User(username, firstName, lastName, age, image);
    allUsers.push(newUser);
    newUser.id = allUserslength-1;
    $("form").trigger("reset");
  });

  //Create a ride and add it to allRides
  $("form#new-ride").submit(function(event) {
    event.preventDefault();
    var drivername = $("#ride-driver").val();
    var locationFrom = $("#ride-from :selected").val();
    var to = $("#ride-to :selected").val();
    var date = $("#ride-date").val();
    var time = $("#ride-time").val();
    var price = parseInt($("#ride-price").val());
    var seats = parseInt($("#ride-seats").val());
    var newRide = new Ride(locationFrom, to, date, time, seats, price);
    console.log(price);
    newRide.addDriver(drivername, allUsers);
    allRides.addRide(newRide);
    newRide.id = allRides.rides.length-1;
    $("form").trigger("reset");
  });

  //Search for a ride
  $("#search").click(function(){
    var inputtedFrom = $("#from :selected").val();
    var inputtedTo = $("#to :selected").val();
    var inputtedDate = $("#date").val();
    var searchResults = allRides.search(inputtedFrom,inputtedTo,inputtedDate);
    $("#ride-results").empty();
    console.log("allRides", allRides);
    $("#ride-results").append(allRides.listRides(searchResults));
  });

  $("#ride-results").on("click","#add",function(){
    var rideId =  this.id;
    allRides.rides[rideId].addRider(currentUser);
  });

  $("#login").click (function() {
    var username = $("#usrname").val();
    currentUser = getCurrentUser(allUsers,username);
    if (!currentUser){
      alert("Wrong username/password!")
    }else{
      // go to main page
    }
  });
});
