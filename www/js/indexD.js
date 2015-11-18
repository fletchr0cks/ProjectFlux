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
    p1 = parseInt(x10(p1));
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
        color: "#f93",
        highlight: "#f93",
        label: "% NNE"
    },
    {
        value: p2,
        color: "#f93",
        highlight: "#f93",
        label: "% NNE"
    },
    {
        value: p3,
        color: "#f93",
        highlight: "#f93",
        label: "% NNE"
    },
    {
        value: p4,
        color: "#f93",
        highlight: "#f93",
        label: "% NNE"
    },
    {
        value: p5,
        color: "#f93",
        highlight: "#f93",
        label: "% NNE"
    },
    {
        value: p6,
       color: "#f93",
        highlight: "#f93",
        label: "% NNE"
    },
    {
        value: p7,
        color: "#f93",
        highlight: "#f93",
        label: "% NNE"
    },
	{
		value: p8,
		color: "#f93",
        highlight: "#f93",
        label: "% NNE"
	},
	{
		value: p9,
		color: "#f93",
        highlight: "#f93",
        label: "% NNE"
	},
	{
		value: p10,
		color: "#f93",
        highlight: "#f93",
        label: "% NNE"
	},
	{
		value: p11,
		color: "#f93",
        highlight: "#f93",
        label: "% NNE"
	},
	{
		value: p12,
		color: "#f93",
        highlight: "#f93",
        label: "% NNE"
	}];

    localStorage.setItem('gameStorage', JSON.stringify(obj));
    //And to retrieve the object later, such as on page refresh or browser close/open...

    var obj = JSON.parse(localStorage.getItem('gameStorage'));
    var ctx = document.getElementById("chart-area").getContext("2d");
    //alert("p1= " + p1);
    window.myPolarArea = new Chart(ctx).PolarArea(obj, {
        responsive: true,
        showScale: true,
        scaleOverride: false,
        scaleShowLabels: false,
        scaleLineColor: "#2fb4c8",
        segmentShowStroke : false,
        scaleLineWidth: 1,
        tooltipTemplate: "<%if (label){%><%= value %><%}%><%=label%>",

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: 1,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: 1,
    // Number - The scale starting value
    scaleStartValue: 0
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

function back() {

 $('#act_table').show();
 $('#seg_data').hide();
}

function poly1() {
    decodepoly("}vculjey0cF{jAjK'A");
}

function poly2(i,name) {
    $('#act_table').hide();
    $('#seg_data').show();
    $('#static_map').fadeIn();
    var json = localStorage.getItem('segdata');
    var j2 = eval('(' + json + ')');

    var pl = j2.segs[i].poly;
    drawMap(pl);
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
    $('#title').html(name);
    decodepoly(pl);

   
}

function drawMap(poly) {

var mapStyle = [{elementType:"geometry",stylers:[{hue:"#ff4400"},{saturation:-68},{lightness:-4},{gamma:.72}]},{featureType:"road",elementType:"labels.icon"},{featureType:"landscape.man_made",elementType:"geometry",stylers:[{hue:"#0077ff"},{gamma:3.1}]},{featureType:"water",stylers:[{hue:"#00ccff"},{gamma:.44},{saturation:-33}]},{featureType:"poi.park",stylers:[{hue:"#44ff00"},{saturation:-23}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{hue:"#007fff"},{gamma:.77},{saturation:65},{lightness:99}]},{featureType:"water",elementType:"labels.text.stroke",stylers:[{gamma:.11},{weight:5.6},{saturation:99},{hue:"#0091ff"},{lightness:-86}]},{featureType:"transit.line",elementType:"geometry",stylers:[{lightness:-48},{hue:"#ff5e00"},{gamma:1.2},{saturation:-23}]},{featureType:"transit",elementType:"labels.text.stroke",stylers:[{saturation:-64},{hue:"#ff9100"},{lightness:16},{gamma:.47},{weight:2.7}]}];
var bwstyle = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0f252e"
            },
            {
                "lightness": 10
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2fb4c8"
            },
            {
                "lightness": 50
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 80
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0f252e"
            },
            {
                "lightness": 100
            }
        ]
    }
];
var src = get_static_style(bwstyle);

