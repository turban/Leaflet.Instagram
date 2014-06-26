L.Instagram.Cluster = L.MarkerClusterGroup.extend({
	options: {
		featureGroup: L.instagram,		
		maxClusterRadius: 95,		
		showCoverageOnHover: false,
		iconCreateFunction: function(cluster) {
			var marker = cluster.getAllChildMarkers()[0],
				iconUrl = marker.image.image_thumb;
		
			return new L.DivIcon({
				className: 'leaflet-cluster-instagram',  
				html: '<img src="' + iconUrl + '"><b>' + cluster.getChildCount() + '</b>' 
			});
	   	}		
	},

	initialize: function (url, options) {	
		options = L.Util.setOptions(this, options);
		L.MarkerClusterGroup.prototype.initialize.call(this);
		this._instagram = options.featureGroup(url, options);
	},

	onAdd: function (map) {
		this._instagram.load().on('load', this._onLoad, this);
	},

	_onLoad: function (data) {
		this.addLayer(this._instagram._parse(data.data || data.rows || []));
		L.MarkerClusterGroup.prototype.onAdd.call(this, map);
	}
});

L.instagram.cluster = function (url, options) {
	return new L.Instagram.Cluster(url, options);	
};