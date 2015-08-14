var groups = [];
var url = "http://localhost:4730/";
getGroups();

function getGroups() {
    $.ajax({
        type: "GET",
        url: url + "api/group/findAllGroups",  // Send the login info to this page
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                groups.push(data[i]);
                initLayout();
                if(data[i].location)
                    showPosition(data[i].location, data[i].name);
            }          
        }
    });
}

function initLayout() {
    var content = $("#content");
    var section = $('<section>').appendTo(content);
    section.addClass("row");

    var article1 = $("<article>").appendTo(section);
    article1.addClass("col-sm-6");
    var namePlaceholder1 = $("<div>").appendTo(article1);
    var locationPlaceholder1 = $("<div>").appendTo(article1);
    var mapWrapper1 = $("<div>").appendTo(article1);
    namePlaceholder1.addClass("name-placeholder");
    locationPlaceholder1.addClass("location-placeholder");
    mapWrapper1.addClass("map-wrapper");

    var article2 = $("<article>").appendTo(section);
    article2.addClass("col-sm-6");
    var namePlaceholder2 = $("<div>").appendTo(article2);
    var locationPlaceholder2 = $("<div>").appendTo(article2);
    var mapWrapper2 = $("<div>").appendTo(article2);
    namePlaceholder2.addClass("name-placeholder");
    locationPlaceholder2.addClass("location-placeholder");
    mapWrapper2.addClass("map-wrapper");
}

function getPositionFromGroups() {
    if (groups.length >= 1) {
        for (var i = 0; i < groups.length; i++) {
            getPosition(groups[i].name);
        }
    }
}

function getPosition(name) {
    $.ajax({
        type: "GET",
        url: url + "api/location/" + name,  // Send the login info to this page
        success: function (data) {
            if(data.location)
                showPosition(data.location, data.name);
        }
    });
}

function showPosition(location, name) {
    var lat = location.lat;
    var long = location.long;
    var latlon = new google.maps.LatLng(lat, long);

    var wrapper = findEmptyWrapper();
    var nameWrapper = wrapper.parentElement.children[0];
    nameWrapper.innerHTML = name;
    var locationWrapper = wrapper.parentElement.children[1];
    locationWrapper.innerHTML = "lat: " + lat + " long: " + long;
    var mapholder = wrapper;
    mapholder.style.height = '250px';
    mapholder.style.width = '100%';

    var myOptions = {
        center: latlon, zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }
    }

    var map = new google.maps.Map(mapholder, myOptions);
    var marker = new google.maps.Marker({ position: latlon, map: map, title: "You are here!" });
}

function findEmptyWrapper() {
    var wrappers = $('.map-wrapper');
    for (var i = 0; i < wrappers.length; i++) {
        if(wrappers[i].innerHTML == "")
        {
            return wrappers[i];
        }
    }
    return null;
}