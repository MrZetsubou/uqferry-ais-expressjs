var map = null;
var lat = -16.495352;
var lng = 91.801168;
var iconLatlng = new google.maps.LatLng(-27.492817, 153.007751);

var markers = new Array();

function initialize()
{
    var myLatlng = new google.maps.LatLng(-27.492817, 153.007751);
    var mapProp = {
        center: myLatlng,
        zoom:15,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

}


google.maps.event.addDomListener(window, 'load', initialize);

var socket = io.connect('http://winter.ceit.uq.edu.au:3000');

socket.on('connect', function () {
    socket.on('mqtt', function (msg) {
        var jsonMsg = JSON.parse(msg.payload.toString());

        var modLat = jsonMsg.lat.toString();
        modLat = convertLatlng(modLat);
        var modLng = jsonMsg.lon.toString();
        modLng = convertLatlng(modLng);

        lat = parseFloat(modLat);
        lng = parseFloat(modLng);
        if (jsonMsg.TimeStamp  == null || jsonMsg.TimeStamp == "") {
            //setMarker(lat, lng, jsonMsg.mmsi);
            console.log('First ship not given marker');
        } else {
            setMarker(lat, lng, jsonMsg.mmsi);
            //console.log('MMSI !:!:!: ' + jsonMsg.mmsi);
        }
    });
    socket.emit('subscribe',{topic:'/uq/ferry/json1'});
});



function setMarker(nlat, nlng, sid) {
    var markerLatlng = new google.maps.LatLng(nlat, nlng);
    if (markers.length <= 0) {
        console.log('Array 0 Length');
        var seconds = new Date().getTime() / 1000;
        var marker = new google.maps.Marker({
                position: markerLatlng,
                map: map,
                icon: 'images/sailboat.png'
        });
        marker.setValues({id:sid, time:seconds});
        markers[0] = marker;
        setInfoWindow(markers[0]);
    } else {
        var index = 0;
        console.log('ARRAY LENGTH: ' + markers.length);
        for (var i = 0; i < markers.length; i++) {
            console.log(sid + " |||| " + markers[i].id);
            if (sid == markers[i].id) {
                markers[i].setMap(null);

                break;
            }
        index++;

        }
        var seconds = new Date().getTime() / 1000;

        var image = {
                url: 'images/45.png',
                size: new google.maps.Size(12,13),
                origin: new google.maps.Point(6, 7),
                anchor: new google.maps.Point(0, 13)
        };
        var newMarker = new google.maps.Marker({
                position: markerLatlng,
                map: map,
                icon: 'images/sailboat.png'
        });
        newMarker.setValues({id:sid, time:seconds});
        markers[index] = newMarker;
        setInfoWindow(markers[index]);
        console.log("MY SID === " + markers[index].id);
    }
}

function setInfoWindow (marker) {
    var contentString = '<div>' +
                        'mmsi = ' + marker.id +
                        '</div>';
    var infoWindow = new google.maps.InfoWindow({
        content: contentString
    });

    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.open(map, marker);
    });
};

String.prototype.insert = function (index, string) {
    if (index > 0)
        return this.substring(0, index) + string + this.substring(index, this.length);

    else
        return string + this;
};

function convertLatlng(latOrlng) {
    var newLatOrLng = parseFloat(latOrlng);
    newLatOrLng = newLatOrLng / 600000.0;
    return newLatOrLng;
};


