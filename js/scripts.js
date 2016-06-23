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

Ride.prototype.checkRider = function(user){
  var result =true
  this.riders.forEach(function (rider){
    console.log(rider.id,user.id);
    if (rider.id === user.id){
      result = false;
    }
  });
  return result;
}

//Ride prototype methods
Ride.prototype.addRider = function(user) {
  if(this.seats > 0 && this.checkRider(user)){
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

Ride.prototype.addDriver = function(driverName, allUsersArray) {
  var newDriverArray = [];
  allUsersArray.forEach(function(user){
    if (driverName === user.username) {
      newDriverArray.push(user);
    }
  })
  this.driver = newDriverArray;
  console.log("driver name:" + this.driver);
};

//User constructor
function User (username, password, firstName, lastName, age, image){
  this.id =null;
  this.username = username;
  this.password = password;
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.image = image;
}

//RideList constructor
function RideList () {
  this.rides = [];
};

//RideList prototype methods
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
        result.push(this.rides[i]);
      }
    } else if (this.rides[i].from === from && this.rides[i].to === to && this.rides[i].date === date) {
      result.push(this.rides[i]);
    }
  }
  return result;
};

RideList.prototype.listRides = function () {
  return this.rides;
};



// Function to display all rides
var displayRides = function (rides) {
  var htmlText = "";
    rides.forEach(function(ride,index){
    htmlText = htmlText +

    //for reference only
    //
    // '<div class="row result" id ="' + ride.id + '">' +
    // '<p>' +
    // '<span class = "text-danger" id="warning"></span><br><br>'+
    // 'From: ' + ride.from + '<br>' +
    // 'To: ' + ride.to + '<br>' +
    // 'Date: ' + ride.date + '<br>' +
    // 'Time: ' + ride.time + '<br>' +
    // 'Driver: <span class="driver-name" id="' + ride.driver[0].id + '">' + ride.driver[0].username + '</span><br>' +
    // 'Passengers: ' + listRiders(ride.getRiders()) + '<br>' +
    // 'Seats Available: ' + ride.seats + '<br>' +
    // 'Price: ' + ride.price + '<br>' +
    // '<span class = "btn btn-success join-ride" id="' + ride.id + '">Join Ride</span>'+
    // '   '+
    // '</p>'+
    // '</div>';

    '<div class="row-result" id ="' + ride.id + '">' +
      '<div class="col-md-3">' +
        'Driver: <span class="driver-name" id=' + ride.driver[0].id + '">' + ride.driver[0].username + '</span><br>' +
        'Passengers: ' + listRiders(ride.getRiders()) + '<br>' +
      '</div>' +
      '<div class="col-md-4">' +
        ride.from  + ' <i class="long arrow right icon"></i>' +
        ride.to +
        '<br>' +
        ride.date + ' at ' + ride.time +
        '</div>' +
        '<div class="col-md-2">' +
          'Price: $' + ride.price +
          '<br>' +
          ride.seats + ' seats left' +
        '</div>' +
        '<div class="col-md-2">' +
          '<span class = "btn btn-success join-ride" id="' + ride.id + '">Join Ride</span>'+
        '</div>' +
      '</div>';

  });
  return htmlText
}

// Function to display all info about user
var displayUserInfo = function (user){
  if(!user){
    alert("user doesn't exist!!")
  }else{
    var htmlText = "";
    htmlText = htmlText +

    '<div class="row user" id ="' + user.id + '">' +
    '<p>' +
    'username: ' + user.username + '<br>' +
    'Name: ' + user.firstName +' ' + user.lastName + '<br>' +
    'Age: ' + user.age + '<br>' +
    '<img src="' + user.image + '"><br>' +
    '</p>'+
    '</div>';
  }
  return htmlText
}

// Function to list riders in a ride
var listRiders = function (riders){
  var htmlText ="";
  if(riders.length){
  htmlText= '<ul>';
  riders.forEach(function(rider) {
    htmlText = htmlText +
      '<li>' + rider.firstName + ' ' + rider.lastName + '</li>';
  });
  htmlText = htmlText + '</ul>';
}else {
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
    }else if (cities[i] !== city) {
      htmlText = htmlText +
      '<option value="' + i + '">' + cities[i] + '</option>';
    }
  }
  return htmlText;
}

