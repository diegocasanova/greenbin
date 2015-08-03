angular.module('common').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/signin', {
			templateUrl: 'common/views/signin.tpl.html'
		});
	}
	]);