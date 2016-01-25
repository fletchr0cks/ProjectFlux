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
       $('#info').hide();
       $('#table_calc_area2').hide();
       //$('#hr1a').button('active');
       countWdata();
        var data = localStorage.getItem("userdata");
        $('#status_msgs').append("data </br> " + data);
        var ct = localStorage.getItem(ct);
        //$('#settings').hide();
        //initBtns();
        //parse(ct,"act");
        getAct();
        //drawTable();
        $('#act_table').show();
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

function getPolyx( param1, callbackFunction ) { 
var json = localStorage.getItem('all_seg_efforts');
  var jact = eval('(' + json + ')');
    //alert(json);
    $.each(jact.segs, function (i, seg) {
    //alert(seg.name);
   $('#location').append(seg.name + "</br>");

    });
     return "hi"

} 

//var resp = getPoly ('222');
//$('#location').append(resp + "</br>");
//alert(resp);

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
    //var json = localStorage.getItem('all_seg_efforts');
    //$('#location').append(json + "</br>");
    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\">";
    var json = localStorage.getItem('segdata');
    var j2 = eval('(' + json + ')');
    var midhtml = "";
    var act_ct = 0;
    //get count from storage, update with seg efforts
    var LB = false;
    $.each(j2.segs, function (i, seg) {
        //poly3(seg.ID,i,seg.name);
        var seg_ct = 0;
      //   $.each(j2.segs.segment_efforts, function (i, seg) {
      //          seg_ct++;
      //      });
        if (seg_ct > 0) { 
            LB = true
        }
        
        midhtml = midhtml + "<li onclick=\"poly2(" + seg.ID + "," + i + ",'" + seg.name + "')\"><i class=\"read\"></i><p>" + seg.name + "</p><p class=\"message\">" + seg.dist + "m</p>" +
        "<div class=\"actions\" id=\"stars_" + seg.ID + "\"></div></li><div id=\"segs_" + seg.ID + "\"></div>";
            act_ct++;
            //getW(seg.latlng,seg.ID);
            
           
           
    });
    var ht = parseInt((act_ct * 48) + 220); //56
    $('#tableback').height(ht);

    var ref_btn = "<div class=\"minihead\"><button class=\"btn btn-primary\" onclick=\"stAct()\">Refresh My Activities</button></div>";
    $('#actMsgs').html(act_ct + " Activities loaded.");
    $('#act_table').html(top + midhtml + "</ul></div></div>");
    
    
    var timer = setInterval(function () { startDecode() }, 1000);     
    function startDecode() {
    clearInterval(timer);
           getSegs();
         //  weatherAct();
         //  weatherSeg();
           displayStars();
    }
  
    
    
   // StartgetSegs();
    //timer for getsegs
    // alert(midhtml);
    
}

var getSegtimer;

function StartgetSegs() {
    //alert("timer");
    getSegtimer = setTimeout(getSegs, 5000);
    //getSegtimer = setTimeout(function(){ alert("Hello") }, 3000);
}


function showEff() {
    $('#seg_effort').show();

}

function getSegs() {
    //alert("getsegs");
    clearTimeout(getSegtimer);
    var json = localStorage.getItem('all_seg_efforts');
    var jact = eval('(' + json + ')');
   // alert(json);
    $.each(jact.segs, function (i, seg) {
        //var str = seg.ID+'_seg_efforts';
        //var json_seg_eff = localStorage.getItem(str);
        //alert(str);
        //if (json_seg_eff.length > 16) {
        //var j2 = eval('(' + json_seg_eff + ')');
        //alert(json_seg_eff + " ... " + json.length);
        //var act_seg_ct = j2.count[0];
        var pbrank = seg.pb_rank;
        var pb="";
        if (pbrank == "1") {
            pb= "<i class=\"fa fa-shield\"></i>&nbsp;&nbsp;&nbsp;"
        } 
        var seghtml = "";
        //alert(seg.name +" "+ seg.parentID);
        //var i = 5;
            //$.each(j2.segs, function (i, seg) {
              //  alert(seg.name);
                seghtml = seghtml + "<li onclick=\"polySegs(" + seg.ID + "," + i + ",'" + seg.name + "')\"><i class=\"read\"></i><p class=\"seg_row\"><i class=\"fa fa-trophy\"></i>&nbsp;&nbsp;&nbsp;" + pb + seg.name + "</p><p class=\"message\">" + seg.dist + "m</p>" +
                "<div class=\"actions\" id=\"stars_" + seg.ID + "\"></div></li>";
            //});
        $('#segs_'+seg.parentID).html(seghtml);
        //getW(seg.latlng,seg.ID);
        //getW
       // }
    });


//alert(act_seg_ct);
//getW

}

