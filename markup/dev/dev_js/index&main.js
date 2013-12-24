ui.initIndexPage = function () {
	var lemonNav = $('#lemon-nav'),
		hintItems = lemonNav.find('.nav-hints__item'),
		descriptionList = lemonNav.find('.nav-descriptions'),
		hoverSlices = lemonNav.find('.lemon__hover-slice'),
		descriptionItems = descriptionList.find('.nav-descriptions__item'),
		activeElem = -1,
		timeout = 0;
	if (lemonNav.size()){
		lemonNav.on('mouseenter','#lemon-map area', function () {
			var $this = $(this),
				index = $this.index();
			clearTimeout(timeout);
			hintItems.removeClass('nav-hints__item_active').eq(index).addClass("nav-hints__item_active");
			descriptionItems.removeClass("nav-descriptions__item_active").eq(index).addClass("nav-descriptions__item_active");
			hoverSlices.removeClass("lemon__hover-slice_active").eq(index).addClass("lemon__hover-slice_active");
			descriptionPlace(index);
		}).on('mouseleave','#lemon-map area', function () {
			timeout = setTimeout(function () {
				if (activeElem>=0){
					hintItems.removeClass('nav-hints__item_active').eq(activeElem).addClass("nav-hints__item_active");
					descriptionItems.removeClass("nav-descriptions__item_active").eq(activeElem).addClass("nav-descriptions__item_active");
					hoverSlices.removeClass("lemon__hover-slice_active").eq(activeElem).addClass("lemon__hover-slice_active");
					descriptionPlace(activeElem);
				} else {
					hintItems.removeClass('nav-hints__item_active');
					descriptionItems.removeClass("nav-descriptions__item_active");
					hoverSlices.removeClass("lemon__hover-slice_active");
				}
			}, 100);
		}).on('click',"#lemon-map area", function (e) {
			var $this = $(this);
			if ($this.hasClass('active')){
				activeElem = -1;
				$this.removeClass('active');
			} else {
				activeElem = $this.index();
				$this.addClass('active');
			}
			e.preventDefault();
		});
		function descriptionPlace(index) {
			if (index>4){
				descriptionList.addClass('nav-descriptions_right');
			} else {
				descriptionList.removeClass('nav-descriptions_right');
			}
		}
	}
}
ui.initElems.push("initIndexPage");