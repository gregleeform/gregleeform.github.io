var registry = new naver.maps.MapTypeRegistry(); //지도유형 저장소 사용하기

var mapOptions = {
    center: new naver.maps.LatLng(35.22471386234804, 128.68400799201314),
    zoom: 18,
    mapTypes: registry,
    mapTypeId: naver.maps.MapTypeId.HYBRID //하이브리드 맵으로 셋팅
};


var map = new naver.maps.Map('map', mapOptions);

map.mapTypes.set(naver.maps.MapTypeId.SATELLITE, naver.maps.NaverStyleMapTypeOptions.getSatelliteMap());