function drawLeaderboard(ID) {
    $('#seg_leaderboard').show();
    $('#lb_table').show();
    $('#eff_table').hide();
    $('#seg_weather').hide();
    $('#seg_efforts').hide();
    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\">";
    var json = localStorage.getItem('lb_data_'+ID);
    var j2 = eval('(' + json + ')');
    var midhtml = "";
    var act_ct = 0;
    var posy = 4; //54;
    var posyt = 15; //65;
    var canvas = document.getElementById('leaderbd');
    canvas.width = 350;
    canvas.height = 1500;
    canvas.style.width = '350px';
    canvas.style.height = '1500px';
    var ctx2d = canvas.getContext('2d');
    ctx2d.clearRect(0, 0, ctx2d.canvas.width, ctx2d.canvas.height);
    ctx2d.fillStyle = "rgba(255, 255, 255, 0.0)";
    ctx2d.fillRect(0, 0, 350, 2000);
    hour_bg_bk = "000";
    ctx2d.fillStyle = '#FFF';
    ctx2d.font = '14px Arial';
    ctx2d.strokeStyle = "#2fb4c8";
    ctx2d.save();


    $.each(j2.segs, function (i, seg) {
        //ctx2d.restore();
       // alert(seg.athlete_profile);
        
     //   var ws = (parseInt(zone.wspd.english) * 6) + 10;
    //    var temp = (parseInt(zone.temp.metric) * 3) + 10;
    //    var winddeg = parseInt(zone.wdir.degrees);

        var hour = seg.mov_time;
        var date = seg.time;
      //convert seconds
        var hour_bg_bk = "9F9F9F";
        var border = "2fb4c8";
        var wind_bg = "51D251";
        var temp_bg = "FFB336";
        var wind_txt = "2f3e46";
        var temp_txt = "FFF";
       // var ampm = zone.FCTTIME.ampm;
       
        //moving time
        ctx2d.font = '20px Arial';
        ctx2d.fillStyle = '#FFF';
        ctx2d.fillText(hour, 25, posyt + 10);
        //alert(hour);
        ctx2d.font = '10px Arial';
        ctx2d.fillText("seconds", 25, posyt + 18);
        ctx2d.font = '14px Arial';
        ctx2d.fillText(seg.name, 75, posyt + 10);
        var imgi = new Image();
        imgi.src = seg.profile; //"http://icons.wxug.com/i/c/a/nt_snow.gif"; //;
        imgi.addEventListener("load", function () {
            ctx2d.drawImage(imgi, 6, posyt + 10);
        }, false);
      
        ctx2d.fillStyle = "#2fb4c8";
        ctx2d.fillRect(0, posy - 5, 350, 1);
        
        ctx2d.save();
        ctx2d.strokeStyle = "#2fb4c8";
        ctx2d.translate(15, posy + 18);
        ctx2d.rotate(90 * Math.PI / 180);
        //ctx2d.save();
        var winddeg = 80;
        ctx2d.rotate(winddeg * Math.PI / 180);

        ctx2d.lineWidth = 1;
        ctx2d.fillStyle = "#2fb4c8";
        //ctx2d.moveTo(60, -15);
        ctx2d.fillRect(-5, -5, 10, 10);
        ctx2d.beginPath();


        ctx2d.lineTo(0, -5);
        ctx2d.lineTo(0, -10);
        ctx2d.lineTo(10, 0);
        ctx2d.lineTo(0, 10);
        ctx2d.lineTo(0, 5);
        ctx2d.lineTo(-10, 5);
        ctx2d.lineTo(-10, -5);

        ctx2d.closePath();
        ctx2d.fill();
        ctx2d.stroke();
        ctx2d.restore();

        
        
        posy =posy + 50
        posyt = posyt + 50

    })
    
    
    $.each(j2.segs, function (i, seg) {
        //poly3(seg.ID,i,seg.name);
        midhtml = midhtml + "<li><i class=\"read\"></i><p><img src=\"" + seg.profile + "\"\>" + seg.mov_time + " " + seg.name + "</p><p class=\"message\">" + seg.time + "</p>" +
        "<div class=\"actions\"></div></li>";
            act_ct++;
            //getW(seg.latlng,seg.ID);
    })
    var ht = parseInt((act_ct * 48) + 30);
   $('#leaderback').height(ht);

    //$('#actMsgs').html(act_ct + " Activities loaded.");
    $('#lb_table').html(top + midhtml + "</ul></div></div>");
     
    // alert(midhtml);
    
}

