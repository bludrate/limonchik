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
ui.initMessageSend = function () {
	var form = $('#feedback'),
		inputs,
		ajaxSend = false,
		errorFlag;
	if (form.size() && !ajaxSend) {
		inputs = form.find('input, textarea, select');
		form.height(form.height());
		form.submit(function (e) {
			errorFlag = false;
			inputs.filter('[type=submit]').attr('disabled',"disabled").parent().addClass('disabled');
			inputs.filter("[name=name]").each(function () {
				if (!(this.value.match(/^[a-zA-Z\s]{3,}$/))) {
					$(this).addClass('field-error').one('change input', function () {
						$(this).removeClass('field-error');
					});
					errorFlag = true;
				}
			});
			inputs.filter("[name=phone]").each(function () {
				if (!(this.value.match(/^[0-9\(\)\s]{7,}$/))) {
					$(this).addClass('field-error').one('change input', function () {
						$(this).removeClass('field-error');
					});
					errorFlag = true;
				}
			});
			inputs.filter("[name=email]").each(function () {
				if (!ui.checkmail(this.value)) {
					$(this).addClass('field-error').one('change input', function () {
						$(this).removeClass('field-error');
					});
					errorFlag = true;
				}
			});
			inputs.filter("[name=message]").each(function () {
				if (this.value.length<4) {
					$(this).addClass('field-error').one('change input', function () {
						$(this).removeClass('field-error');
					});
					errorFlag = true;
				}
			});
			if (!errorFlag && !ajaxSend) {
				ajaxSend = true;
				$.ajax({
					type: "POST",
					url: form.attr('action'),
					data: form.serialize(),
					success: function (e) {
						if (e.toLowerCase().indexOf('ошибка')>=0) {
							alert(e);
						} else {
							form.html(ui.sendFormMessage(e));
						}
						ajaxSend = false;
						inputs.filter('[type=submit]').removeAttr('disabled').parent().removeClass('disabled');
					},
					error: function () {
						alert("Ошибка отправки письма. Попробуйте позже.");
						ajaxSend = false;
						inputs.filter('[type=submit]').removeAttr('disabled').parent().removeClass('disabled');
					}
				});
			} else {
				inputs.filter('[type=submit]').removeAttr('disabled').parent().removeClass('disabled');
			}
			e.preventDefault();
		});
	}
}
ui.sendFormMessage = function (message) {
	return "<div class='feedback__message'>"+message+"</div>";
}
ui.checkmail = function (value) {
	reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	if (!value.match(reg)) {
		return false;
	} else {
		return true;
	}
}
ui.initElems.push("initMessageSend");
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
ui.pagingsHTML = function (settings){
  var settings = $.extend({
        active: 0,
        elemsCount:100,
        perPage:10,
        elemClass: "pin__pagings__elem",
        elemActiveClass:"pin__pagings__elem_active",
        elemDisabledClass: "disabled",
        emptyElemHtml:"...",
        maxPagingsCount: 8,
        roundActiveCount: 3,
        emptyElemClass: "pin__pagings__elem_empty",
        arrows: false,
        arrowsClasses: ['prev','next']
      },settings),
      pagings_count = Math.ceil(settings.elemsCount/settings.perPage),
      html = "",
      i;
  if (settings.arrows){
  	html+="<li class='"+settings.elemClass+" "+settings.arrowsClasses[0]+(settings.active==0?" "+settings.elemDisabledClass:"")+"'><a rel='"+(settings.active-1<0 ? 0 : settings.active -1)+"' href='#'>"+settings.arrows[0]+"</a></li>";
  }
  if (pagings_count > settings.maxPagingsCount) {
    if (settings.active > (settings.roundActiveCount-1)/2) {
      html += "<li class='"+settings.elemClass+"'><a rel='1'>1</a></li>\n"+
              "<li class='"+settings.elemClass+" "+settings.emptyElemClass+"'>"+settings.emptyElemHtml+"</li>\n";
      for (i = settings.active-(settings.roundActiveCount-1)/2; i < settings.active; i++) {
        html += "<li class='"+settings.elemClass+"'><a rel='"+i+"''>"+(i+1)+"</a></li>\n";
      }
      html += "<li class='"+settings.elemClass+" "+settings.elemActiveClass+"'><a rel='"+i+"'>"+(i+1)+"</a></li>\n";
    } else {
      for (i = 0; i < settings.active; i++) {
        html += "<li class='"+settings.elemClass+"'><a rel='"+i+"'>"+(i+1)+"</a></li>\n";
      }
      html += "<li class='"+settings.elemActiveClass+" "+settings.elemClass+"'><a rel='"+i+"'>"+(i+1)+"</a></li>\n";
    }
    if(pagings_count - settings.active -1 > (settings.roundActiveCount-1)/2) {
      for (i =settings.active+1; i <= settings.active+(settings.roundActiveCount-1)/2; i++){
        html += "<li class='"+settings.elemClass+"'><a rel='"+i+"'>"+(i+1)+"</a></li>\n";
      }
      html += "<li class='"+settings.elemClass+" "+settings.emptyElemClass+"'>"+settings.emptyElemHtml+"</li>\n"+
              "<li class='"+settings.elemClass+"'><a rel='"+(pagings_count-1)+"'>"+(pagings_count)+"</a></li>\n";
    } else {
      for (i = settings.active+1; i <= pagings_count-1; i++) {
        html += "<li class='"+settings.elemClass+"'><a rel='"+i+"'>"+(i+1)+"</a></li>\n";
      }
    }
  } else {
    for (i =0; i <= pagings_count-1; i++){
      if (i == settings.active){
        html += "<li class='"+settings.elemActiveClass+" "+settings.elemClass+"'><a rel='"+i+"'>"+(i+1)+"</a></li>\n";
      } else {
        html += "<li class='"+settings.elemClass+"'><a rel='"+i+"'>"+(i+1)+"</a></li>\n";
      }
    }
  }
  if (settings.arrows){
  	html+="<li class='"+settings.elemClass+" "+settings.arrowsClasses[1]+(settings.active==(pagings_count-1)?" "+settings.elemDisabledClass:"")+"'><a rel='"+(settings.active+1 > pagings_count-1 ? pagings_count-1: settings.active+1)+"' href='#'>"+settings.arrows[1]+"</a></li>";
  }
  return html;
}
ui.initWorks = function () {
	var works = $('.works'),
		worksList = $('#works-list'),
		elems,
		pagings,
		elemsPerPage = 16,
		settingsObj = {
			active: 0,
			perPage: elemsPerPage,
			elemClass: "pagings__item",
			elemActiveClass: "pagings__item_active",
			emptyElemClass: "pagings__item_placer",
			arrows: ["&lt;","&gt;"],
			arrowsClasses: ["pagings__item_prev","pagings__item_next"],
			elemDisabledClass: "pagings__item_disabled"
		},
		currentPage = window.location.hash.match(/p=([0-9]+)/);
	if (currentPage && currentPage[1]){
		currentPage = parseInt(currentPage[1])-1;
		settingsObj.active = currentPage;
	}
	if(worksList.size()){
		elems = worksList.find('.works-list__item');
		if (elems.size()>elemsPerPage){
			elems.each(function (i) {
				$(this).attr('page-index',parseInt(i/elemsPerPage));
			}).hide().filter('[page-index='+settingsObj.active+']').show();
			settingsObj.elemsCount = elems.size();
			pagings = $("<nav class='pagings'><ul class='pagings__list'></ul></nav>").insertAfter(worksList).find('.pagings__list');
			pagings.html(ui.pagingsHTML(settingsObj));
		}
		works.on('click', ".pagings__item a", function (e) {
			var page = Number($(this).attr('rel')),
				hash = window.location.hash.replace(/[&]?p=[0-9]+/,"");
			settingsObj.active = page;
			elems.hide().filter('[page-index='+page+']').show();
			pagings.html(ui.pagingsHTML(settingsObj));
			if (hash.length>2) {
				window.location.hash = hash+"&p="+(page+1);
			} else {
				window.location.hash = "?p="+(page+1);
			}
			e.preventDefault();
		});
	}
}
ui.initElems.push('initWorks');