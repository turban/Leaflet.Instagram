L.Instagram.Fancybox = L.Instagram.extend({
	options: {
		fancybox: {
			helpers: { title: { type: 'inside' } },
			aspectRatio: true,
			autoSize: false,
			width: 640,
			height: 640
		},
		onClick: function(evt) {
			var image = evt.layer.image;
			if (image.type === 'video' && (!!document.createElement('video').canPlayType('video/mp4; codecs=avc1.42E01E,mp4a.40.2'))) {
				$.fancybox({
					type: 'inline',
					content: '<video autoplay controls poster="' + image.image_standard + '"><source src="' + image.video_standard + '" type="video/mp4"/></video>',
					title: image.caption
				}, this.options.fancybox);	
			} else {
				$.fancybox({
					href: image.image_standard,
					title: image.caption
				}, this.options.fancybox);	
			}
		}		
	}
});

L.instagram.fancybox = function (url, options) {
	return new L.Instagram.Fancybox(url, options);
};