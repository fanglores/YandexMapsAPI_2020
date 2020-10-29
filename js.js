ymaps.ready(init);

function init() 
{
    var myMap = new ymaps.Map('map', {
            center: [55.753994, 37.622093],
            zoom: 9
        }, {
            searchControlProvider: 'yandex#search'
        });
	
	var str = 'moscow, red square';
	ymaps.geocode(str, {results: 1}).then(function (res) {
		var firstGeoObject = res.geoObjects.get(0),
			coords = firstGeoObject.geometry.getCoordinates(),
			bounds = firstGeoObject.properties.get('boundedBy');
			
		firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
		firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

		myMap.geoObjects.add(firstGeoObject);
		
		find_metro(myMap, coords);
	});
}

function find_metro(myMap, crd)
{
	
	ymaps.geocode(crd, {
        kind: 'metro',
        results: 1
    }).then(function (res) {
            res.geoObjects.options.set('preset', 'islands#redCircleIcon');
			
            myMap.geoObjects.add(res.geoObjects);
			
			coords = res.geoObjects.get(0).geometry.getCoordinates();
			build_route(myMap, crd, coords);
        });
}

function build_route(myMap, pointA, pointB)
{
        multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: [
                pointA,
                pointB
            ],
            params: {
                routingMode: 'pedestrian'
            }
        }, {
            boundsAutoApply: true
        });
	
    myMap.geoObjects.add(multiRoute);
}



    



