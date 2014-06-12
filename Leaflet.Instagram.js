L.Instagram = L.FeatureGroup.extend({
	options: {
		icon: {						
			iconSize: [40, 40],
			className: 'leaflet-marker-instagram'
		},
		fancybox: {
			helpers: { title: { type: 'inside' } },
			aspectRatio: true,
			autoSize: false,
			width: 640,
			height: 640
		}
	},

    initialize: function(url, options) {	
		L.setOptions(this, options);
		L.FeatureGroup.prototype.initialize.call(this);
		this._numLayers = 0;
		this._gallery = [];

		this.load(url);
		this.on('click', this.onClick, this);

		if (this.options.stripEl) {
			var self = this;
			$(this.options.stripEl).click(function(evt) {
				self.openGallery($(evt.target).data('index'));
			});
		}
    },

	load: function (url) {
		var options = this.options,
		    self = this;

		$.getJSON(url + ((url.indexOf('?') === -1) ? '?' : '&') + 'callback=?', function(data) {
			self.parse(data.data || data.rows || []);
		});
	},

	parse: function (images) {
		for (var i = 0, len = images.length; i < len; i++) {
			var image = images[i];
			if (image.images) { // Instagram API
				if (image.location) {
					if (this.options.filter) {
						if (image.tags && image.tags.indexOf(this.options.filter) !== -1) {
							this.addLayer(this.parseImage(image));
						} 
					} else {
						this.addLayer(this.parseImage(image));
					}
				}
			} else { // CartoDB
				this.addLayer(image);
			}
		}
	},

	// Simplify image format from Instagram API
	parseImage: function (image) {
		return {
			latitude:       image.location.latitude,
			longitude:      image.location.longitude,
			image_thumb:    image.images.thumbnail.url,
			image_standard: image.images.standard_resolution.url,
			caption:        (image.caption) ? image.caption.text : '',
			type: 			image.type,			
			video_standard: (image.type === 'video') ? image.videos.standard_resolution.url : null 
		};
	},

	addLayer: function (image) {	
		var marker = L.marker([image.latitude, image.longitude], {
			icon: L.icon(L.extend({
				iconUrl: image.image_thumb		
			}, this.options.icon)),
			title: image.caption || '',
			index: this._numLayers++
		});		
		L.FeatureGroup.prototype.addLayer.call(this, marker);

		if (image.type === 'video' && (!!document.createElement('video').canPlayType('video/mp4; codecs=avc1.42E01E,mp4a.40.2'))) {
			this._gallery.push({
				type: 'inline',
				content: '<video autoplay controls poster="' + image.image_standard + '"><source src="' + image.video_standard + '" type="video/mp4"/></video>',
				title: image.caption
			});	
		} else { // image
			this._gallery.push({
				href: image.image_standard,
				title: image.caption
			});		
		}

		if (this.options.stripEl) {
			this.options.stripEl.append('<img src="' + image.image_low + '" data-index="' + (this._numLayers - 1) + '">');
		}
	},

	onClick: function (evt) {
		this.openGallery(evt.layer.options.index);
	},

	openGallery: function (index) {
		$.fancybox(this._gallery, L.extend({
			index: index,
		}, this.options.fancybox));		
	}

});

L.instagram = function (url, options) {
	return new L.Instagram(url, options);
};