angular.module('home').config(['$stateProvider','$urlRouterProvider',
	function($stateProvider,$urlRouterProvider) {
		$stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home/views/home.html',
            parent: 'app'
        });
	}
	]);