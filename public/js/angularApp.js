var victorzhouApp = angular.module('victorzhou', ['ui.router', 'victorzhouControllers']);

victorzhouApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('profile', {
		abstract: true,
		templateUrl: 'partials/profile.html',
	}).state('projects', {
		abstract: true,
		url: '/projects',
		templateUrl: 'partials/projects.html',
	}).state('contact', {
		url: '/contact',
		templateUrl: 'partials/contact.html',
	}).state('presskits', {
		url: '/presskits',
		templateUrl: 'partials/presskits.html',
	}).state('projects.iOS', {
		url: '/iOS',
		templateUrl: 'partials/projects.iOS.html',
		controller: 'iOSProjectsController',
	}).state('projects.Android', {
		url: '/Android',
		templateUrl: 'partials/projects.Android.html',
		controller: 'AndroidProjectsController',
	}).state('projects.web', {
		url: '/web',
		templateUrl: 'partials/projects.web.html',
		controller: 'WebProjectsController',
	}).state('projects.research', {
		url: '/research',
		templateUrl: 'partials/projects.research.html',
	}).state('privacy-encircle2', {
		url: '/privacy/encircle2',
		templateUrl: 'partials/privacy-encircle2.html',
	}).state('profile.about', {
		url: '/',
		templateUrl: 'partials/profile.about.html',
	}).state('profile.resume', {
		url: '/resume',
		templateUrl: 'partials/profile.resume.html',
	});

    $locationProvider.html5Mode(true);
}]);