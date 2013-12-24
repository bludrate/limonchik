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