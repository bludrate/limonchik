<?php 
	$mail_to = "ofadress@gmail.com";
	if((empty($_POST['email']) && empty($_POST['phone'])) || empty($_POST['message']) || empty($_POST['name'])) 
	 exit("Ошибка информации в полях");	
	if (!preg_match("/^[0-9a-z_]+@[0-9a-z_^\.]+\.[a-z]{2,3}$/i", $_POST['email']))
	 exit("Ошибка. Неправильный имейл");
	$mail = $_POST['email'];
	$name = $_POST['name'];
	$phone = $_POST['phone'];
	$msg = " Имя: \n".$name.(empty($mail) ? "": "\n\n Имейл: ".$mail).(empty($phone) ? "": "\n\n Телефон: ".$phone)." \n\n Сообщение:\n".$_POST['message'];
	$un		= strtoupper(uniqid(time()));
	$head	 = "Mime-Version: 1.0\n";
	$head	.= "Content-Type:multipart/mixed;";
	$head	.= "boundary=\"----------".$un."\"\n\n";
	$body	 = "------------".$un."\nContent-Type:text/html;\n";
	$body	 .= "Content-Transfer-Encoding: 8bit\n\n".$msg."\n\n";
	if (!mail($mail_to, "test subject", $body, $head))
		exit("Ошибка отправки письма. Пожалуйста, попробуйте позже.");
	else 
		echo "Спасибо! Ваше письмо успешно отправлено и будет рассмотрено в ближайшее время!";
?>