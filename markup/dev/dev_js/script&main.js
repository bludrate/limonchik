ui.initGallery = function () {
	var galleryHolder,
		sly = {};
	if ("Sly" in window) {
		galleryHolder = $('.gallery');
		sly.elems = [];
		galleryHolder.each(function () {
			var $this = $(this),
				elems = $this.find('.gallery__list-item');
			$this.find('.gallery__list').width(elems.size()*elems.eq(1).outerWidth(true)-44);
			sly.elems.push(new Sly($this.find('.gallery__frame'),{
				itemNav:'basic',
				horizontal: 1,
	            activateOn: 'click',
	            mouseDragging: 1,
	            touchDragging: 1,
	            releaseSwing: 1,
	            swingSpeed: 0.2,
	            speed: 300,
	            elasticBounds: 0,
	            easing: "swing",
	            prevPage: $this.find('.gallery__prev'),
	            nextPage: $this.find('.gallery__next'),
	            pagesBar: $this.find(".gallery__switchers"),
	            activatePageOn: 'click',
	            pageBuilder: function(i){
	            	return '<li class="gallery__switchers-item"><a>'+(i+1)+'</a></li> ';
	            }
			}).init());
		});
	}
}
ui.initElems.push("initGallery");