//$("#map").append("<img src=\"http://maps.googleapis.com/maps/api/staticmap?center=Cape%20Canaveral&zoom=10&format=png&sensor=false&size=700x320&maptype=roadmap&markers=color:brown|Cape%20Canaveral&"+src+"\">");

var map = "<img src=\"https://maps.googleapis.com/maps/api/staticmap?size=150x150&path=weight:3%7Ccolor:orange%7Cenc:" + poly + "&" + src + "&key=AIzaSyBVDErdMAzGhcjVpaqCP4rDpCe7r6WcDog\" alt=\"segment map\" />";
$('#static_map').html(map);

}

function get_static_style(styles) {
    var result = [];
    styles.forEach(function(v, i, a){
        
        var style='';
        if( v.stylers ) { // only if there is a styler object
            if (v.stylers.length > 0) { // Needs to have a style rule to be valid.
                style += (v.hasOwnProperty('featureType') ? 'feature:' + v.featureType : 'feature:all') + '|';
                style += (v.hasOwnProperty('elementType') ? 'element:' + v.elementType : 'element:all') + '|';
                v.stylers.forEach(function(val, i, a){
                    var propertyname = Object.keys(val)[0];
                    var propertyval = val[propertyname].toString().replace('#', '0x');
                    style += propertyname + ':' + propertyval + '|';
                });
            }
        }
        result.push('style='+encodeURIComponent(style));
    });
    
    return result.join('&');
}

function maptest() {
alert("hi");
var mapStyle = [{elementType:"geometry",stylers:[{hue:"#ff4400"},{saturation:-68},{lightness:-4},{gamma:.72}]},{featureType:"road",elementType:"labels.icon"},{featureType:"landscape.man_made",elementType:"geometry",stylers:[{hue:"#0077ff"},{gamma:3.1}]},{featureType:"water",stylers:[{hue:"#00ccff"},{gamma:.44},{saturation:-33}]},{featureType:"poi.park",stylers:[{hue:"#44ff00"},{saturation:-23}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{hue:"#007fff"},{gamma:.77},{saturation:65},{lightness:99}]},{featureType:"water",elementType:"labels.text.stroke",stylers:[{gamma:.11},{weight:5.6},{saturation:99},{hue:"#0091ff"},{lightness:-86}]},{featureType:"transit.line",elementType:"geometry",stylers:[{lightness:-48},{hue:"#ff5e00"},{gamma:1.2},{saturation:-23}]},{featureType:"transit",elementType:"labels.text.stroke",stylers:[{saturation:-64},{hue:"#ff9100"},{lightness:16},{gamma:.47},{weight:2.7}]}];
var src = get_static_style(mapStyle);

$("#map").append("<img src=\"http://maps.googleapis.com/maps/api/staticmap?center=Cape%20Canaveral&zoom=10&format=png&sensor=false&size=700x320&maptype=roadmap&markers=color:brown|Cape%20Canaveral&"+src+"\">");
}


