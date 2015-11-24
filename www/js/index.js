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
    alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
}

function checkData() {
    
    if (localStorage.getItem("segdata") === null) {
    //alert("no data");
    $('#settings').show();
        getWeather();
    } else {
    //alert("data");
        //$('#settings').hide();
        getWeather();
        
    }


}

function getAct() {
    $('#main_menu').hide();
    drawTable();
}

function getNearby() {
    
    $('#main_menu').hide();
    $('#seg_nearby').show();
    // getSegsbyBounds();
    showmap();
}

function drawTable() {
    $('#act_table').show();
    var top = "<ul class=\"table-view\">";
    var json = localStorage.getItem('segdata');
    var j2 = eval('(' + json + ')');
    var midhtml = "";
    $.each(j2.segs, function (i, seg) {
        midhtml = midhtml + "<li class=\"table-view-cell\" onclick=\"poly2(" + i + ",'" + seg.name + "')\">" + seg.name + " (" + seg.dist + ")<span class=\"badge\">4</span></li>";
       // alert("i=" + i + "   " + seg.poly);
    });
    //alert(midhtml);

    $('#act_table').html(top + midhtml + "</ul>");

}


function getWeather() {

var strava_segs = {
    segs: []
};

var strava_deets = {
    deets: []
};
    $('#data_status').html("Loading ...");

    OAuth.initialize("7ZbKkdtjRFA8NVkn00ka1ixaIe8");

    $('#fb-connect').on('click', function () {
        res = OAuth.create('strava');
       

        //res.get('https://www.strava.com/api/v3/athlete').done(function (data) {
        res.get('https://www.strava.com/api/v3/activities').done(function (data) {
            //https: //www.strava.com/api/v3/activities
            //todo with data
            //alert('Athlete ' + data.lastname);
            var jsontext = JSON.stringify(data);
            var midhtml = "";

            $.each(data, function (i, seg) {
                strava_segs.segs.push({
                    "name": data[i]['name'],
                    "poly": data[i]['map']['summary_polyline'],
                    "dist": data[i]['distance'],
                    "egain": data[i]['total_elevation_gain']
                });
                //     var name = data[i]['name'];
                // alert(name);
                //       midhtml = midhtml + "<li class=\"table-view-cell\" onclick=\"poly1()\">" + name + "<span class=\"badge\">4</span></li>";
            });
            var jsonsegs = JSON.stringify(strava_segs);
            localStorage.setItem('segdata', jsonsegs);

            drawTable();
            //$('#result3').html(eval('(' + strava_segs + ')'));

        }).fail(function (err) {
            //todo with err
            alert("fail");
        });
        //    r.get('').done(function (data2) {

    });

    $('#nearby').on('click', function () {
        res = OAuth.create('strava');
         //res.get('https://www.strava.com/api/v3/athlete').done(function (data) {
          //alert('Athlete ' + data.lastname);
        res.get('https://www.strava.com/api/v3/segments/explore?bounds=37.821362,-122.505373,37.842038,-122.465977').done(function (data) {
            var jsondeets = JSON.stringify(data);
          //  localStorage.setItem('segdata', jsondeets);
      //      alert(jsondeets);
            //drawTable();
            //$('#result3').html(eval('(' + strava_segs + ')'));

        }).fail(function (err) {
            //todo with err
          //  alert("fail");
        });
        //res.me().done(function (me) {
        //    alert('Hello ' + me.name);
        //}).fail(function (err) {
        //todo when the OAuth flow failed
        // });
        //res.get('https://www.strava.com/api/v3/athlete').done(function (data) {
        //res.get('https://www.strava.com/api/v3/segments/explore?bounds=37.821362,-122.505373,37.842038,-122.465977').done(function (data) {
        //res.get('https://www.strava.com/api/v3/activities?id=421422146', { data: { id: 421422146} }).done(function (data) {
        //works: res.get('https://www.strava.com/api/v3/segments/explore', { data: { bounds: '37.821362,-122.505373,37.842038,-122.465977'} }).done(function (data) {
            //https: //www.strava.com/api/v3/segments/explore
//            result.post('/message', {
  //              data: {
    //                user_id: 93,
      //              content: 'Hello Mr. 93 !'
        //        }
        //    })


       // res.get('https://www.strava.com/api/v3/athlete').done(function (data) {
            //
            //todo with data
            
         //   var jsontext = JSON.stringify(data);
            //       var midhtml = "";
            //alert(jsontext);
            //      $.each(data, function (i, seg) {
            //          strava_segs.segs.push({
            //              "name": data[i]['name'],
            //              "poly": data[i]['map']['summary_polyline']
            //          });
            //     var name = data[i]['name'];
            // alert(name);
            //       midhtml = midhtml + "<li class=\"table-view-cell\" onclick=\"poly1()\">" + name + "<span class=\"badge\">4</span></li>";
            //   });
            //   var jsonsegs = JSON.stringify(strava_segs);
            //   localStorage.setItem('segdata', jsonsegs);

            //   drawTable();
            //$('#result3').html(eval('(' + strava_segs + ')'));

        //}).fail(function (err) {
            //todo with err
         //   alert("fail2");
       // });
        //    r.get('').done(function (data2) {

    });


    $('#tw-connect').on('click', function () {
        $('#result').html("");
        OAuth.popup('twitter')
                        .done(function (r) {
                            // the access_token is available via r.access_token
                            // but the http functions automagically wrap the jquery calls
                            r.get('/1.1/account/verify_credentials.json')
                                .done(function (data) {
                                    $('#result').html("twitter: Hello, " + data.name + " !");
                                })
                                .fail(function (jqXHR, textStatus, errorThrown) {
                                    $('#result').html("req error: " + textStatus);
                                });
                        })
                        .fail(function (e) {
                            $('#result').html('error: ' + e.message);
                        });
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



$(document).on('deviceready', function () {
                });

