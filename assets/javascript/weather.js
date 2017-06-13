$(document).ready(function(){
$("#submit").on("click", function(event){
   
   event.preventDefault();

  var city = $("#cityBox").val().trim();
  // var state = $("#stateBox").val().trim();
  // var zip = $("#zipCodeBox").val().trim();




// var APIKey = "c9ee36ba897d868b170f5fd2f02c16b6";

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=166a433c57516f51dfab1f7edaed8413"; 

//var paramenters = 

$.ajax({
      url: queryURL,
      method: "GET",
      dataType: 'json'
      
      // dataType: 'json'

    }).done(function(response){
      console.log(response);
        $("#loca").html("<p class='weatherInfo'>" + "Location:  " + "</p>" + response.name);
        $("#wind").html("<p class='weatherInfo'>" + "Wind (MPH):  " + "</p>" + response.wind.speed);
        $("#hum").html("<p class='weatherInfo'>" + "Humidity:  " + "</p>" + response.main.humidity);
        $("#temp").html("<p class='weatherInfo'>" + "Temperature (F):  " + "</p>" + response.main.temp);
        $("#main").html("<p class='weatherInfo'>" + "Current Weather:  " + "</p>" + response.weather["0"].main);
        $("#description").html("<p class='weatherInfo'>" + "Description:  " + "</p>" + response.weather["0"].description);


        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);

     console.log(response.name);


    })

function reset(){
  
        $("#cityBox").val("");
         
        $("#stateBox").val("");
    
        $("#zipCodeBox").val("");
        
          
        $("#radiusBox").val("");
      
        $("#startDate").val("");

          
        $("#activityBox").val("");
    
        $("#searchResults").html("")

        $("#loca").html("")

        // $("#weatherResults").html("");

}

reset();



    

    });







});