function decodepoly(polyline) {
   
    var latlong = "ll";
    var latlong2 = "ll";
   
    latlong = google.maps.geometry.encoding.decodePath(polyline);
    latlong2 = latlong;
    //initMap(latlong);
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
            drawWeather();
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
            wchk0 = wchk0 + ws;
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


function drawWeather() {
    var jsondata = localStorage.getItem('wdata1')
    var parsed_json = eval('(' + jsondata + ')');
    
        //alert("cached");
        var cutoff = parseInt("16");
        var location = parsed_json['location']['city'];
        //alert(location);
        //var theDatas = new Lawnchair('data');
        var timenow = new Date();
        var hour_now = timenow.getHours();
        var today = timenow.getDate();
       // var timesaved = theJsonData.timesaved;
        //if (age == "olddata") {
    //    $('#loc_result').append("<br /> cached data from: " + age);
        // }
      //  var country = parsed_json['location']['country'];
        //alert("saved= " + json_data);
        var posy = 54;
        var posyt = 65;
        var example = document.getElementById('weather');
        var ctx2d = example.getContext('2d');
        ctx2d.fillStyle = "#000";
        ctx2d.fillRect(0, 0, 450, 2000);
        var ni = 1;
        var done_dt = 0;
        var first_hour = -1;
        hour_bg_bk = "000";
        var totalsnow = 0;
        //var diff = (Math.round(new Date().getTime() / 1000) - epochdata) / 360;
        //var hours = Math.round(diff);
        var dt = parseInt(0);
        var dt_ct = parseInt(0);
        var total_score = parseInt(0);

        ctx2d.fillStyle = '#FFF';
        ctx2d.font = '14px Arial';
        //ctx2d.fillText("Hourly weather for " + location + ".", 0, 10);
        //ctx2d.fillText("Last updated: " + hours + " hours ago.", 0, 30);

        ctx2d.fillStyle = "#f2e857";
        ctx2d.fillRect(0, 10, 60, 16);
        ctx2d.fillStyle = '#000';
        ctx2d.font = '11px Arial';
        ctx2d.fillText("Wind (mph)", 2, 22);

        ctx2d.fillStyle = "#66A68B";
        ctx2d.fillRect(60, 10, 55, 16);
        ctx2d.fillStyle = '#FFF';
        ctx2d.font = '11px Arial';
        ctx2d.fillText("Temp (C)", 64, 22);

        ctx2d.fillStyle = "#2489ce";
        ctx2d.fillRect(115, 10, 55, 16);
        ctx2d.fillStyle = '#FFF';
        ctx2d.font = '11px Arial';
        ctx2d.fillText("Rain (mm)", 119, 22);

        ctx2d.beginPath();
        ctx2d.moveTo(1, 50);
        ctx2d.lineTo(1, 1000);
        ctx2d.strokeStyle = "#2fb4c8";
        ctx2d.stroke();

        ctx2d.beginPath();
        ctx2d.moveTo(300, 50);
        ctx2d.lineTo(300, 1000);
        ctx2d.strokeStyle = "#2fb4c8";
        ctx2d.stroke();

       // ctx2d.fillStyle = "#FFF";
       // ctx2d.fillRect(170, 40, 60, 16);
       // ctx2d.fillStyle = '#000';
       // ctx2d.font = '11px Arial';
       // ctx2d.fillText("Snow (mm)", 172, 52);

        $.each(parsed_json.hourly_forecast, function(i, zone) {
            var imgi = new Image();
            imgi.src = "http://icons.wxug.com/i/c/i/" + zone.icon + ".gif";
            var ws = (parseInt(zone.wspd.english) * 6) + 10;
            var temp = (parseInt(zone.temp.metric) * 3) + 10;
            var start = 53;
            if (parseInt(zone.temp.metric) < 1) {
                start = 42 + (parseInt(zone.temp.metric) * 3);
                temp = 53 - start;
            }
            var hour = zone.FCTTIME.hour;
            if (hour > 12) {
                hour = hour - 12
            }
            var sky = parseInt(zone.sky);
            var rain_txt = parseInt(zone.qpf.metric);

            var rain = (parseInt(zone.qpf.metric) * 20) + 10;
            var snowlen = Math.round(zone.snow.metric);
            totalsnow = totalsnow + Math.round(zone.snow.metric);

            var snow = (parseInt(zone.snow.metric) * 2) + 10;
            var hour_bg_bk = "9F9F9F";
            var border = "2fb4c8";
            var wind_bg = "51D251";
            var temp_bg = "FFB336";
            var wind_txt = "2f3e46";
            var temp_txt = "FFF";
            var ampm = zone.FCTTIME.ampm;
            if (first_hour == -1) {
                first_hour = zone.FCTTIME.hour;
            }
            var humid = parseInt(zone.humidity);
            var score = Math.round(((parseInt(zone.wspd.english) * 2) + (parseInt(zone.temp.metric) * 2) + (((100 - sky) / 5) * 4) + (((100 - humid) / 10) * 15)) / 2);
            var new_score = 0;

            if (humid < 80) {
                new_score = Math.round((parseInt(zone.wspd.metric) * 3) + (parseInt(zone.temp.metric) * 2) + (100 - sky));

            }

            var cond = zone.condition;

            var yday = parseInt(zone.FCTTIME.yday);
            var hour_padded = parseInt(zone.FCTTIME.hour);
            var civil = parseInt(zone.FCTTIME.civil);

            var userhtml = " ";

            //ctx2d.fillStyle = "#778899";
            //ctx2d.fillRect(0, posy+2, 2, 44);
            //ctx2d.drawImage(imgi, 2, posy)
            //here
            ctx2d.font = '20px Arial';
            ctx2d.fillStyle = '#FFF';
            if (hour < 10) {

                ctx2d.fillText(hour, 16, posyt + 10);
            } else {
                ctx2d.fillText(hour, 6, posyt + 10);
            }

            ctx2d.font = '10px Arial';
            ctx2d.fillText(ampm, 30, posyt + 10);

            //border
            ctx2d.fillStyle = "#2fb4c8";
            ctx2d.fillRect(0, posy - 5, 300, 1);
            
            //ctx2d.fillRect(posy - 5, posy + 76, 81, 1);

            //wind
            ctx2d.fillStyle = "#f2e857";
            ctx2d.fillRect(53, posy + 16, ws, 16);
            ctx2d.font = '10px Arial';
            ctx2d.fillStyle = wind_txt;
            ctx2d.fillText(zone.wspd.metric, 40 + ws, posyt + 17);

            //temp
            ctx2d.fillStyle = "#66A68B";
            ctx2d.fillRect(start, posy + 32, temp, 16);
            ctx2d.font = '10px Arial';
            ctx2d.fillStyle = temp_txt;
            ctx2d.fillText(zone.temp.metric, (start + 2), posyt + 33);

            //rain
            if (rain == 10 || zone.qpf.metric.length == 0) {
                ctx2d.fillStyle = "#2489ce";
                ctx2d.fillRect(53, posy + 48, 10, 16);
                ctx2d.font = '10px Arial';
                ctx2d.fillStyle = "FFF";
                ctx2d.fillText("0", 55, posyt + 49);
            } else {
                ctx2d.fillStyle = "#2489ce";
                ctx2d.fillRect(53, posy + 48, rain, 16);
                ctx2d.font = '10px Arial';
                ctx2d.fillStyle = "FFF";
                ctx2d.fillText(rain_txt, 45 + rain, posyt + 49);
            }


            //snow
           // ctx2d.fillStyle = "#FFF";
           // ctx2d.fillRect(53, posy + 64, snow, 16);
          //  ctx2d.font = '10px Arial';
          //  ctx2d.fillStyle = "#000";
          //  ctx2d.fillText(parseInt(zone.snow.metric), 53 + snow - (snowlen.toString().length * 12), posyt + 65);

            total_score = total_score + new_score;

            dt_ct = dt_ct + 1;

            ctx2d.font = '12px Arial';
            ctx2d.fillStyle = "#FFF";
            ctx2d.fillText(cond, 53, posyt);

            ctx2d.font = '13px Arial Bold ';

            posy = posy + 76;
            posyt = posyt + 76;

        });

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

    //https://maps.googleapis.com/maps/api/staticmap?size=400x400&path=weight:3%7Ccolor:orange%7Cenc:polyline_data&key=YOUR_API_KEY


    function initMap(poly) {
     
        var map = new google.maps.Map(document.getElementById('map_canvas'), {
            zoom: 13,
            center: { lat: 56.052, lng: -2.732 },
            zoomControl: false,
            scaleControl: true,
        });

        //var flightPlanCoordinates = poly;

        var flightPath = new google.maps.Polyline({
            path: poly,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2            
        });

        flightPath.setMap(map);

    }


    $(document).on('deviceready', function () {
        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyBVDErdMAzGhcjVpaqCP4rDpCe7r6WcDog&sensor=false');
        //alert("ready");
    });

