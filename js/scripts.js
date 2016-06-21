
// Backend logic

//Ride constructor

function Ride (from, to, date, time, seats, driver, price){
  this.id = null;
  this.from = from;
  this.to = to;
  this.date = date;
  this.time = time;
  this.seats = seats;
  this.driver = driver;
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
  var list = this;
  idList.forEach(function(id){
    htmlText = htmlText +
    '<div class="row result" id ="' + id + '">' +
      '<p>' +
        'From: ' + list.rides[id].from + '<br>' +
        'To: ' + list.rides[id].to + '<br>' +
        'Date: ' + list.rides[id].date + '<br>' +
        'Driver: ' + list.rides[id].driver+ '<br>' +
        '<span class = "btn btn-success" id="' + id + '">Join Ride</span>'+
        '   '+
        '<span class = "btn btn-danger btn-disabled" id="' + id + '">Leave Ride</span>'+
      '</p>'+
    '</div>';
  });
return htmlText
};

// UI Logic
$(document).ready(function() {
  var allRides = new RideList();
  var allUsers = [];

  // for (var i=0; i<3;i++){
  //   var newRide = new Ride("Portland", "Seattle", "2016-06-30", "8:00", 5, "David", 10);
  //   allRides.addRide(newRide);
  //   newRide.id = allRides.rides.length-1;
  //
  // }
  // for (var i=0; i<3;i++){
  //   var newRide = new Ride("Salem", "Portland", "2016-06-29", "8:00", 5, "David", 10);
  //   allRides.addRide(newRide);
  //   newRide.id = allRides.rides.length-1;
  // }

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
    // newUser.id = allUsers.users.length-1;
    // console.log(allUsers);
    $("form").trigger("reset");
  });

  //Create a ride and add it to allRides
  $("form#new-ride").submit(function(event) {
    event.preventDefault();
    var drivername = $("#ride-driver").val();
    var locationFrom = $("#ride-from").val();
    var to = $("#ride-to").val();
    var date = $("#ride-date").val();
    var time = $("#ride-time").val();
    var price = parseInt($("#ride-price").val());
    var seats = parseInt($("#ride-seats").val());
    var newRide = new Ride(locationFrom, to, date, time, seats, price);
    newRide.addDriver(drivername, allUsers);
    // allRides.push(newRide);
    allRides.addRide(newRide);
    $("form").trigger("reset");
  });

  //Search for a ride
  $("#search").click(function(){
    var inputtedFrom = $("#from :selected").val();
    var inputtedTo = $("#to :selected").val();
    var inputtedDate = $("#date").val();
    var searchResults = allRides.search(inputtedFrom,inputtedTo,inputtedDate);
    $("#ride-results").empty();
    $("#ride-results").append(allRides.listRides(searchResults));
  });

});
