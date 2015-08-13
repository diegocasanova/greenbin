angular.module('common').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/signin', {
			templateUrl: 'common/views/signin.tpl.html'
		});
	}
	]).
run(['$rootScope','$location','Authentication',function($rootScope, $location, Authentication) {
	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		if (!Authentication.isAuthenticated()) {
        // no logged user, redirect to /login
        if ( typeof next.access != 'undefined' && next.access.requiresLogin ) {

        	$location.path("/signin");
        }
    }});
}]);

