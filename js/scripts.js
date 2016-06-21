
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
  this.riders.push(user);
  this.seats--;
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
//
// function UserList() {
//   this.users = [];
// }

// UserList.prototype.addUser = function(user) {
//   this.users.push(user);
// }

function RideList () {
  this.rides = [];
};

RideList.prototype.addRide = function (ride) {
  this.rides.push(ride);
};

RideList.prototype.removeRide = function (rideId) {
  this.rides.splice(rideId, 1);
};

RideList.prototype.findRide = function (from) {
  var result = [];
  for (var i = 0; i < this.rides.length; i++) {
    if (this.rides[i].from === from){
      result.push(this.rides[i].id);
    }
  }
  return result;
};




// UI Logic
$(document).ready(function() {
  // var allRides = [];
  var allRides = new RideList();
  var allUsers = [];
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

  $("form#new-ride").submit(function(event) {
    event.preventDefault();
    console.log(allUsers);
    var drivername = $("#ride-driver").val();
    console.log(drivername);
    var locationFrom = $("#ride-from").val();
    var to = $("#ride-to").val();
    var date = $("#ride-date").val();
    var time = $("#ride-time").val();
    var price = parseInt($("#ride-price").val());
    var seats = parseInt($("#ride-seats").val());
    var newRide = new Ride(locationFrom, to, date, time, seats, price);
    console.log(newRide.driver)
    newRide.addDriver(drivername, allUsers);
    // allRides.push(newRide);
    allRides.addRide(newRide);
    console.log(allRides);
    $("form").trigger("reset");
  });

});