// UI Logic
$(document).ready(function() {
  //Change Navbar transparency
  $(document).on('scroll', function (e) {
       var alpha = $(document).scrollTop() / 900;
       $('.navbar').css('background-color', 'rgba(0,0,0,' + alpha + ')');
  });

  var allRides = new RideList();
  var allUsers = [];
  var currentUser = null;

  $("#ride-from").append(listCities("all"));
  $("#ride-to").append(listCities("all"));
  $("#from").append(listCities("all"));
  $("#to").append(listCities("all"));



  // //Sample input for search test
  // for (var i = 0; i < 3; i++) {
  //   var newRide = new Ride("Portland", "Seattle", '2016-06-30', '08:00AM', 3, 12);
  //   newRide.driver = "David";
  //   allRides.addRide(newRide);
  //   newRide.id = allRides.rides.length-1;

  // }
  // for (var i = 0; i < 3; i++) {
  //   var newRide = new Ride("Seattle", "Portland", '2016-06-20', '08:00AM', 3, 12);
  //   newRide.driver = "Yuri";
  //   allRides.addRide(newRide);
  //   newRide.id = allRides.rides.length-1;

  // }

  //Search for a ride
  $("#search").click(function(){
    var inputtedFrom = $("#from :selected").val();
    var inputtedTo = $("#to :selected").val();
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
                                          '<input type="number" class="form-control" id="age">' +
                                        '</div>' +
                                        '<div class="form-group">' +
                                          '<label for="image">Image URL:</label>' +
                                          '<input type="text" class="form-control" id="image">' +
                                        '</div>' +
                                        '<button type="submit" name="button" class="btn" id="new-user-submit">SIGN UP</button>' +
                                      '</form>' +
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
  });

  // sign in modal
  $("#sign-in").click(function() {
    $(".navbar-nav").append('<div id="sign-in-modal" class="modal fade"   tabindex="-1"role="dialog">' +
                                '<div class="modal-dialog">' +
                                  '<div class="modal-content">' +
                                    '<div class="modal-header">' +
                                      '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                      '<h4 class="modal-title">Create a new account</h4>' +
                                    '</div>' +
                                    '<div class="modal-body">' +
                                      '<span id="login-fail text-danger"></span>' +
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
    var drivername = $("#ride-driver").val();
    var locationFrom = $("#ride-from").val();
    var to = $("#ride-to").val();
    var date = $("#ride-date").val();
    var time = $("#ride-time").val();
    var price = parseInt($("#ride-price").val());
    var seats = parseInt($("#ride-seats").val());
    var newRide = new Ride(locationFrom, to, date, time, seats, price);
    newRide.addDriver(drivername, allUsers);
    newRide.driver[0].id = 0;
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

  $("#signup").click(function(){
    $("#register").click();
  });

// Login
  $(".navbar-nav").on("click","#sign-in-submit",function(event) {
    var signInUsername = $("#sign-in-username").val();
    var signInPassword = $("#sign-in-password").val();
    console.log(signInUsername,signInPassword);
    var loginResult = login(allUsers, signInUsername,signInPassword);
    if (loginResult){
      currentUser = loginResult;
      $("form").trigger("reset");
      $("#sign-in-modal").modal('hide');
      $(".new-user-screen").show();
      //Greet user and open user homepage
    }else{
      $("#login-fail").text("wrong username and/or password.");
    }
    console.log(currentUser);
  });

// Join ride
  $("#ride-list").on("click",".join-ride",function () {
    var rideId = this.id;
    if(allRides.rides[rideId].addRider(currentUser)){
      $("#ride-list").empty();
      $("#ride-list").append(displayRides(allRides.listRides()));
      $("#warning").text("you are now on this ride!!");
    }else{
      $("#ride-list").empty();
      $("#ride-list").append(displayRides(allRides.listRides()));
      $("#warning").text("Sorry! this ride is full.");
    }
    // console.log(res);
  });

// Display driver info
  $("#ride-list").on("click",".driver-name",function () {
    var driverId = this.id;
    $("#ride-list").append(displayUserInfo(allUsers[driverId]));
  });

  $("#ride-from").on("change",function () {
    var rideFrom = $("select#ride-from :selected").text();
    $("#ride-to").empty();
    $("#ride-to").append(listCities(rideFrom));
  })

  $("#ride-to").on("change",function () {
    var rideTo = $("select#ride-to :selected").text();
    $("#ride-from").empty();
    $("#ride-from").append(listCities(rideTo));
  })

});// End document.ready
