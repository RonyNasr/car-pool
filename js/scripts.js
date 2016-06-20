
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
  this.riders.push(user);
  this.seats--;
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

User.prototype.methodName = function () {

};



// UI Logic
$(document).ready(function() {
  $("form#new-ride").submit(function(event) {
    event.preventDefault();
    var driver = $("#ride-driver").val();
    var from = $("#ride-from").val();
    var to = $("#ride-to").val();
    var date = $("#ride-date").val();
    var time = $("#ride-time").val();
    var price = parseInt($("#ride-price").val());
    var seats = parseInt($("#ride-seats").val());
    var newRide = new Ride(from, to, date, time, seats, driver, price);
    newRide.addRider();
    console.log(newRide);
  });

  $("form#new-user").submit(function(event) {
    event.preventDefault();
    var username = $("#username").val();
    var firstName = $("#firstname").val();
    var lastName = $("#lastname").val();
    var age = $("#age").val();
    var image = $("#image").val();
    var newUser = new User(username, firstName, lastName, age, image);
    console.log(newUser);
  });

});
