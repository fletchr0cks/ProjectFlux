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
var totalDist = 0;

function getBearing(latlng1,latlng2,totalDist) {
    var bearing = google.maps.geometry.spherical.computeHeading(latlng1, latlng2);
    var dist = google.maps.geometry.spherical.computeDistanceBetween(latlng1, latlng2);
    var percent = calcDistProp(dist, totalDist);
    dist = Math.round(parseInt(dist));
    bearing = Math.round(parseInt(bearing));
    if (bearing < 0) {
        bearing = calcBearing(bearing);
    }
    $('#result2').html("bearing= " + bearing + " percent= " + percent + "</br>");
    whichP(bearing,percent);
}

function calcDistProp(dist, totalDist) {
    var perc = (dist/totalDist) * 100;
    return perc;
}

var p1 = 0, p2 = 0, p3 = 0, p4 = 0, p5 = 0, p6 = 0, p7 = 0, p8 = 0, p9 = 0, p10 = 0, p11 = 0, p12 = 0;
var w1 = 0, w2 = 0, w3 = 0, w4 = 0, w5 = 0, w6 = 0, w7 = 0, w8 = 0, w9 = 0, w10 = 0, w11 = 0, w12 = 0;


function whichP(bearing, percent) {
  //  alert(bearing + " .. " + percent);
    if (bearing < 30) {
        p1 = p1 + (percent / 100);        
    }
    if (bearing >= 30 && bearing < 60) {
        p2 = p2 + (percent / 100);
    }
    if (bearing >= 60 && bearing < 90) {
        p3 = p3 + (percent / 100);
        //alert(p3);
    }
    if (bearing >= 90 && bearing < 120) {
        p4 = p4 + (percent / 100);
    }
    if (bearing >= 120 && bearing < 150) {
        p5 = p5 + (percent / 100);
    }
    if (bearing >= 150 && bearing < 180) {
        p6 = p6 +(percent / 100);
    }
    if (bearing >= 180 && bearing < 210) {
        p7 = p7 + (percent / 100);
       // alert("p7=" + p7);
    }
    if (bearing >= 210 && bearing < 240) {
        p8 = p8 + (percent / 100);
    }
    if (bearing >= 240 && bearing < 270) {
        p9 = p9 + (percent / 100);
    }
    if (bearing >= 270 && bearing < 300) {
        p10 = p10 + (percent / 100); ;
    }
    if (bearing >= 300 && bearing < 330) {
        p11 = p11 + (percent / 100);
    }
    if (bearing >= 330 && bearing < 360) {
        p12 = p12 + (percent / 100);
    }


}

function showP() {
    $('#result2').html("p1=" + p1 + "</br>" + "p2=" + p2 + "</br>" + "p3=" + p3 + "</br>" + "p4=" + p4 + "</br>" + "p6=" + p6 + "</br>" + "p7=" + p7 + "</br>" + "p8=" + p8 + "</br>" + "p9=" + p9 + "</br>" + "p10=" + p10 + "</br>" + "p11=" + p11 + "</br>" + "p12=" + p12 + "</br>");
}
//route profile
//12 portions
//cycle thru each portion as degrees and count up score 
//multiply scores by percent for the route
//decide colors
//var p1val = xx    p2col = xx
//draw chart from score

function x10(val) {
    return (val * 100);
}

