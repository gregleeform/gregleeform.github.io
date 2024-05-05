
var mapOptions = {
    center: new naver.maps.LatLng(35.22471386234804, 128.68400799201314),
    zoom: 18,
    mapTypeControl: true,
    mapTypeControlOptions: {
        style: naver.maps.MapTypeControlStyle.DROPDOWN
    },
    mapTypeId: naver.maps.MapTypeId.HYBRID //하이브리드 맵으로 셋팅
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