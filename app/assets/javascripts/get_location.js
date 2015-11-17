var latitude = 0;
var longitude = 0;

function get_location(){
  navigator.geolocation.watchPosition(function(position){

       latitude = position.coords.latitude;
       longitude = position.coords.longitude;


      console.log(latitude, longitude);


      $('.row').each(function(){
        var id = $(this).attr('class')[0];
        var des_lat = $(this).find('span.lat').text();
        var des_lng = $(this).find('span.long').text();

        var distance = distance2(latitude, longitude, des_lat, des_lng);
        switcher(distance,id);
      })

      $('span.current_lat').text(latitude)
      $('span.current_long').text(longitude)


  initMap();
    });

}

function distance2(lat_1, long_1, lat_2, long_2){

    var R = 6371000; // meters
    var x1 = lat_2 - lat_1;
    var d_lat = x1 * Math.PI / 180;
    var x2 = long_2 - long_1;
    var d_lng = x2 * Math.PI / 180;

    var a = Math.sin(d_lat/2) * Math.sin(d_lat/2) +
            Math.cos(lat_1 * Math.PI / 180) * Math.cos(lat_2 * Math.PI / 180) *
            Math.sin(d_lng/2) * Math.sin(d_lng/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    return d //* 0.62137
};

function switcher(distance, id){

  if(distance < 100){
    $('.'+id+' span.distance').text("HERE!");
    $('.'+id).addClass("bg-success");
    $('.'+id).removeClass("bg-warning");
    $('.'+id).removeClass("bg-danger");
    $('.'+id+' .description').css("display", "inline");
  }
  else if(distance < 805){
    $('.'+id+' span.distance').text("< .5 miles");
    $('.'+id).addClass("bg-success");
    $('.'+id).removeClass("bg-warning");
    $('.'+id).removeClass("bg-danger");
    $('.'+id+' .description').css("display", "inline");
  }
  else if(distance <= 1600){
    $('.'+id+' span.distance').text("< 1 mile");
    $('.'+id).addClass("bg-warning");
    $('.'+id).removeClass("bg-success");
    $('.'+id).removeClass("bg-dnager");
  }
  else if(distance < 2500){
    $('.'+id+' span.distance').text("< 1.5 miles");
    $('.'+id).addClass("bg-danger");
    $('.'+id).removeClass("bg-warning");
    $('.'+id).removeClass("bg-success");
  }
  else if(distance < 3218){
    $('.'+id+' span.distance').text(" < 2 miles");
    $('.'+id).removeClass("bg-warning");
    $('.'+id).removeClass("bg-danager");
    $('.'+id).removeClass("bg-success");
  }
  else{
    $('.'+id+' span.distance').text(" > 2 miles");
    $('.'+id).removeClass("bg-warning");
    $('.'+id).removeClass("bg-danager");
    $('.'+id).removeClass("bg-success");
  }

};


var map;
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: latitude, lng: longitude},
    zoom: 14
  });

  $('.row').each(function(){

    var id = $(this).attr('class')[0];
    var des_lat = Number($(this).find('span.lat').text());
    var des_lng = Number($(this).find('span.long').text());
    var loc_name = $(this).find('span.city-name').text();

    var marker = new google.maps.Marker({
    position: {lat: des_lat, lng: des_lng},
    map: map,
    title: loc_name
  });

  })
  var marker = new google.maps.Marker({
    position: {lat: latitude, lng: longitude},
    map: map,
    title: 'ME!'
  });

}