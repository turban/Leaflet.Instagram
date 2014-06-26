Leaflet.Instagram
=================

Plugin to show Instagram photos and videos on your Leaflet map. [Read more](http://blog.thematicmapping.org/2014/06/showing-instagram-photos-and-videos-on.html)

Requires
--------
[Leaflet](http://leafletjs.com/)

[reqwest](https://github.com/ded/reqwest)

Image cluster also requires: 

[Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)

Fancybox also requires:

[jQuery](http://jquery.com/)

[fancyBox](http://fancyapps.com/fancybox/)

Usage
-----

Load data from [Instagram API](http://instagram.com/developer/):
```JavaScript
L.instagram('instagram_api_url_with_access_token').addTo(map);
```

Load data from [CartoDB](http://blog.thematicmapping.org/2014/06/syncing-your-instagram-photos-to-cartodb.html):
```JavaScript
L.instagram('cartodb_url_with_sql').addTo(map); 
```

[See example](http://turban.github.io/Leaflet.Instagram/examples/popup.html)

With image cluster
```JavaScript
L.instagram.cluster('cartodb_url_with_sql').addTo(map); 
```

[See example](http://turban.github.io/Leaflet.Instagram/examples/popup-cluster.html)

Fancybox instead of popup:
```JavaScript
L.instagram.fancybox('cartodb_url_with_sql').addTo(map); 
```

[See example](http://turban.github.io/Leaflet.Instagram/examples/fancybox.html)

Fancybox with image cluster:
```JavaScript
L.instagram.cluster('cartodb_url_with_sql', {
	featureGroup: L.instagram.fancybox
}).addTo(map); 
```

[See example](http://turban.github.io/Leaflet.Instagram/examples/fancybox-cluster.html)
