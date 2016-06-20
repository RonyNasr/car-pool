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