function drawSegEffort(ID) {
    $('#seg_leaderboard').hide();
    $('#lb_table').hide();
    $('#eff_table').show();
     $('#seg_weather').hide();
    $('#seg_efforts').show();
    var top = "<div class=\"framemail\"><div class=\"window\"><ul class=\"mail\">";
    var json = localStorage.getItem('eff_data_'+ID);
    var j2 = eval('(' + json + ')');
    var midhtml = "";
    var act_ct = 0;
    $.each(j2.segs, function (i, seg) {
        //poly3(seg.ID,i,seg.name);
        midhtml = midhtml + "<li><i class=\"read\"></i><p>" + seg.mov_time + "</p><p class=\"message\">" + seg.kom_rank + "  " + seg.time + "</p>" +
        "<div class=\"actions\"></div></li>";
            act_ct++;
            //getW(seg.latlng,seg.ID);
    });
    var ht = parseInt((act_ct * 48) + 30);
   $('#effortback').height(ht);

    //$('#actMsgs').html(act_ct + " Activities loaded.");
    $('#eff_table').html(top + midhtml + "</ul></div></div>");
     
    // alert(midhtml);
    
}

function CallHistWeather(latlng,date) {
   
    $.ajax({
        type: "GET",
        url: "http://api.wunderground.com/api/bf45926a1b878028/hourly/geolookup/q/" + latlng + ".json",
        //56.052,-2.732
        //url: "json.txt",
        //dataType: "html",
        dataType: "jsonp",
        success: function (json) {
            //var jsontxt = eval('(' + json + ')');

            var jsontext = JSON.stringify(json);
            var location = json['location']['city'];
            $('#location').append("Retrieved weather for " + location + "  " + ID + "</br>");
            localStorage.setItem(ID+'_weather', jsontext);
            countWdata();
            var epoch = Math.round(new Date().getTime() / 1000)
            var timenow = new Date();
            var hour_now = timenow.getHours();
            var minute_now = timenow.getMinutes();
            var today = timenow.getDate();


        },
        error: function (xhr, error) {
            console.debug(xhr); console.debug(error);
        },
        complete: function () {
            //load weather

        }

    });

}


function startWeather() {

weatherAct();

}

function weatherAct() {          //  create a loop function
var json = localStorage.getItem('segdata');
var j2 = eval('(' + json + ')');

var time = 0;

    $.each(j2.segs, function (i, seg) { //if (i < 10) {            //  if the counter < 10, call the loop function
        
        setTimeout(function() {
//alert('paused');
getW(seg.latlng,seg.ID);
$('#location').append(i + " Paused: " + seg.ID + "</br>");
    }, time);
    time += 2000;
    });                       //  ..  setTimeout()


}

