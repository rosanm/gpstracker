var url = "http://localhost:4730/";
var x = document.getElementById("message");
var lat = "";
var long = "";
var name = "";

getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
}

function create() {
   name = $("#input-name").val();

    var group = { name: name, location: { long: long, lat: lat } };

    $.ajax({
        type: "POST",
        url: url + "api/group/create",  // Send the login info to this page
        data: { name: name, lat: lat, long: long },
        success: function (data) {
            if (data) {
                alert('welkom!');
                $(".toggle").toggle();
            }
            else {
                alert('naam bestaat al :(');
            }
        }
    });
}

function update() {
    getLocation();

    $.ajax({
        type: "POST",
        url: url + "api/location/update",  // Send the login info to this page
        data: { name: name, lat: lat, long: long },
        success: function (data) {
            if (data) {
                alert('locatie is verstuurd!');
            }
            else {
                alert('probeer opnieuw');
            }
        }
    });
}