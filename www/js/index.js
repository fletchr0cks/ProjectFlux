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
    $('#status_msgs').append("no data");
    //$('#settings').show();
        initBtns();
    } else {
        //alert("data");
        var data = localStorage.getItem("segdata");
        $('#status_msgs').append("data </br> " + data);
        //$('#settings').hide();
        initBtns();

    }

    res = OAuth.create('strava');
    if (res == false) {
        $('#status_msgs').append("</br > Not connected to Strava");
        $('#strava_login').show();
        $('#main_menu').hide();
    } else {
        $('#main_menu').show();
        $('#status_msgs').append("</br > Connected to Strava");
        $('#get_activities').show();
    }

    getW();



}

function getAct() {
    $('#main_menu').hide();
    $('#get_activities').hide();
    $('#status_msgs').hide();
    drawTable();
}

function getNearby() {
    //$('#status_msgs').hide();
    $('#get_activities').hide();

    res = OAuth.create('strava');
    if (res == false) {
        $('#status_msgs').append("</br > Not connected to Strava");
        $('#strava_login').show();
    } else {
        $('#main_menu').hide();
        $('#seg_nearby').show();
        // getSegsbyBounds();
        showmap();

    }
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

function stConn2() {
    $('#status_msgs').show();
    $('#status_msgs').append("</br > Connecting to Strava ...");
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8')
    OAuth.popup('strava', { cache: true }).done(function (result) {
        console.log(result)
        $('#status_msgs').append("</br > " + result);
        result.me().done(function (data) {
            // do something with `data`, e.g. print data.name
            $('#status_msgs').append("</br > " + data.lastname);
        })
        // do some stuff with result
    })


}

function stTest2() {
    $('#status_msgs').show();
    $('#status_msgs').append("</br > testing ...");
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');
    OAuth.popup('strava', { cache: true }).done(function (result) {
        result.get('https://www.strava.com/api/v3/activities').done(function (data) {
            $('#status_msgs').append("</br > " + result);
            var jsontext = JSON.stringify(data);
            $('#status_msgs').append("</br > " + jsontext);
        })
        // do some stuff with result
    });


}

function clearCache() {
    $('#status_msgs').show();
    $('#status_msgs').append("<br/> clearing ...");
    //  OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');
    OAuth.clearCache();

    showLocal();
}

function showLocal() {
    $('#status_msgs').show();
    for (var i = 0; i < localStorage.length; i++) {
        $('#status_msgs').append("</br > " + localStorage.key(i));

        // do something with localStorage.getItem(localStorage.key(i));
    }

    $('#status_msgs').append("</br > st: " + localStorage.getItem('oauthio_provider_strava'));
    $('#status_msgs').append("</br > tw: " + localStorage.getItem('oauthio_provider_twitter'));
}

function initBtns() {

var strava_segs = {
    segs: []
};


var strava_deets = {
    deets: []
};

    OAuth.initialize("7ZbKkdtjRFA8NVkn00ka1ixaIe8");

    $('#fb-connect').on('click', function () {
        // alert('Athlet');
        if (res == false) {
            $('#status_msgs').append("</br > Not connected to Strava");
            $('#strava_login').show();
            $('#main_menu').hide();
        } else {
            $('#main_menu').show();
            $('#status_msgs').append("</br > Connected to Strava");
            $('#get_activities').show();

            localStorage.removeItem('segdata');
            res = OAuth.create('strava');
            $('#status_msgs').show();
            $('#status_msgs').append(localStorage.getItem('segdata') + " Retrieving Activities ...");


            //res.get('https://www.strava.com/api/v3/athlete').done(function (data) {
            res.get('https://www.strava.com/api/v3/activities').done(function (data) {
                //https: //www.strava.com/api/v3/activities
                //todo with data
                //alert('Athlete ' + data.lastname);
                var jsontext = JSON.stringify(data);
                var midhtml = "";
                var ct = 0;
                $.each(data, function (i, seg) {
                    strava_segs.segs.push({
                        "name": data[i]['name'],
                        "poly": data[i]['map']['summary_polyline'],
                        "dist": data[i]['distance'],
                        "egain": data[i]['total_elevation_gain']
                    });
                    ct++;
                    //     var name = data[i]['name'];
                    // alert(name);
                    //       midhtml = midhtml + "<li class=\"table-view-cell\" onclick=\"poly1()\">" + name + "<span class=\"badge\">4</span></li>";
                });
                var jsonsegs = JSON.stringify(strava_segs);
                localStorage.setItem('segdata', jsonsegs);
                $('#status_msgs').append("Retrieved " + ct + " Activities");
                //drawTable();
                //$('#result3').html(eval('(' + strava_segs + ')'));

            }).fail(function (err) {
                //todo with err
                alert("fail");
            });
            //    r.get('').done(function (data2) {
        }
    });

    $('#nearby').on('click', function () { //not used
        var token = localStorage.getItem('st_token');
        res = OAuth.create('strava');
        if (res == false) {
            $('#status_msgs').append("Not connected");
        } else {
            alert(token);
            $('#status_msgs').append("Connecting with: " + token);
            //res.get('https://www.strava.com/api/v3/athlete').done(function (data) {
            //alert("nb click" + res);
            res.get('https://www.strava.com/api/v3/segments/explore', { data: { access_token: token, bounds: '37.821362,-122.505373,37.842038,-122.465977'} }).done(function (data) {
                var jsondeets = JSON.stringify(data);
                //  localStorage.setItem('segdata', jsondeets);
                //alert(jsondeets);
                //drawTable();
                //$('#result3').html(eval('(' + strava_segs + ')'));
                $('#main_menu').hide();
                $('#seg_nearby').show();
                // getSegsbyBounds();
                showmap();
            }).fail(function (err) {
                //todo with err
                // alert("fail");

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
        }
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
        $('#result').html("status_msgs ...");
        //OAuth.popup('twitter', {cache: true}).done(function(twitter) {
        OAuth.popup('strava', {cache: true}).done(function (r) {
            // the access_token is available via r.access_token
            // but the http functions automagically wrap the jquery calls
            r.get('/oauth/authorize')
                .done(function (data) {
                    $('#result').html("strava: Hello");
                    $('#get_activities').show();
                    $('#main_menu').show();
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    $('#status_msgs').html("req error: " + textStatus + r.access_token);
                    localStorage.setItem('st_token', r.access_token);
                    $('#get_activities').show();
                    $('#main_menu').show();
                                   
                });
        })
        .fail(function (e) {
            $('#result').html('error: ' + e.message);
        });
    });

   }
