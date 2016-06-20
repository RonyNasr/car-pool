// Backend logic

//Ride constructor

function Ride (from, to, date, time, seats, driver){
  this.id = null;
  this.from = from;
  this.to = to;
  this.date = date;
  this.time = time;
  this.seats = seats;
  this.driver = driver;
  this.riders = [];
}

//Ride protoype methods

Ride.prototype.methodName = function () {

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
