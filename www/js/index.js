/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },


    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        navigator.geolocation.getCurrentPosition(onSuccess, onError);   
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);


    }



};
//document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
//
//function onDeviceReady() {
    
//}

// onSuccess Geolocation
//
function onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: ' + position.coords.latitude + '<br />' +
                            'Longitude: ' + position.coords.longitude + '<br />' +
                            'Altitude: ' + position.coords.altitude + '<br />' +
                            'Accuracy: ' + position.coords.accuracy + '<br />' +
                            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br />' +
                            'Heading: ' + position.coords.heading + '<br />' +
                            'Speed: ' + position.coords.speed + '<br />' +
                            'Timestamp: ' + position.timestamp + '<br />';
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('geo error code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
}

function getBearing(latlng1,latlng2) {
    //alert(latlng2);
    var bearing = google.maps.geometry.spherical.computeHeading(latlng1, latlng2);
    var dist = google.maps.geometry.spherical.computeDistanceBetween(latlng1, latlng2);
    //alert(bearing);
    dist = Math.round(parseInt(dist));
    bearing = Math.round(parseInt(bearing));
    if (bearing < 0) {
        bearing = calcBearing(bearing);
    }
    $('#result2').append(bearing + " " + dist + " <br />");
}

function calcBearing(val) {
    var valx = Math.abs(parseInt(val));
    return (180 - valx) + 180;

}

function decodepoly(polyline) {
    var top = "<ul class=\"table-view\">";
    var latlong = "ll";
    var html = "<li class=\"table-view-cell\"><a class=\"navigate-right\">" + latlong + "</a></li>";
    latlong = google.maps.geometry.encoding.decodePath(polyline);
    var myStringArray = latlong;
    var arrayLength = myStringArray.length;
    for (var i = 0; i < arrayLength; i++) {
        //getBearing(myStringArray[i].lat(),myStringArray[i].lng());
        getBearing(myStringArray[i], myStringArray[i+1]);
        //var lat = myStringArray[i];
        //$('#result2').html(lat);
//        alert(myStringArray[i].lng());
        //Do something
        //getLat(myStringArray[i]);
    }
    
    //$('#result1').append(latlong);

}

function getWeather() {

    $('#data_status').html("Loading ...");

    OAuth.initialize("7ZbKkdtjRFA8NVkn00ka1ixaIe8");

    $('#fb-connect').on('click', function () {
        res = OAuth.create('strava');
        //res.me().done(function (me) {
        //    alert('Hello ' + me.name);
        //}).fail(function (err) {
        //todo when the OAuth flow failed
        // });


        //res.get('https://www.strava.com/api/v3/athlete').done(function (data) {
        res.get('https://www.strava.com/api/v3/activities').done(function (data) {
            //https: //www.strava.com/api/v3/activities
            //todo with data
            //alert('Athlete ' + data.lastname);
            var jsontext = JSON.stringify(data);
            $('#data_status').append(jsontext);
            var ext = data[0]['map']['summary_polyline'];
            decodepoly(ext);
            //var location = json['location']['city'];
            $('#result1').append(ext);
            
        }).fail(function (err) {
            //todo with err
            alert("fail");
        });
        //    r.get('').done(function (data2) {

    });

    $('#tw-connect').on('click', function () {
        $('#result').html("try location");
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
       });

    $('#st-connect').on('click', function () {
        $('#result').html("connecting ...");
        //OAuth.popup('twitter', {cache: true}).done(function(twitter) {
        OAuth.popup('strava', {cache: true}).done(function (r) {
            // the access_token is available via r.access_token
            // but the http functions automagically wrap the jquery calls
            r.get('/oauth/authorize')
                .done(function (data) {
                    $('#result').html("strava: Hello");
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    $('#result').html("req error: " + textStatus + r.access_token);
                                   
                });
        })
        .fail(function (e) {
            $('#result').html('error: ' + e.message);
        });
    });

}

function testStrava() {
    var at = "9804cb4fa1ba1227de591a28200ba9da0bb3ca74"
    $.ajax({
        type: "GET",
        url: "https://www.strava.com/api/v3/athlete/activities?per_page=1&access_token=" + at + "&callback=?",
        //56.052,-2.732
        //url: "json.txt",
        //dataType: "html",
        dataType: "jsonp",
        success: function (json) {
            //var jsontxt = eval('(' + json + ')');

            var jsontext = JSON.stringify(json);
            //var location = json['location']['city'];
            $('#data_status').append(jsontext);

        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);
        },
        complete: function () {
            //load weather

        }

    });

}



function getWeather2() {
    alert("here9");
   
    var loc = "56.052,-2.732";
            $.ajax({
            type: "GET",
            url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + loc + ".json",
            //56.052,-2.732
            //url: "json.txt",
            //dataType: "html",
            dataType: "jsonp",
            success: function(json) {
                //var jsontxt = eval('(' + json + ')');

                var jsontext = JSON.stringify(json);
                var location = json['location']['city'];
                $('#data_status').append("<br /> Location from data local new " + location);

                var epoch = Math.round(new Date().getTime() / 1000)
                var timenow = new Date();
                var hour_now = timenow.getHours();
                var minute_now = timenow.getMinutes();
                var today = timenow.getDate();

                
           
            },
            error: function(xhr, error) {
                console.debug(xhr); console.debug(error);
            },
            complete: function() {
                //load weather

            }

        });

}


$(document).on('deviceready', function () {
                });

