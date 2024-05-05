
var mapOptions = {
    center: new naver.maps.LatLng(35.22471386234804, 128.68400799201314),
    zoom: 18,
    mapTypeControl: true,
    mapTypeControlOptions: {
        style: naver.maps.MapTypeControlStyle.DROPDOWN
    },
    //mapTypeId: naver.maps.MapTypeId.HYBRID //하이브리드 맵으로 셋팅
};


var map = new naver.maps.Map('map', mapOptions);


//타일 그리드 지도 유형 넣기
// var div;
// var tileGridLayer = new naver.maps.Layer('tileGrid', {
//     name: "TileGrid",
//     minZoom: -1,
//     maxZoom: 14,
//     tileSize: new naver.maps.Size(256, 256),
//     getTile: function(x, y, z) {
//         var div = $('<div class="tilegrid">('+ [z, x, y].join(', ')+')</div>');

//         return div[0];
//     }
// });

// tileGridLayer.setMap(map);




var openStreetMapType = new naver.maps.ImageMapType({
    name: 'OSM',
    minZoom: 0,
    maxZoom: 19,
    tileSize: new naver.maps.Size(256, 256),
    projection: naver.maps.EPSG3857,
    repeatX: true,
    tileSet: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
    provider: [{
        title: " /OpenStreetMap", // 출처 표기는 이미지 제공처의 정책을 따라야 합니다.
        link: "http://www.openstreetmap.org/copyright"
    }]
});

map.mapTypes.set('osm', openStreetMapType);
map.setMapTypeId('osm');

//화면 좌표 offset Coordinate
var myMenu = document.createElement('div');
myMenu.style.position = 'absolute';
myMenu.style.zIndex = 10000;

map.getPanes().overlayLayer.appendChild(myMenu);

naver.maps.Event.addListener(map, 'rightclick', function(e) {
    var offset = e.offset;

    myMenu.style.left = offset.x +'px';
    myMenu.style.top = offset.y +'px';
});