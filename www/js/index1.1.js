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
        document.addEventListener('offline', this.Offline, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        app.receivedEvent('deviceready');
        alert("ready");
        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBVDErdMAzGhcjVpaqCP4rDpCe7r6WcDog&sensor=false');
        checkData();
        checkConnection();
        
        //$('#act_table').show();
    },

    Offline: function () {
        alert("offline");
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

    //var element = document.getElementById('location');
    var html = 'Latitude: ' + position.coords.latitude + '<br />' +
                            'Longitude: ' + position.coords.longitude + '<br />';
    $('#location').append(html);
    var loc = position.coords.latitude + "," + position.coords.longitude;
    localStorage.setItem('loc', loc);
}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
              var element = document.getElementById('location');
    element.innerHTML = "GPS not available for location";
}

function checkData() {

    if (localStorage.getItem("userdata") == null) {
        $('#status_msgs').append("no data");
        $('#UnAuthApp').show();
        // initBtns();
       // alert("no data");
    } else {
       // alert("data");
       //clearCache();
       //$('#table_calc_back2').height(200);
       $('#rem_info').show();
       //$('#hr1').button('toggle');
       countWdata();
        var data = localStorage.getItem("userdata");
        $('#status_msgs').append("data </br> " + data);
        var ct = localStorage.getItem(ct);
        //$('#settings').hide();
        initBtns();
        //parse(ct,"act");
        getAct();
        //drawTable();
        //$('#act_table').show();
    }


    if (localStorage.getItem('oauthio_provider_strava') === null) {
        $('#footerMsgS').html("Not Authenticated with Strava. Tap 'Connect to Strava'");
        $('#UnAuthApp').show();

    } else {
        $('#AuthApp').show();
        var userdata = localStorage.getItem('userdata');
        var user = eval('(' + userdata + ')');
        var name = user.deets[0]['firstname'] + " " + user.deets[0]['lastname'];
        $('#status_msgs').hide();
        $('#status_msgs').append(userdata);
        //  var name = 
        $('#footerMsgS').html("Authenticated with Strava as " + name);
        $('#get_activities').show();
    }

    //getW();



}

function getAct() {
    $('#seg_nearby').hide();
    $('#status_msgs').hide();
    drawTable();
}

function getNearby() {
    $('#act_table_header').hide();
    $('#act_table').hide();
    $('#my_activities').hide();
    $('#seg_nearby').show();
    $('#seg_data').hide();
    // getSegsbyBounds();
    showmap();
}

function showRem() {
    $('#table_calc_back2').height(90);
    $('#rem_section').show();
    $('#rem_msg').html("15hrs until next credit");
}

function drawTable() {
    $('#act_table_header').show();
    $('#act_table').show();
    $('#my_activities').show();
    $('#seg_data').hide();
    $('#seg_weather').hide();
    $('#seg_details').hide();
    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\">";
    var json = localStorage.getItem('segdata');
    var j2 = eval('(' + json + ')');
    var midhtml = "";
    var act_ct = 0;
    $.each(j2.segs, function (i, seg) {
        //poly3(seg.ID,i,seg.name);
        midhtml = midhtml + "<li onclick=\"poly2(" + seg.ID + "," + i + ",'" + seg.name + "')\"><i class=\"read\"></i><p>" + seg.name + "</p><p class=\"message\">" + seg.dist + "m</p>" +
        "<div class=\"actions\" id=\"stars_" + seg.ID + "\"><p>Calc</p></div></li>";
            act_ct++;
            getW(seg.latlng,seg.ID);
    });
    var ht = parseInt((act_ct * 48) + 56);
    $('#tableback').height(ht);

    var ref_btn = "<div class=\"minihead\"><button class=\"btn btn-primary\" onclick=\"stAct()\">Refresh My Activities</button></div>";
    $('#actMsgs').html(act_ct + " Activities loaded.");
    $('#act_table').html(top + midhtml + "</ul></div></div>");
     
    // alert(midhtml);
    
}

