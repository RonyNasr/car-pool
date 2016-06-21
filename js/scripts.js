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
  } else {
    return false;
  }
};

Ride.prototype.listRiders = function() {
  var htmlText = '<ul>';
  this.riders.forEach(function(rider) {
    htmlText = htmlText +
              '<li>' + rider.firstName + ' ' + rider.lastName + '</li>';
  });
  htmlText = htmlText + '</ul>';
  return htmlText;
};

Ride.prototype.addDriver = function(driverName, allUsersArray) {
  var newDriverArray = [];
  allUsersArray.forEach(function(user){
    if (driverName === user.username) {
      newDriverArray.push(user);
    }
  })
  this.driver = newDriverArray;
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
    } else if (this.rides[i].from === from && this.rides[i].to === to && this.rides[i].date === date) {
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
        'Passengers : ' + list.rides[id].listRiders() + '<br>' +
        '<span class = "btn btn-success" id="' + id + '">Join Ride</span>'+
        '   '+
        '<span class = "btn btn-danger btn-disabled" id="' + id + '">Leave Ride</span>'+
      '</p>'+
    '</div>';
  });
return htmlText
};

RideList.prototype.listAllRides = function() {
  var htmlText = "";
  this.rides.forEach(function(ride,index){
    htmlText = htmlText +
    '<div class="row result" id ="' + index + '">' +
      '<p>' +
        'From: ' + ride.from + '<br>' +
        'To: ' + ride.to + '<br>' +
        'Date: ' + ride.date + '<br>' +
        'Driver: ' + ride.driver.username + '<br>' +
        'Passengers : ' + ride.listRiders() + '<br>' +
        '<span class = "btn btn-success" id="' + index + '">Join Ride</span>' +
        '   ' +
        '<span class = "btn btn-danger btn-disabled" id="' + index + '">Leave Ride</span>'+
      '</p>'+
    '</div>';
  });
return htmlText
};

// UI Logic
$(document).ready(function() {
  var allRides = new RideList();
  var allUsers = [];

  //Search for a ride
  $("#search").click(function(){
    var inputtedFrom = $("#from :selected").val();
    var inputtedTo = $("#to :selected").val();
    var inputtedDate = $("#date").val();
    var searchResults = allRides.search(inputtedFrom,inputtedTo,inputtedDate);
    $("#ride-results").empty();
    $("#ride-results").append(allRides.listRides(searchResults));
  });

  $("#register").click(function() {
    $(".navbar-default").append('<div id="myModal" class="modal fade" tabindex="-1"role="dialog">' +
                                '<div class="modal-dialog">' +
                                  '<div class="modal-content">' +
                                    '<div class="modal-header">' +
                                      '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                      '<h4 class="modal-title">Create a new account</h4>' +
                                    '</div>' +
                                    '<div class="modal-body">' +
                                      '<form id="new-user">' +
                                        '<div class="form-group">' +
                                          '<label for="username">Username:</label>' +
                                          '<input type="text" class="form-control" id="username">' +
                                        '</div>' +
                                        '<div class="form-group">' +
                                          '<label for="firstname">First Name:</label>' +
                                          '<input type="text" class="form-control" id="firstname">' +
                                        '</div>' +
                                        '<div class="form-group">' +
                                          '<label for="lastname">Last Name:</label>' +
                                          '<input type="text" class="form-control" id="lastname">' +
                                        '</div>' +
                                        '<div class="form-group">' +
                                          '<label for="age">Age:</label>' +
                                          '<input type="number" class="form-control" id="age">' +
                                        '</div>' +
                                        '<div class="form-group">' +
                                          '<label for="image">Image URL:</label>' +
                                          '<input type="text" class="form-control" id="image">' +
                                        '</div>' +
                                        '<button type="submit" name="button" class="btn" id="blah">Submit</button>' +
                                      '</form>' +
                                  '</div>' +
                                '</div>' +
                              '</div>');
    $("#myModal").modal('show');
  });

  $(".navbar-default").on("submit","#new-user",function(event) {
    event.preventDefault();
    var username = $("#username").val();
    var firstName = $("#firstname").val();
    var lastName = $("#lastname").val();
    var age = $("#age").val();
    var image = $("#image").val();
    var newUser = new User(username, firstName, lastName, age, image);
    allUsers.push(newUser);
    newUser.id = allUsers.length-1;
    console.log(allUsers);
    $("form").trigger("reset");
    $("#myModal").modal('hide');
    $(".new-user-screen").show();
  });

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
    allRides.addRide(newRide);
    $("form").trigger("reset");
    $("#new-ride").hide();
    console.log(allRides);
  });

  $("#post-ride").click(function() {
    $("#new-ride").show();
  });

  $("#browse-ride").click(function() {
    $("#all-rides").append(allRides.listAllRides());
  });
});