function weatherSeg() {
var all_seg_data =localStorage.getItem('all_seg_efforts');
var j2 = eval('(' + all_seg_data + ')');
//alert(all_seg_data);
if (all_seg_data.length > 80) {
var index = 0;
 $.each(j2.segs, function (i, seg) {
      var name = i;
      var timer1 = setInterval(function () { startDecode(seg.ID,seg.parentID) }, 1000);
    index++;
    //alert(poly);
      //startDecode(poly,ID,i);      
     function startDecode(toID,fromID) {
    clearInterval(timer1);
     copyWeather(fromID,toID)

        
    }
    });
    
    }

}


function displayStars() { //get seg weather
    var jsonact = localStorage.getItem('segdata');
    var jsonseg = localStorage.getItem('all_seg_efforts');
    var j2s = eval('(' + jsonseg + ')');
    var j2a = eval('(' + jsonact + ')');
    $('#location').append("Calculating activity ratings for selected wind conditions </br>");
    $.each(j2s.segs, function (i, seg) {
        $('#stars_' + seg.ID).html("<p>Calculating ... </p>");
        calcStarsInline(seg.ID,3);
    });
    
    $.each(j2a.segs, function (i, seg) {
        $('#stars_' + seg.ID).html("<p>Calculating ... </p>");
        calcStarsInline(seg.ID,3);
    });
    
    //also calc seg effort stars
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
var timer2

function analyseSegs() {
//start timer, then analyse
//getSegtimer = setTimeout(analyseSegs2, 5000);
var all_seg_data =localStorage.getItem('all_seg_efforts');
var j2 = eval('(' + all_seg_data + ')');
//alert(all_seg_data);
if (all_seg_data.length > 80) {
var index = 0;
 $.each(j2.segs, function (i, seg) {
 //alert("hi");
      var name = i;
      var poly = localStorage.getItem(seg.ID+"_poly");
    //  alert(poly);
      var ID = seg.ID
      var parentID = seg.parentID
      var timer1 = setInterval(function () { startDecode(poly,ID,parentID,i,index) }, 1000);
    index++;
    //alert(poly);
      //startDecode(poly,ID,i);      
      function startDecode(poly,ID,parentID,i,index) {
    clearInterval(timer1);
     decodepoly(poly,ID,parentID);
        
    }
    });
    
    var timer2 = setTimeout(function () { startDecode() }, 1000);     
            function startDecode() {
                clearTimeout(timer2);
                drawTable();
    }
    
    
    } else {
    
    var timer3 = setTimeout(function () { startDecode() }, 1000);     
            function startDecode() {
                clearTimeout(timer3);
                drawTable();
    }
    
    }
}





function parse(ct,type) {
//alert(type);
var parentID = "111";
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
    decodepoly(poly,ID,parentID);
         
        }
      
    });
    //getAct();
    //drawTable();
    
    //drawTable();
    
    
    } else if (type == "seg") {

var seg_data = localStorage.getItem('segdata');  //not here
//alert(seg_data);
var j2 = eval('(' + seg_data + ')');

var index = 0;
    $.each(j2.segs, function (i, seg) {
    var seg_eff = localStorage.getItem(seg.ID+'_seg_efforts'); //has ID +parent ID
    var j2eff = eval('(' + seg_eff + ')');
    //alert("eff" + seg_eff + seg.ID);  //vf is top onlist
    var name = i;
    var segjson = localStorage.getItem(ID+"_poly");
    var poly = segjson.segs.poly;
    var ID = segjson.segs.ID;
    alert("start decode" + poly + " " + ID);
      var timers = setInterval(function () { startDecode(poly,ID,i,index) }, 1000);
      //var speed = 1000;
      //var timer = setInterval(startDecode(poly,ID,i), speed);
      index++;
      //startDecode(poly,ID,i);      
      function startDecode(poly,ID,i,index) {
    clearInterval(timers);
    //index++;
   // alert(i + " start ... " + ID + " idx=" + index);
   $('#location').append("decode poly for segment: " + ID); //was actmsgs
    decodepoly(poly,ID,parentID);
         
        }
      
    });
    
    getAct();

    
    
    
    } else if (type == "map") {
    
    var seg_data =localStorage.getItem('seg_loc_data');
    var j2 = eval('(' + seg_data + ')');
//alert(seg_data);
    var index = 0;
    $.each(j2.points, function (i, seg) {
       
      var name = i;
      //
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
 
    decodepoly(poly,ID,parentID);
         
        }
      
    });
    //getAct();
    
    }


}