function drawLeaderboard(ID) {
    $('#seg_leaderboard').show();
    $('#lb_table').show();
    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\">";
    var json = localStorage.getItem('lb_data_'+ID);
    var j2 = eval('(' + json + ')');
    var midhtml = "";
    var act_ct = 0;
    $.each(j2.segs, function (i, seg) {
        //poly3(seg.ID,i,seg.name);
        midhtml = midhtml + "<li><i class=\"read\"></i><p>" + seg.name + "</p><p class=\"message\">" + seg.time + "</p>" +
        "<div class=\"actions\"></div></li>";
            act_ct++;
            //getW(seg.latlng,seg.ID);
    });
   // var ht = parseInt((act_ct * 48) + 56);
   // $('#tableback').height(ht);

    //$('#actMsgs').html(act_ct + " Activities loaded.");
    $('#lb_table').html(top + midhtml + "</ul></div></div>");
     
    // alert(midhtml);
    
}


function displayStars() {
    var json = localStorage.getItem('segdata');
    var j2 = eval('(' + json + ')');
    $('#info_line').html("<h5>Calculating activity ratings for selected wind conditions</h5>");
    $.each(j2.segs, function (i, seg) {
        $('#stars_' + seg.ID).html("<p>Calculating ... </p>");
        calcStarsInline(seg.ID,3);
              
    });

}

function stConn2() {
    var strava_deets = {
        deets: []
    };
    
    $('#status_msgs').show();
    $('#status_msgs').append("</br > Connecting to Strava ...");
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8')
    OAuth.popup('strava', { cache: true }).done(function (result) {
        console.log(result)
        $('#status_msgs').append("</br > " + JSON.stringify(result));
        localStorage.removeItem('userdata');
        result.me().done(function (data) {
            // do something with `data`, e.g. print data.name

            strava_deets.deets.push({
                "firstname": data.firstname,
                "lastname": data.lastname,
                "city": data.city,
                "state": data.state


            });
            
            var jsondeets = JSON.stringify(strava_deets);
            localStorage.setItem('userdata', jsondeets);

            $('#status_msgs').append("</br > " + data.lastname);
            $('#AuthApp').show();
            $('#UnAuthApp').hide();
            stAct();
            // do some stuff with result
        });

    });
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

var timer1

function parse(ct,type) {

if (type == "act") {

var seg_data =localStorage.getItem('segdata');
var j2 = eval('(' + seg_data + ')');
var dist = j2.segs[0].dist;
var index = 0;
    $.each(j2.segs, function (i, seg) {
       
      var name = i;
      
      var poly = seg.poly; //seg[i]['map']['summary_polyline'];
      var ID = seg.ID;
      //alert("start " + i);
      var timer = setInterval(function () { startDecode(poly,ID,i,index) }, 1000);
      //var speed = 1000;
      //var timer = setInterval(startDecode(poly,ID,i), speed);
      index++;
      //startDecode(poly,ID,i);      
      function startDecode(poly,ID,i,index) {
    clearInterval(timer);
    //index++;
   // alert(i + " start ... " + ID + " idx=" + index);
    decodepoly(poly,ID);
         
        }
      
    });
    getAct();
    //drawTable();
    
    } else {
    
    var seg_data =localStorage.getItem('seg_loc_data');
var j2 = eval('(' + seg_data + ')');
//alert(seg_data);
var index = 0;
    $.each(j2.points, function (i, seg) {
       
      var name = i;
      
      var poly = seg.points; //seg[i]['map']['summary_polyline'];
      var ID = seg.PID;
    //  alert("start " + poly + ID);
      var timer = setInterval(function () { startDecode(poly,ID,i,index) }, 1000);
      //var speed = 1000;
      //var timer = setInterval(startDecode(poly,ID,i), speed);
      index++;
      //startDecode(poly,ID,i);      
      function startDecode(poly,ID,i,index) {
    clearInterval(timer);
    //index++;
 //  alert(poly + " start ... " + ID + " idx=" + index);
    decodepoly(poly,ID);
         
        }
      
    });
    //getAct();
    
    }


}



function stAct() {
    var strava_segs = {
        segs: []
    };
    $('#actMsgs').html("Refreshing Activities from Strava..."); //was actmsgs
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        result.get('https://www.strava.com/api/v3/activities').done(function (data) {
            var jsontext = JSON.stringify(data);
            $('#status_msgs').append(jsontext);
            var ct = 0;
            $.each(data, function (i, seg) {
            var poly = data[i]['map']['summary_polyline'];
            var ID = data[i]['id'];
            
                
                strava_segs.segs.push({
                    "name": data[i]['name'],
                    "ID": data[i]['id'],
                    "poly": data[i]['map']['summary_polyline'],
                    "dist": data[i]['distance'],
                    "egain": data[i]['total_elevation_gain'],
                    "latlng": data[i]['end_latlng']
                    //alert(poly + "hij" + ID);
                });
                
                ct++;
            });
            var jsonsegs = JSON.stringify(strava_segs);
            localStorage.setItem('segdata', jsonsegs);
            localStorage.setItem('actct',ct);
            
            alert("Retrieved " + ct + " Activities.");
            //drawTable();
            parse(ct,"act");

        });

    });
}

