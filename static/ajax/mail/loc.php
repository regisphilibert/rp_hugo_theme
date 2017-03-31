<?php function _loc($key){
	$strings = [
		"mail_string_1" => [
			"en" => "Hey! Your just filled my contact form with this message and here's what I got:",
			"fr" => "Bonjour ! Vous venez de remplir mon formulaire de contact et voilà ce que j'ai :"
		],
		"mail_string_2" => [
			"en" => "I'll answer real quick.",
			"fr" => "Je vais répondre au plus vite."
		],
		"mail_string_3" => [
			"en" => "Cheers,",
			"fr" => "À bientôt,"
		],
		"mail_string_4" => [
			"en" => "Thanks for your message on regisphilibert.com",
			"fr" => "Merci pour votre message sur regisphilibert.com"
		],
		
	];
	return $stings[$key]['en'];
} ?>