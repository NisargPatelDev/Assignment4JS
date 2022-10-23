/*
    Assignment #4
    {Nisarg Patel}
*/

$(function () {
    // your code here
    var globalLat ="";
    var globalLong ="";
    getLocation();
    
    function Decicer(){
        var data = localStorage.getItem("location");
        var location = data.split(",");
        location[0] = location[0].replace("[","");
        location[1] = location[1].replace("]","");
        location[0] = parseFloat(location[0]);
        location[1] = parseFloat(location[1]);
        if(location[0]==null && location[1]==null)
        {
            var html=`<p>Your Location in the world</p>
            <p>Latitiude : ${globalLat}</p>
            <p>Longitude : ${globalLong}</p>
            `
            var locationArr = [];  
            locationArr.push(globalLat);
            locationArr.push(globalLong);
            localStorage.setItem('location', JSON.stringify(locationArr)); 
            $('#locationhere').html(html);

        }
        else{
            var distance = calcDistanceBetweenPoints(location[0],location[1],globalLat,globalLong);
            var html=`<p>Welcome Back!<p>
                     <p>Dsiatnce between your last location and current loction is = ${distance}</p>
            `
            $('#locationhere').html(html);

        }
    }
   
    
    function getLocation(){
       
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
          } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
          }

          function showPosition(position) {
            globalLat= position.coords.latitude;
            globalLong= position.coords.longitude;
            Decicer();
        }
       
    }

    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});




Assignment4JS