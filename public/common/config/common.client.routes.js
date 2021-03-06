angular.module('common').config(['$stateProvider','$urlRouterProvider',
	function($stateProvider,$urlRouterProvider) {
		$stateProvider
	    .state('app', {
	      abstract: true,
	      templateUrl: "common/views/header.tpl.html",
	    })

        .state('login', {
            url: '/signin',
            templateUrl: 'common/views/signin.tpl.html',
            parent: 'app',
            controller: 'LoginCtrl'
        })

        .state('signup', {
            url: '/signup',
            templateUrl: 'common/views/signup.tpl.html',
            parent: 'app',
            controller: 'SignUpCtrl'
        })

        .state('my_notifications', {
            url: '/notifications',
            templateUrl: 'common/views/notifications.tpl.html',
            controller: 'NotificationsCtrl',
            parent: 'app',
            data: {
                requiresLogin: true
            }
        });

        $urlRouterProvider.otherwise('/');

	}
	]).
run(['$rootScope','$state','Authentication',function($rootScope, $state, Authentication) {
	$rootScope.$on( "$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
		if (!Authentication.loggedUser) {
        // no logged user, redirect to /login
        if ( typeof toState.data != 'undefined' && toState.data.requiresLogin ) {
            event.preventDefault(); 
        	$state.go('login');
        }
    }});
}]);

