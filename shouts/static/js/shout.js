var lat, lng;

$(function() {
  get_location();
  shout_init();
});

function get_location() {
  navigator.geolocation.getCurrentPosition(
    function(pos){
      lat = pos.coords.latitude;
      lng = pos.coords.longitude;
      new_map(lat, lng);
      get_shouts(lat, lng, $("#radius").val());
      radius_init();
    },
    function(){
      $("#yes-location").hide();
      $("#no-location").show();
    }
  );
}

function new_map(lat,lng) {
  var prev_map = $("#map img");
  prev_map.css("z-index",2);
  
  var new_map = $('<img width="450" height="350" src="http://maps.google.com/maps/api/staticmap?sensor=false&center='+lat+','+lng+'&zoom=14&size=450x350&markers=color:blue|label:S|'+lat+','+lng+'" />').css("x-index",1);
  
  $("#map").append(new_map);
  prev_map.fadeOut();
}

function shout_init() {
  $("#shout").submit(function() {
    var author = $("#author");
    var message = $("#message");
    
    if (!author.val()) {
      form_error(author, "Please enter your name!");
      return false;
    } else if (!message.val()) {
      form_error(message, "Please enter a message!");
      return false;
    } else {
      $(".error").hide();
    }
    
    $.post("/api/shouts/new", { lat: lat, lng: lng, author: author.val(), message: message.val() }, function(data) {
      var new_shout = $.parseJSON(data);
      add_shout(new_shout);
      
      message.val('');
      message.focus();
    });
    
    return false;
  });
}

function form_error(input, message) {
  $(".error").html(message);
  $(".error").show();
  input.focus();
}

function radius_init() {
  $("#update_radius").submit(function() {
    var radius = $("#radius").val();
    if (radius) {
      get_shouts(lat, lng, radius);
    }
    return false;
  })
}

function get_shouts(lat, lng, radius) {
  $.get("/api/shouts/get", { lat: lat, lng: lng, radius: radius }, function(data) {
    var shouts = $.parseJSON(data);
    $("#shouts").empty();
    for(i in shouts) {
      add_shout(shouts[i]);
    }
  })
}

function add_shout(shout) {
  var shout_div = $('<div class="single-shout"><div class="shout-header"><h3>' + shout.author + '</h3></div><div class="shout-info"><p class="date">' + shout.date_created + '</p><p class="coords">(' + shout.lat + ', ' + shout.lng + ')</p></div><div style="clear:both;"></div><p class="message">' + shout.message + '</p></div>');
  $("#shouts").prepend(shout_div);
  
  shout_div.click(function() {
    new_map(shout.lat,shout.lng);
  })
}