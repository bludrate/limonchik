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