// Backend logic

//Ride constructor
function Ride(from, to, date, time, seats, price) {
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

Ride.prototype.checkRider = function(user) {
  var result = true
  this.riders.forEach(function(rider) {
    if (rider.id === user.id) {
      result = false;
    }
  });
  if(this.driver.id === user.id){
    result = false;
  }
  return result;
}

//Ride prototype methods
Ride.prototype.addRider = function(user) {
  if(this.seats > 0){
    this.riders.push(user);
    this.seats--;
    return true;
  } else {
    return false;
  }
};

Ride.prototype.getRiders = function() {
  return this.riders;
};

Ride.prototype.addDriver = function(driver) {
  this.driver = driver;
};

//User constructor
function User(username, password, firstName, lastName, age, image) {
  this.id = null;
  this.username = username;
  this.password = password;
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.image = image;
}

//RideList constructor
function RideList() {
  this.rides = [];
};

//RideList prototype methods
RideList.prototype.addRide = function(ride) {
  this.rides.push(ride);
};

RideList.prototype.search = function(from, to, date) {
  var result = [];
  for (var i = 0; i < this.rides.length; i++) {
    if (!date) {
      if (this.rides[i].from === from && this.rides[i].to === to) {
        result.push(this.rides[i]);
      }
    } else if (this.rides[i].from === from && this.rides[i].to === to && this.rides[i].date === date) {
      result.push(this.rides[i]);
    }
  }
  return result;
};

RideList.prototype.listRides = function() {
  return this.rides;
};

// Function to display all rides
var displayRides = function(rides) {
  var htmlText = "";
    rides.forEach(function(ride,index) {

    htmlText = htmlText +
              '<div class="row-result" id ="' + ride.id + '">' +
                '<span class = "text-success" id="success"></span><br>' +
                '<span class = "text-danger" id="warning"></span><br>' +
                '<div class="col-md-3">' +
                  'Driver: <span class="driver-name" id="' + ride.driver.id + '">' + ride.driver.username + '</span><br>' +
                '</div>' +
                '<div class="col-md-4">' +
                  ride.from  + '<i class="long arrow right icon"></i>' +
                  ride.to +
                  '<br>' +
                  ride.date + 'at' + ride.time +
                '</div>' +
                '<div class="col-md-2">' +
                    'Price: $' + ride.price +
                    '<br>' +
                    ride.seats + 'seats left' +
                '</div>';
                if (ride.seats === 0){
                  htmlText = htmlText +
                  '<div class="col-md-2">' +
                      '<span class = "btn btn-success disabled" id="' + ride.id + '">Join Ride</span>'+
                  '</div>';
                }else{
                  htmlText = htmlText +
                  '<div class="col-md-2">' +
                      '<span class = "btn btn-success join-ride" id="' + ride.id + '">Join Ride</span>'+
                    '</div>'
                }
              htmlText = htmlText +
              '</div>';
  });
  return htmlText
}

// Function to display all info about user
var displayUserInfo = function(user) {
  if(!user){

  }else{
    var htmlText = "";
    htmlText = htmlText +
              '<div id="userModal" class="modal fade" tabindex="-1"role="dialog">' +
                '<div class="modal-dialog">' +
                  '<div class="modal-content">' +
                    '<div class="modal-header">' +
                      '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                      '<h4 class="modal-title">' + user.username + '</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                      '<div class="row user" id ="' + user.id + '">' +
                        '<p>' +
                          '<strong>Username: </strong>' + user.username + '<br>' +
                          '<strong>Name: </strong>' + user.firstName +' ' + user.lastName + '<br>' +
                          '<strong>Age: </strong>' + user.age + '<br>' +
                        '</p>'+
                        '<img src="' + user.image + '"><br>' +
                      '</div>'+
                    '</div>'+
                  '</div>' +
                '</div>' +
              '</div>';
  }
  return htmlText
}

// Function to list riders in a ride
var listRiders = function(riders) {
  var htmlText ="";
  if(riders.length) {
  htmlText= '<ul>';
  riders.forEach(function(rider) {
    htmlText = htmlText +
      '<li>' + rider.firstName + ' ' + rider.lastName + '</li>';
  });
  htmlText = htmlText + '</ul>';
} else {
  htmlText = "None";
}
  return htmlText;
}

// Function to Login

var login = function (users, username, password) {
  var result = false;
  for (var i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password){
      result = users[i];
    }
  }
  return result;
}