//getSegpolysTimer();
function ActsSegsRefresh() {
    stAct();
}



function stAct() {
   
    var strava_segs = {
        segs: []
    };
    $('#location').html("Refreshing Activities from Strava..."); //was actmsgs
    OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        result.get('https://www.strava.com/api/v3/activities').done(function (data) {
            var jsontext = JSON.stringify(data);
            $('#status_msgs').append(jsontext);
            var ct = 0;
            $.each(data, function (i, seg) {
            var poly = data[i]['map']['summary_polyline'];
            var ID = data[i]['id'];
            //   $.each(parsed_json.hourly_forecast, function (i, zone) {
 
 //           $.each(data.segment_efforts, function (i, seg_eff) {
               //  alert(seg_eff.name);
   //         });
            
                
                strava_segs.segs.push({
                    "name": data[i]['name'],
                    "ID": data[i]['id'],
                    "poly": data[i]['map']['summary_polyline'],
                    "dist": data[i]['distance'],
                    "egain": data[i]['total_elevation_gain'],
                    "latlng": data[i]['end_latlng'],
                    //"seg_efforts" : data[i]['segment_efforts']
                    
                });
                
                //alert(seg.map);
               
                ct++;
                seg_efforts(seg.id);
            });
            var jsonsegs = JSON.stringify(strava_segs);
            localStorage.setItem('segdata', jsonsegs);
            localStorage.setItem('actct',ct);
           // alert(jsontext);
            //alert("Retrieved " + ct + " Activities.");
            //drawTable();
            parse(ct,"act");
            var timer = setInterval(function () { startDecode() }, 1000);     
            function startDecode() {
                clearInterval(timer);
                analyseSegs();
            }
             //myFunction();
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
                     "profile": seg.athlete_profile,
                     "mov_time": seg.moving_time
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

var strava_all_segs = {
        segs: []
    };
    
//https://www.strava.com/api/v3/segments/:id

function seg_efforts(ID) {
    var strava_segs = {
        segs: [],
        count: []
    };
     OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        //result.get('https://www.strava.com/api/v3/segments/starred/').done(function (data) {
        result.get('https://www.strava.com/api/v3/activities/' +ID).done(function (data) {
        //https://www.strava.com/api/v3/activities/:id
        
            var jsontext = JSON.stringify(data);
            //$('#status_msgs').append(jsontext);
             $('#location').append("Segment effort for: " + ID + ":</br>  "+jsontext + "<br/>");
            var ct = 0;
            //var entries = data['entry_count'];
           $.each(data.segment_efforts, function (i, seg) {
            //get poly here

               strava_segs.segs.push({
                   "name": seg.name,
                   "dist": seg.segment.distance,
                   "latlng": seg.segment.start_latlng,
                   "ID" : seg.segment.id,
                   "parentID" : seg.activity.id
                });
                
                strava_all_segs.segs.push({
                   "name": seg.name,
                   "latlng": seg.segment.end_latlng,
                   "dist": seg.segment.distance,
                   "ID" : seg.segment.id,
                   "parentID" : seg.activity.id,
                   "egain": parseInt(seg.segment.elevation_high - seg.segment.elevation_low),
                   "pb_rank" : seg.pr_rank,
                   "kom_rank" : seg.kom_rank
                });//has it more than once
        
            seg_details(seg.segment.id);
                    ct++;
               
            });
            if (ct > 0) {
            strava_segs.count.push(ct);
           var jsonsegs = JSON.stringify(strava_segs);
            var jsonsegsall = JSON.stringify(strava_all_segs);
            
           alert(ID+"saving" + jsonsegsall);
            localStorage.setItem(ID+'_seg_efforts', jsonsegs);
            localStorage.setItem('all_seg_efforts', jsonsegsall);
            //var segct = localStorage.getItem('segct');
           // var actct = localStorage.getItem('actct');
           // var cts = parseInt(ct+segct);
           //  localStorage.setItem('segct',cts);
           // alert("h2");
           // localStorage.setItem('actct',7);
           // var ct2 = parseInt(cts+actct);
           
            //get segment details by ID then call decodepoly with poly + ID
            //var poly= "}vculjey0cF{jAjK'A";
            //parse(ct,"seg");  
           // analyseSegs();
            
            } 
           // alert("Retrieved " + entries + jsonsegs);
            //drawTable();
            
          //  drawLeaderboard(ID);
            
        });

    });
   // alert("here");
   // 
}
function seg_details(ID) {
    //alert(ID);
     OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');
    var poly = "";
    //var json = localStorage.getItem('all_seg_efforts');
    OAuth.popup('strava', { cache: true }).done(function (result) {
         result.get('https://www.strava.com/api/v3/segments/' +ID).done(function (data) {
            poly = data.map.polyline;
            localStorage.setItem(ID+'_poly',poly);
            $('#location').append(poly + "</br>");
        });

    });
}

function stEffort(ID) {
//alert(ID);
var athID = "10375624";
    var strava_segs = {
        segs: []
    };
     OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');

    OAuth.popup('strava', { cache: true }).done(function (result) {
        result.get('https://www.strava.com/api/v3/segments/'+ID+'/all_efforts',{ data: { athlete_id: athID} }).done(function (data) {
            var jsontext = JSON.stringify(data);
            //$('#status_msgs').append(jsontext);
          //  alert(jsontext);
            var ct = 0;
           // var entries = data['entry_count'];
            $.each(data, function (i, seg) {
            

                strava_segs.segs.push({
                    "pr_rank": seg.pr_rank,
                     "time": seg.start_date_local,
                     "kom_rank": seg.kom_rank,
                     "mov_time": seg.moving_time
                    //alert(poly + "hij" + ID);
                });
                
      //          ct++;
            });
            var jsonsegs = JSON.stringify(strava_segs);
            localStorage.setItem('eff_data_'+ID, jsonsegs);
            //localStorage.setItem('actct',ct);
            
           // alert("Retrieved " + entries + jsonsegs);
            //drawTable();
            drawSegEffort(ID);

        });

    });
}

function clearCache() {
    $('#status_msgs').show();
    $('#status_msgs').append("<br/> clearing ...");
    //  OAuth.initialize('7ZbKkdtjRFA8NVkn00ka1ixaIe8');
    //OAuth.clearCache();
    var str = "lb_data_'";
    for (var i = 0; i < localStorage.length; i++) {
      //  if (localStorage.key(i) == 'weatherdata') {
     if (localStorage.key(i).indexOf(str) > -1) {
        $('#status_msgs').append("Removing " + localStorage.key(i) + "</br >");
      // }
         localStorage.removeItem(localStorage.key(i));
      }
        // do something with localStorage.getItem(localStorage.key(i));
    }
    //localStorage.removeItem('weatherdata');
  //  localStorage.removeItem('weatherdata_ct');
    showLocal();
}

function showLocal() {
    $('#status_msgs').show();
    $('#testBtns').show();
    $('#table_calc_area2').show();
    $('#info').show();
    var str = "eff_data";
    var str2= "efforts";
    for (var i = 0; i < localStorage.length; i++) {
      //  if (localStorage.key(i) == 'weatherdata') {
     if (localStorage.key(i).indexOf(str) > -1) {
        $('#status_msgs').append("</br > " + localStorage.key(i) + " data: " + localStorage.getItem(localStorage.key(i)));
      // }
      }
      
      if (localStorage.key(i).indexOf(str2) > -1) {
        $('#status_msgs').append("</br > " + localStorage.key(i))// + " data: " + localStorage.getItem(localStorage.key(i)));
      // }
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
