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
      $("#map").append('<iframe width="450" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q='+lat+'+'+lng+'&amp;aq=&amp;vpsrc=0&amp;ie=UTF8&amp;t=m&amp;z=14&amp;output=embed"></iframe>');
      get_shouts();
    },
    function(){
      $("#yes-location").hide();
      $("#no-location").show();
    }
  );
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
      var shout_div = $('<div class="single-shout"><h3>' + new_shout.author + '</h3><p>' + new_shout.message + '</p></div>');
      $("#view").prepend(shout_div);
      
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

function get_shouts() {
  $.get("/api/shouts/get", { lat: lat, lng: lng }, function(data) {
    var shouts = $.parseJSON(data);
    for(i in shouts) {
      var shout_div = $('<div class="single-shout"><h3>' + shouts[i].author + '</h3><p class="coords">(' + shouts[i].lat + ', ' + shouts[i].lng + ')</p><p class="message">' + shouts[i].message + '</p></div>');
      $("#view").prepend(shout_div);
    }
  })
}