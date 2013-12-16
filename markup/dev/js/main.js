var ui = {};

ui.initElems = [];
ui.init = function(){
	var i;
	for (i=0; i<this.initElems.length; i++){
		this[this.initElems[i]]();
	}
};
$(function () {
	ui.init();
});
ui.initIndexPage = function () {
	var lemonNav = $('#lemon-nav'),
		hintItems = lemonNav.find('.nav-hints__item'),
		descriptionList = lemonNav.find('.nav-descriptions'),
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
			descriptionPlace(index);
		}).on('mouseleave','#lemon-map area', function () {
			timeout = setTimeout(function () {
				if (activeElem>=0){
					hintItems.removeClass('nav-hints__item_active').eq(activeElem).addClass("nav-hints__item_active");
					descriptionItems.removeClass("nav-descriptions__item_active").eq(activeElem).addClass("nav-descriptions__item_active");
					descriptionPlace(activeElem);
				} else {
					hintItems.removeClass('nav-hints__item_active');
					descriptionItems.removeClass("nav-descriptions__item_active");
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
