var controllers = angular.module('victorzhouControllers', []);

controllers.filter('unsafe', ['$sce', function($sce) {
	return function(val) {
		return $sce.trustAsHtml(val);
	}
}]);

controllers.controller('iOSProjectsController', ['$scope', function($scope) {
	$scope.projects = [{
		name: 'Ontheway',
		subtitle: 'A peer-to-peer delivery network.',
		descriptionHTML: 'Request anything delivered anywhere or make money doing deliveries on the side. Find out more at <a href="http://www.ontheway-app.com" target="_blank">ontheway-app.com</a>',
		link: "http://bit.ly/ontheway-iOS",
		imageURL: '/images/screenshot_ontheway.png',
		landscape: false,
	}, {
		name: 'Cloak',
		subtitle: 'Securely and seamlessly hiding personal information in plain sight.',
		descriptionHTML: 'First Place Winner of Best Privacy and Security Hacks at HackPrinceton Fall 2015.<br><br>For more information, visit <a href="/cloak" target="_blank">victorzhou.com/cloak</a>.',
		link: 'https://itunes.apple.com/us/app/cloak-protect-your-information/id1070902484?mt=8&ign-mpt=uo%3D4',
		imageURL: '/images/screenshot_cloak.png',
		landscape: false,
	}, {
		name: 'Flooding Dots',
		subtitle: 'The sequel to Falling Dots.',
		descriptionHTML: 'Drag the dots to their appropriate places to score points. Can you survive the flood?<br><br>See the promo video <a href="https://www.youtube.com/watch?v=WBUVF3bVwuE" target="_blank">here</a>.',
		link: 'https://itunes.apple.com/us/app/flooding-dots/id956044693?mt=8&uo=4',
		imageURL: '/images/screenshot_floodingdots.png',
		landscape: false,
	}, {
		name: 'Freestylephile',
		subtitle: 'Anonymously share your freestyle raps/rhymes/bad poetry with people around the world.',
		descriptionHTML: "Download, pick a username, and immediately start freestyling.<br>Or if you're not into that, start scrolling through feeds of the newest and hottest freestyles worldwide.",
		link: 'https://itunes.apple.com/us/app/freestylephile/id931357801?mt=8&uo=4',
		imageURL: '/images/screenshot_freestylephile.png',
		landscape: false,
	}, {
		name: 'Encircle the Turtle 2',
		subtitle: 'Test your strategic prowess against a turtle. Yes, you read that right.',
		descriptionHTML: 'Play through 60 challenging levels with various gameplay features like invisible turtles, twin turtles, and more. Plus, make/share your own Custom Maps and play maps made by other encirclers around the globe. Can you outwit a turtle?<br><br>\n\n"A quality puzzle game" <span class="review-source">- TapScape, 8.3/10</span><br>"Super addicting ... it becomes an obsession" <span class="review-source">- AppsHappens</span><br>"You need to get your hands on this" <span class="review-source">- Crazy Mike\'s Apps</span>',
		link: 'https://itunes.apple.com/us/app/encircle-the-turtle-2/id824239280?mt=8&uo=4',
		imageURL: '/images/screenshot_encircle2.png',
		landscape: true,
	}, {
		name: 'Moby Dick',
		subtitle: 'Play as the White Whale from Herman Melville\'s masterpiece Moby Dick.',
		descriptionHTML: 'Smash ships, eat fish, explore the seas, upgrade, and repeat.',
		link: 'https://itunes.apple.com/us/app/moby-dick-the-game/id803997829?mt=8&uo=4',
		imageURL: '/images/screenshot_mobydick.png',
		landscape: true,
	}, {
		name: 'Falling Dots',
		subtitle: 'Don\'t Tap Red Dots. Tap all the other dots.',
		descriptionHTML: "It's not as easy as it seems.<br>Featuring Classic Mode, Arcade mode, and Multiplayer Mode. Race against yourself or other online players to victory.<br><br>\n\n\"Incredibly addictive ... immersive gaming experience\" <span class='review-source'>- AppPicker.com</span><br>\"Extremely intuitive and user friendly, but even more addicting\" <span class='review-source'>- satisfied user, 5/5</span><br>\"Addictive, amazing ... a real gem\" <span class='review-source'>- satisfied user, 5/5</span>",
		link: 'https://itunes.apple.com/us/app/falling-dots/id651531217?mt=8&uo=4',
		imageURL: '/images/screenshot_fallingdots.png',
		landscape: false,
	}, {
		name: 'Encircle the Turtle',
		subtitle: 'The Original Encircle the Turtle.',
		descriptionHTML: 'It\'s the one that came before Encircle the Turtle 2. An Oldie but a Goodie.<br>Features 1 player, 2 player, and Campaign modes.<br><br>\n\n"One of the best free iPhone games" <span class="review-source">- iPhonage.com</span><br>"So addictive that it\'s taking me everything to keep away from the game and write about it" <span class="review-source">- iGeeksBlog.com </span><br>"One of the best iPhone games of all time, without a doubt" <span class="review-source">- satisfied user, 5/5</span>',
		link: 'https://itunes.apple.com/us/app/encircle-the-turtle/id634465881?mt=8&uo=4',
		imageURL: '/images/screenshot_encircle.png',
		landscape: true,
	}, {
		name: 'Flappy Falcon',
		subtitle: 'My obligatory Flappy Bird ripoff.',
		descriptionHTML: 'Remember back when everyone was making clones of Flappy Bird? I jumped on that bandwagon too.<br><br>\n\n"Even more frustrating than the original" <span class="review-source">- satisfied(?) user, 5/5</span>',
		link: 'https://itunes.apple.com/us/app/flappy-falcon/id821391902?mt=8&uo=4',
		imageURL: '/images/screenshot_flappyfalcon.png',
		landscape: false,
	}];
}]);

