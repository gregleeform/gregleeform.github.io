
var HOME_PATH = window.HOME_PATH || '.'; //홈패쓰 추가
var position = new naver.maps.LatLng(35.22471386234804, 128.68400799201314);
var mapOptions = {
    center: position,
    zoom: 18,
    mapTypeControl: true,
    mapTypeControlOptions: {
        style: naver.maps.MapTypeControlStyle.DROPDOWN
    },
    padding: { top: 100 },
    zoomControl:true,
    zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL
    }
    //mapTypeId: naver.maps.MapTypeId.HYBRID //하이브리드 맵으로 셋팅
};


var map = new naver.maps.Map('map', mapOptions);


//타일 그리드 지도 유형 넣기
var tileGridLayer = new naver.maps.Layer('tileGrid', {
    name: "TileGrid",
    minZoom: -1,
    maxZoom: 14,
    tileSize: new naver.maps.Size(256, 256),
    getTile: function(x, y, z) {
        var div = $('<div class="tilegrid">('+ [z, x, y].join(', ')+')</div>');
                
        return div[0];
    }
});

tileGridLayer.setMap(map);

//이미지 아이콘 사용하기
var markerOptions = {
    position: position.destinationPoint(90, 15),
    map: map,
    icon: {
        url: HOME_PATH +'/img_maps/marker01.png',
        size: new naver.maps.Size(50, 56),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 52)
    },
    draggable: true
};

var marker = new naver.maps.Marker(markerOptions);

//초록색 마커추가
// var greenMarker = new naver.maps.Marker({
//     position: new naver.maps.LatLng(35.22471386234804, 128.68400799201314),
//     map: map,
//     title: 'Green',
//     icon: {
//         content: [
//                     '<div class="cs_mapbridge">',
//                         '<div class="map_group _map_group crs">',
//                             '<div class="map_marker _marker num1 num1_big"> ',
//                                 '<span class="ico _icon"></span>',
//                                 '<span class="shd"></span>',
//                             '</div>',
//                         '</div>',
//                     '</div>'
//                 ].join(''),
//         size: new naver.maps.Size(38, 58),
//         anchor: new naver.maps.Point(19, 58),
//     },
//     draggable: true
// });

//오픈스트릿 맵 이미지타일형식 추가
// var openStreetMapType = new naver.maps.ImageMapType({
//     name: 'OSM',
//     minZoom: 0,
//     maxZoom: 19,
//     tileSize: new naver.maps.Size(256, 256),
//     projection: naver.maps.EPSG3857,
//     repeatX: true,
//     tileSet: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
//     provider: [{
//         title: " /OpenStreetMap", // 출처 표기는 이미지 제공처의 정책을 따라야 합니다.
//         link: "http://www.openstreetmap.org/copyright"
//     }]
// });

// map.mapTypes.set('osm', openStreetMapType);
// map.setMapTypeId('osm');


//화면 좌표 offset Coordinate
// var myMenu = document.createElement('div');
// myMenu.style.position = 'absolute';
// myMenu.style.zIndex = 10000;

// map.getPanes().overlayLayer.appendChild(myMenu);

// naver.maps.Event.addListener(map, 'rightclick', function(e) {
//     var offset = e.offset;

//     myMenu.style.left = offset.x +'px';
//     myMenu.style.top = offset.y +'px';
// });

//이벤트리스너 등록 및 제거
// var markerOptions = {
//     position: map.getCenter(),
//     map: map,
//     title: 'Click to zoom'
// };

// var marker = new naver.maps.Marker(markerOptions);

// var mapElement = map.getElement();

// var listener = naver.maps.Event.addDOMListener(mapElement, 'click', function() {
//     map.setZoom(19);
//     map.setCenter(marker.getPosition());

//     // naver.maps.Event.removeDOMListener(listener);
// });

//KVO상태 변경 알림
var contentEl = $('<div class="iw_inner" style="width:350px;position:absolute;top:0;right:0;z-index:1000;background-color:#fff;border:solid 1px #333;">'
    + '<h3>Map States</h3>'
    + '<p style="font-size:14px;">zoom : <em class="zoom">'+ map.getZoom() +'</em></p>'
    + '<p style="font-size:14px;">center : <em class="center">'+ map.getCenter() +'</em></p>'
    + '<p style="font-size:14px;">bounds : <em class="bounds">'+ map.getBounds() +'</em></p>'
    + '</div>');

contentEl.appendTo(map.getElement());

naver.maps.Event.addListener(map, 'zoom_changed', function(zoom) {
    contentEl.find('.zoom').text(zoom);
});

naver.maps.Event.addListener(map, 'bounds_changed', function(bounds) {
    contentEl.find('.center').text(map.getCenter());
    contentEl.find('.bounds').text(bounds);
});