function drawChart() {
    p1 = x10(p1);
    p2 = x10(p2);
    p3 = x10(p3);
    p4 = x10(p4);
    p5 = x10(p5);
    p6 = x10(p6);
    p7 = x10(p7);
    p8 = x10(p8);
    p9 = x10(p9);
    p10 = x10(p10);
    p11 = x10(p11);
    p12 = x10(p12);
    $('#p1').html("drawing chart, p1=" + p1);

    var obj = [{ value: p1,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: p2,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: p3,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: p4,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: p5,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: p6,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: p7,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
	{
		value: p8,
		color: "#F7464A",
		highlight: "#FF5A5E",
		label: "Red"
	},
	{
		value: p9,
		color: "#46BFBD",
		highlight: "#5AD3D1",
		label: "Green"
	},
	{
		value: p10,
		color: "#FDB45C",
		highlight: "#FFC870",
		label: "Yellow"
	},
	{
		value: p11,
		color: "#949FB1",
		highlight: "#A8B3C5",
		label: "Grey"
	},
	{
		value: p12,
		color: "#4D5360",
		highlight: "#616774",
		label: "Dark Grey"
	}];

    localStorage.setItem('gameStorage', JSON.stringify(obj));
    //And to retrieve the object later, such as on page refresh or browser close/open...

    var obj = JSON.parse(localStorage.getItem('gameStorage'));
    var ctx = document.getElementById("chart-area").getContext("2d");
    //alert("p1= " + p1);
    window.myPolarArea = new Chart(ctx).PolarArea(obj, {
        responsive: true
    });

}

function getDistance(latlng1, latlng2) {
    var dist = google.maps.geometry.spherical.computeDistanceBetween(latlng1, latlng2);
    dist = Math.round(parseInt(dist));
    totalDist = totalDist + dist;
    $('#result2').append("totaldist= " + totalDist + " <br />");
}

function calcBearing(val) {
    var valx = Math.abs(parseInt(val));
    return (180 - valx) + 180;

}

function poly1() {
    decodepoly("}vculjey0cF{jAjK'A");
}

function poly2(i) {
     initMap();
    var json = localStorage.getItem('segdata');
    var j2 = eval('(' + json + ')');

    var pl = j2.segs[i].poly;
    //alert(pl);
    p1 = 0
    p2 = 0
    p3 = 0
    p4 = 0
    p5 = 0
    p6 = 0
    p7 = 0
    p8 = 0
    p9 = 0
    p10 = 0
    p11 = 0
    p12 = 0;
    totalDist = 0
    decodepoly(pl);
   
}

function decodepoly(polyline) {
   
    var latlong = "ll";
    var latlong2 = "ll";
   
    latlong = google.maps.geometry.encoding.decodePath(polyline);
    latlong2 = latlong;
   
    var myStringArray1 = latlong;
    var myStringArray2 = latlong2;
    var arrayLength2 = myStringArray2.length;
    var arrayLength1 = myStringArray1.length;
    //bearingArray(myStringArray2);
    
    for (var i = 0; i < arrayLength1; i++) {
        getDistance(myStringArray1[i], myStringArray1[i + 1]);
        if (i == (arrayLength1 - 2)) {
            $('#result2').html("i=" + i + " " + totalDist);
            bearingArray(myStringArray2,totalDist);
        }
    }

    
}

function bearingArray(myStringArray1,totalDist) {
    var arrayLength1 = myStringArray1.length;
    for (var i = 0; i < arrayLength1; i++) {
        getBearing(myStringArray1[i], myStringArray1[i + 1],totalDist);
        if (i == (arrayLength1 - 2)) {
            drawChart();
            showP();
        }
    }
}


function whichW(bearing, speed) {
    //  alert(bearing + " .. " + percent);
    if (bearing < 30) {
        w1 = speed;
    }
    if (bearing >= 30 && bearing < 60) {
        w2 = speed;
    }
    if (bearing >= 60 && bearing < 90) {
        w3 = speed;
    }
    if (bearing >= 90 && bearing < 120) {
        p4 = p4 + (percent / 100);
    }
    if (bearing >= 120 && bearing < 150) {
        p5 = p5 + (percent / 100);
    }
    if (bearing >= 150 && bearing < 180) {
        p6 = p6 + (percent / 100);
    }
    if (bearing >= 180 && bearing < 210) {
        p7 = p7 + (percent / 100);
        // alert("p7=" + p7);
    }
    if (bearing >= 210 && bearing < 240) {
        p8 = p8 + (percent / 100);
    }
    if (bearing >= 240 && bearing < 270) {
        p9 = p9 + (percent / 100);
    }
    if (bearing >= 270 && bearing < 300) {
        p10 = p10 + (percent / 100); ;
    }
    if (bearing >= 300 && bearing < 330) {
        p11 = p11 + (percent / 100);
    }
    if (bearing >= 330 && bearing < 360) {
        p12 = p12 + (percent / 100);
    }


}



function readW() {
    var jsondata = localStorage.getItem('wdata1')

    var parsed_json = eval('(' + jsondata + ')');
    //break down into 3 hour chunks and get an average dir and speed
    //push into json arrays
      

    var wvals = {
        chunk: []
    };

    var wchk0 = 0;
    var wchk1 = 0;
    var hourct = 0, chknum = 0;
    $.each(parsed_json.hourly_forecast, function (i, zone) {
        var imgi = new Image();
        imgi.src = "http://icons.wxug.com/i/c/i/" + zone.icon + ".gif";
        var ws = parseInt(zone.wspd.english);
        var temp = parseInt(zone.temp.metric);
        var tempc = parseInt(zone.temp.metric);
        var sky = parseInt(zone.sky);
        var rain_txt = parseInt(zone.qpf.metric);
        var hour = zone.FCTTIME.hour
        var rain = (parseInt(zone.qpf.metric) * 20) + 10;
        //wdir":{"dir":"WSW","degrees":"245"
        var wdir = parseInt(zone.wdir.degrees);
        if (hourct < 4) {
            wchk0 = wchk0 + ws
        } else if (hourct > 3 && hourct < 7) 

        
        hourct++;
        wvals.chunk.push({
            "chknum": chknum,
            "dir": wdir,
            "speed": ws
        });
        $('#result2').append(hour + ": Wind Speed=" + ws + " Direction=" + wdir + "</br>");
        
    });
    var wvalsjson = JSON.stringify(wvals)
    $('#result1').append("dir 3:" + wvalsjson);
  

}

function getW() {
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
                $('#result1').html("<br /> Location from data local new " + location);
                localStorage.setItem('wdata1', jsontext);
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

    function initMap() {
        alert("returning map2");
        var map = new google.maps.Map(document.getElementById('map_canvas'), {
            zoom: 4,
            center: { lat: -33, lng: 151 },
            zoomControl: false,
            scaleControl: true
        });

    }


    $(document).on('deviceready', function () {
        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBVDErdMAzGhcjVpaqCP4rDpCe7r6WcDog&sensor=false');
        //alert("ready");
    });