function stLeader(ID) {
//alert(ID);
    var strava_segs = {
        segs: []
    };
     OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        result.get('https://www.strava.com/api/v3/segments/'+ID+'/leaderboard').done(function (data) {
            var jsontext = JSON.stringify(data);
            //$('#status_msgs').append(jsontext);
            //alert(jsontext);
            var ct = 0;
            var entries = data['entry_count'];
            $.each(data.entries, function (i, seg) {
            

                strava_segs.segs.push({
                    "name": seg.athlete_name,
                     "time": seg.start_date_local,
                     "profile": seg.athlete_profile
                    //alert(poly + "hij" + ID);
                });
                
      //          ct++;
            });
            var jsonsegs = JSON.stringify(strava_segs);
            localStorage.setItem('lb_data_'+ID, jsonsegs);
            //localStorage.setItem('actct',ct);
            
           // alert("Retrieved " + entries + jsonsegs);
            //drawTable();
            drawLeaderboard(ID);

        });

    });
}



function clearCache() {
    $('#status_msgs').show();
    $('#status_msgs').append("<br/> clearing ...");
    //  OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');
    //OAuth.clearCache();
    localStorage.removeItem('weatherdata');
    localStorage.removeItem('weatherdata_ct');
    showLocal();
}

function showLocal() {
    $('#status_msgs').show();
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) == 'weatherdata') {
        $('#status_msgs').append("</br > " + localStorage.key(i) + " data: " + localStorage.getItem(localStorage.key(i)));
        }
        // do something with localStorage.getItem(localStorage.key(i));
    }
    // var straval = localStorage.getItem('oauthio_provider_strava');
    // var stravl2 = straval.replace('1448', '1555');

    $('#status_msgs').append("</br > st: " + localStorage.getItem('oauthio_provider_strava'));
    //$('#status_msgs').html("</br > seg: " + localStorage.getItem('segdata'));

    //    $('#status_msgs').append("</br > st2: " + stravl2);
    //    localStorage.removeItem('oauthio_provider_strava');
    //    localStorage.setItem('oauthio_provider_strava', stravl2);
    //    $('#status_msgs').append("</br > st3: " + localStorage.getItem('oauthio_provider_strava'));
}

function initBtns() {

    var strava_segs = {
        segs: []
    };


    var strava_deets = {
        deets: []
    };

    OAuth.initialize("7ZbKkdtjRFA8NVkn00ka1ixaIe8");

    $('#fb-connect').on('click', function () {  //used for get activities
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
        OAuth.popup('strava', { cache: true }).done(function (r) {
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
