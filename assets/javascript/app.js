
	
$(document).ready(function(){

	//declare variables
	var bounds = new google.maps.LatLngBounds();

	$("#submit").on("click", function(event){
		event.preventDefault();

			    var city = "";
	        var state = "";
	        var zip= "";
	        var radius = "";
	        var date = "";

	        city = $("#cityBox").val().trim();
	        console.log(city);
	        state = $("#stateBox").val().trim();
	        console.log("state " + state);
	         zip = $("#zipCodeBox").val().trim();
	        console.log("zip " + zip);
	        
	        radius = $("#radiusBox").val().trim();
	        console.log("radius " + radius);
	        date = $("#startDate").val().trim();

	        console.log("date " + date);
	        
	        activity = $("#activityBox").val();
	        console.log("activty " + activity);



      var parameters = $.param({
            api_key : "9jcmruut6uygxzfd399dh5bd",
            query : activity,
            category: "event",
            state: abbrState(state),
            radius: radius,
            // per_page:"1",
            start_date: "2017-06-11..",
            zip: zip,
        });

      abbrState();

      


	$.ajax({
	    url: "https://active-access-app.herokuapp.com/v2/search?" + parameters,
	    type: 'GET',
	    dataType: 'json'
	}).done(function(serverResponse){
	    console.log(serverResponse);

	   for(var i=0; i<10; i++){

	    console.log(serverResponse.results[i].place.placeName);
	    console.log(serverResponse.results[i].place.addressLine1Txt);
	    console.log(serverResponse.results[i].place.cityName);
	    console.log(serverResponse.results[i].assetName);
		  console.log(serverResponse.results[i].activityStartDate);
	   	
		
	   	var assetName = $("<div class='bColor'>");
	    assetName.html("<p>" + "<span class='activityInfo'>" + "Event Name:  " + "</span>" + serverResponse.results[i].assetName + "</p>");
	    $("#searchResults").append(assetName);
	    
      var placeName = $("<div class='bColor'>");
	    placeName.html("<p>" + "<span class='activityInfo'>" + "Place Name:  " + "</span>" + serverResponse.results[i].place.placeName + "</p>");
	    $("#searchResults").append(placeName);
	    
       var address = $("<div class='bColor'>");
	    address.html("<p>" + "<span class='activityInfo'>" + "Address:  " + "</span>" + serverResponse.results[i].place.addressLine1Txt + "</p>");
	    $("#searchResults").append(address);
    	
      var cityName = $("<div class='bColor'>");
	    cityName.html("<p>" + "<span class='activityInfo'>" + "City:  " + "</span>" + serverResponse.results[i].place.cityName + "</p>");
	    $("#searchResults").append(cityName);
	   	
      var startDate = $("<div class='bColor'>");
	    startDate.html("<p>" + "<span class='activityInfo'>" + "Start Date:  " + "</span>" + serverResponse.results[i].activityStartDate + "</p>");
	    $("#searchResults").append(startDate);
	    // var image = $("<img>");
	    // image.attr("src", serverResponse.results[i].logoUrlAdr);
	    // $("#searchResults").append(image);
	    var siteURL = $("<div class='bColor'>");
	    siteURL.html("<p>" + "<span class='activityInfo'>" + "Website:  " + "</span>" + serverResponse.results[i].homePageUrlAdr + "</p>");
	    $("#searchResults").append(siteURL);
	    
      var urlB = $("<div class='bColor'>");
      urlB.html("<p>" + "<span class='activityInfo'>" + "Website:  " + "</span>" + serverResponse.results[i].registrationUrlAdr + "</p>");
	    $("#searchResults").append(urlB);
		  
      var divDivider = $("<div id='border'>");
		  $("#searchResults").append(divDivider);
	}




	        
	    // console.log(response.results[1].place.placeName);

	    for(var i=0; i<serverResponse.results.length; i++){

	    	//convert lat lan string from server reponse to lat lng decimals
	    	//google maps lat lng object literal
	    	latitude= parseFloat(serverResponse.results[i].place.geoPoint.lat);
	    	longitude= parseFloat(serverResponse.results[i].place.geoPoint.lon);
	    	console.log(latitude)
	    	console.log(longitude)

	    	//locations object will have stored the lat and long value in decimals
	    	//so that we can use google maps to map it with a marker
	    	locationsObj["location"+i] = {lat: latitude, lng: longitude}

	    	//content is what will be displayed in the marker infoWindow
	    	content= '<h3>' + serverResponse.results[i].assetName + "</h3>";

	    	//extends the bounds of the map with the coordinate
    	 	bounds.extend(locationsObj["location"+i]);
    	 	//positions the map so that it fits that bound/marker
            map.fitBounds(bounds);

	    	marker[i]= new google.maps.Marker({
	    		position: locationsObj["location"+i],
	    		map: map
	    	})

	    	infoWindow =  new google.maps.InfoWindow({
	    		content: content,
	    		position: locationsObj["location"+i]
	    	})


	    	google.maps.event.addListener(marker[i],'click', (function(marker,content,infoWindow){ 
                return function() {
                    infoWindow.close();
                    infoWindow.setContent(content);
                    infoWindow.open(map,marker);
                };
            })(marker[i],content,infoWindow));   
	    }	



	    console.log(locationsObj)
	})

});//ends submit function

});//ends document.ready





	function abbrState(input, to){
    
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    if (to == 'abbr'){
        input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        for(i = 0; i < states.length; i++){
            if(states[i][0] == input){
                return(states[i][1]);
            }
        }    
    } else if (to == 'name'){
        input = input.toUpperCase();
        for(i = 0; i < states.length; i++){
            if(states[i][1] == input){
                return(states[i][0]);
            }
        }    
    }
}



$("#button").on("click", function(){
	event.preventDefault();

	var city=$("#cityBox").val().trim();
	var state= $("#stateBox").val().trim();
	var radius= $("#radiusBox").val().trim();
	var activity= $("#activityBox").val().trim();
	// console.log(city);

	// $.ajax({
	// url: url, // The URL to the API. You can get this in the API page of the API you intend to consume
	// method: "GET"
	// }).done(function(response){
	// 	console.log(response);
	// })

	

});

var parameters = $.param({
	api_key : "9jcmruut6uygxzfd399dh5bd",
	query : "running",
	category: "event",
	state: "CA",
	radius: "50",
	per_page:"1",
	start_date: "2017-06-09.."
})	

$.ajax({
	    url: "https://active-access-app.herokuapp.com/v2/search?" + parameters,
	    type: 'GET',
	    // /	/ data: {
	   		
	    // // }, 
	    dataType: 'json'

    }).done(function(response){
    	console.log(response);
    })

function logIt(response){
	debugger;
	console.log(response);
}


function reset(){
  
        $("#cityBox").val("");
         
        $("#stateBox").val("");
    
        $("#zipCodeBox").val("");
        
          
        $("#radiusBox").val("");
      
        $("#startDate").val("");

          
        $("#activityBox").val("");
    
        $("#searchResults").html("")

}
reset();