var listCities = function(city) {
  var htmlText = ""
  var cities = ["Portland", "Seattle", "Eugene"];
  for (var i=0; i<cities.length; i++) {
    if (city === "all") {
      htmlText = htmlText +
      '<option value="' + i + '">' + cities[i] + '</option>';
    } else if (cities[i] !== city) {
      htmlText = htmlText +
      '<option value="' + i + '">' + cities[i] + '</option>';
    }
  }
  return htmlText;
}

//populate time dropdown
var listTimes = function (){
  var htmlText = ""
  for (var i = 0; i < 24; i++) {

    (i < 10)?htmlText = htmlText +
              '<option value="' + i + '">0' + i + ':00</option>'+
              '<option value="' + i + '">0' + i + ':30</option>'
            :htmlText = htmlText +
              '<option value="' + i + '">'  + i + ':00</option>'+
              '<option value="' + i + '">'  + i + ':30</option>';
  }
  return htmlText;
}

// UI Logic
$(document).ready(function() {
  //Change Navbar transparency
  $(document).on('scroll', function (e) {
       var alpha = $(document).scrollTop() / 800;
       $('.navbar').css('background-color', 'rgba(0,181,173,' + alpha + ')');
  });

  var allRides = new RideList();
  var allUsers = [];
  var currentUser = null;
  $("#ride-time").append(listTimes());
  $("#ride-from").append(listCities("all"));
  $("#ride-to").append(listCities("all"));
  $("#from").append(listCities("all"));
  $("#to").append(listCities("all"));

  //Search for a ride
  $("#search").click(function() {
    var inputtedFrom = $("#from :selected").text();
    var inputtedTo = $("#to :selected").text();
    var inputtedDate = $("#date").val();
    var searchResults = allRides.search(inputtedFrom,inputtedTo,inputtedDate);
    $("#ride-list").empty();
    $("#ride-list").append(displayRides(searchResults));
  });

  // User registration
  $("#register").click(function() {
    $(".navbar-nav").append('<div id="myModal" class="modal fade" tabindex="-1"role="dialog">' +
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
                                        '<label for="password">Password:</label>' +
                                        '<input type="password" class="form-control" id="password">' +
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
                                        '<input type="number" min="18" max="99" class="form-control" id="age">' +
                                      '</div>' +
                                      '<div class="form-group">' +
                                        '<label for="image">Image URL:</label>' +
                                        '<input type="text" class="form-control" id="image">' +
                                      '</div>' +
                                      '<button type="submit" name="button" class="btn" id="new-user-submit">SIGN UP</button>' +
                                    '</form>' +
                                  '</div>'+
                                '</div>' +
                              '</div>' +
                            '</div>');
    $("#myModal").modal('show');
  });

// New user form submission
  $(".navbar-nav").on("submit","#new-user",function(event) {
    event.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    var firstName = $("#firstname").val();
    var lastName = $("#lastname").val();
    var age = $("#age").val();
    var image = $("#image").val();
    var newUser = new User(username, password, firstName, lastName, age, image);
    allUsers.push(newUser);
    newUser.id = allUsers.length-1;
    currentUser = newUser;
    $("form").trigger("reset");
    $("#myModal").modal('hide');
    $(".new-user-screen").show();
    $("#ride-list").empty();
    $("#ride-list").append('<span id="greeting-span">Hello ' + currentUser.firstName + '!</span>')

  });

  // sign in modal
  $("#sign-in").click(function() {
    $("#login-fail").empty();
    $(".navbar-nav").append('<div id="sign-in-modal" class="modal fade"   tabindex="-1"role="dialog">' +
                                '<div class="modal-dialog">' +
                                  '<div class="modal-content">' +
                                    '<div class="modal-header">' +
                                      '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                      '<h4 class="modal-title">Create a new account</h4>' +
                                    '</div>' +
                                    '<div class="modal-body">' +
                                      '<span id="login-fail" class="text-danger"></span>' +
                                      '<form id="user-sign-in">' +
                                        '<div class="form-group">' +
                                          '<label for="username">Username:</label>' +
                                          '<input type="text" class="form-control" id="sign-in-username">' +
                                        '</div>' +
                                        '<div class="form-group">' +
                                          '<label for="password">Password:</label>' +
                                          '<input type="password" class="form-control" id="sign-in-password">' +
                                        '</div>' +
                                        '<button type="submit" name="button" class="btn" id="sign-in-submit">SIGN IN</button>' +
                                      '</form>' +
                                    '</div>'+
                                  '</div>' +
                                '</div>' +
                              '</div>');
    $("#sign-in-modal").modal('show');
  });

  $("#post-ride").click(function() {
    $("#new-ride").show();
  });

// New ride form submission
  $("form#new-ride").submit(function(event) {
    event.preventDefault();
    // var drivername = $("#ride-driver").val();
    var locationFrom = $("#ride-from :selected").text();
    var to = $("#ride-to :selected").text();
    var date = $("#ride-date").val();
    var time = $("#ride-time :selected").text();
    var price = parseInt($("#ride-price").val());
    var seats = parseInt($("#ride-seats").val());
    var newRide = new Ride(locationFrom, to, date, time, seats, price);
    newRide.addDriver(currentUser);
    console.log(newRide.driver);
    newRide.driver.id = 0;
    allRides.addRide(newRide);
    newRide.id = allRides.rides.length-1;
    $("form").trigger("reset");
    $("#new-ride").hide();
    $("#ride-list").empty();
    $("#ride-list").text("Thanks for submitting your ride!");
  });

// Browse all rides
  $("#browse-ride").click(function() {
    $("#ride-list").empty();
    $("#ride-list").append(displayRides(allRides.listRides()));
  });

// Click signup tab
  $("#signup").click(function() {
    $("#register").click();
  });

// Login
  $(".navbar-nav").on("click","#sign-in-submit",function(event) {
    var signInUsername = $("#sign-in-username").val();
    var signInPassword = $("#sign-in-password").val();
    console.log(signInUsername,signInPassword);
    var loginResult = login(allUsers, signInUsername,signInPassword);
    console.log(loginResult);
    if (loginResult){
      currentUser = loginResult;
      $("form").trigger("reset");
      $("#sign-in-modal").modal('hide');
      $(".new-user-screen").show();
      $("#ride-list").empty();
      $("#ride-list").append('<span id="greeting-span">Hello ' + currentUser.firstName + '!</span>')
      //Greet user and open user homepage
    } else {
      $("#login-fail").text("wrong username and/or password.");
    }
  });

// Join ride
  $("#ride-list").on("click",".join-ride",function () {
    var rideId = this.id;
    if (allRides.rides[rideId].checkRider(currentUser)){
      if (allRides.rides[rideId].addRider(currentUser)) {
        $("#ride-list").empty();
        $("#ride-list").append(displayRides(allRides.listRides()));
        $("#success").text("you are now on this ride!!");
      }
    }else{
      $("#ride-list").empty();
      $("#ride-list").append(displayRides(allRides.listRides()));
      $("#warning").text("you're already on this ride.");
    }
    $(".join-ride").addClass("disabled");
  });

// Display driver info
  $("#ride-list").on("click",".driver-name",function() {
    var driverId = this.id;
    $("#ride-list").append(displayUserInfo(allUsers[driverId]));
    $("#userModal").modal('show');
  });

// Create to/from list in post new ride form
  $("#ride-from").on("change",function() {
    var rideFrom = $("select#ride-from :selected").text();
    $("#ride-to").empty();
    $("#ride-to").append(listCities(rideFrom));
  });

  $("#ride-to").on("change",function() {
    var rideTo = $("select#ride-to :selected").text();
    $("#ride-from").empty();
    $("#ride-from").append(listCities(rideTo));
  });

// Create to/from list on search bar
  $("#from").on("change",function() {
    var rideFromSearch = $("select#from :selected").text();
    $("#to").empty();
    $("#to").append(listCities(rideFromSearch));
  });

  $("#to").on("change",function() {
    var rideToSearch = $("select#to :selected").text();
    $("#from").empty();
    $("#from").append(listCities(rideToSearch));
  });


});// End document.ready