controllers.controller('AndroidProjectsController', ['$scope', function($scope) {
	$scope.projects = [{
		name: 'Ontheway',
		subtitle: 'A peer-to-peer delivery network.',
		descriptionHTML: 'Request anything delivered anywhere or make money doing deliveries on the side. Find out more at <a href="http://www.ontheway-app.com" target="_blank">ontheway-app.com</a>',
		link: "https://play.google.com/store/apps/details?id=innovations.enroute.jjiang.ontheway",
		imageURL: '/images/screenshot_ontheway-Android.png',
	}];
}]);

controllers.controller('WebProjectsController', ['$scope', function($scope) {
	$scope.projects = [{
		name: 'Ontheway',
		subtitle: 'A peer-to-peer delivery network.',
		descriptionHTML: 'A Node.js web server and application server for Ontheway, a peer-to-peer delivery network.<br>Visit the website for more information.',
		link: "http://www.ontheway-app.com",
		imageURL: '/images/screenshot_otw_web.png',
	}, {
		name: 'victorzhou.com',
		subtitle: 'You\'re literally on this website.',
		descriptionHTML: '100% developed by yours truly. Built using the MEAN (MongoDB, Express.js, Angular.js, Node.js) stack. Consists of a web server for the site and an application server for <a href="https://itunes.apple.com/us/app/encircle-the-turtle-2/id824239280?mt=8&uo=4" target="_blank">Encircle the Turtle 2</a>.<br>View the source code on my <a href="http://www.github.com/vzhou842" target="_blank">Github</a>.',
		link: "http://www.victorzhou.com",
		imageURL: '/images/screenshot_victorzhou.png',
	}, {
		name: 'Princeton Social Innovation',
		subtitle: 'Princeton University\'s Social Innovation club.',
		descriptionHTML: 'I helped develop the this website as a Web Development Officer in Princeton Social Innovation.',
		link: 'http://www.princetonsi.com',
		imageURL: 'images/screenshot_psi.png',
	}];
}]);