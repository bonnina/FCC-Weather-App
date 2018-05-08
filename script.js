$(function(){
  // initial background
  $(".container-fluid").css({
  'background-image' : 'url(https://images.unsplash.com/photo-1463569643904-4fbae71ed917?auto=format&fit=crop&w=750&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D)'
   });
  
  var latitude, longitude, link, cel, i;
  
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        weather(latitude, longitude); 
      },
      function (error) {
         $(".weather").css({'background-color' : 'rgba(236,	217, 198, 0.65)'});
         $("#temp").text("No access to location data");
      }, 
       {timeout: 7000}
   );
  }
   else { 
     $("#temp").text("No access to location data");
   }
  
 // toggle weather scales
  $(".btn").click(function() {
     if(i == "C") {
         $(".btn").text("switch to °C");
        // alert(cel);
         $("#temp").text("Temperature: " + Math.round(cel * 9 / 5 + 32) + "°F")
         i = "F";
     }
     else {
         $(".btn").text("switch to °F");
         $("#temp").text("Temperature: " + cel + "°C")
         i = "C";
     }
  });
  
 // make it responsive to screen orientation
  if (screen.orientation.type === "portrait-secondary" || screen.orientation.type === "portrait-primary") {
    $(".container-fluid").css({
  'background-image' : 'url(https://images.unsplash.com/photo-1491847523371-3f1a9cb4b93b?auto=format&fit=crop&w=334&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D)'
   }); 
   $(".btn").removeClass("btn-md").addClass("btn-xs");   
   $(".weather").css({'height' : '110vw'});
   $("h1").css({'font-size' : '17vw'});
   $("p").css({'font-size' : '8vw'});
   $(".btn").css({'font-size' : '4vw'});
  } 
  
  function backgr(sky) {
    var pictures = {
      "Clouds" : "url(https://images.unsplash.com/photo-1452022449339-59005948ec5b?auto=format&fit=crop&w=750&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D)",
      "Snow" : "url(https://images.unsplash.com/photo-1495248449765-7ec3db458549?auto=format&fit=crop&w=750&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D)",
      "Rain" : "url(https://images.unsplash.com/photo-1495389948407-1a7dfe01c1c2?auto=format&fit=crop&w=750&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D)",
      "Sun" : "url(https://images.unsplash.com/photo-1507501326444-8e4682fa9c6d?auto=format&fit=crop&w=751&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D)",
      "Clear" : "url(https://images.unsplash.com/photo-1421878615130-7c5243914117?auto=format&fit=crop&w=750&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D)",
      "Fog" : "url(https://images.unsplash.com/photo-1487621167305-5d248087c724?auto=format&fit=crop&w=889&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D)"
    };
  
    $(".container-fluid").css({'background-image' : pictures[sky]});
  }
  
  function weather(latitude, longitude) {
      link = "https://fcc-weather-api.glitch.me/api/current?lon=" + longitude + "&lat=" + latitude; 
     
    fetch(link)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
           cel = Math.round(data.main["temp"]);
           i = "C";
           backgr (data.weather[0]["main"], cel);
           $(".weather").css({'background-color' : 'rgba(236,	217, 198, 0.65)'});
           $(".btn").show(); 
           $("#city").text(data.name);
           $("#temp").text("Temperature: " + cel + "°C")
           $("#img").attr("src", data.weather[0]["icon"]);
           $("#sky1").text(data.weather[0]["main"]);
           $("#sky2").text(data.weather[1]["main"]);
      })
      .catch(function(error) {
        console.log(error.message);
      });
  }
})
