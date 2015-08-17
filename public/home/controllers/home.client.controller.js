angular.module('home').controller('HomeCtrl', ['$scope', 'Authentication', '$state',
	function($scope, Authentication, $state) {
		$scope.authentication = Authentication;


	}
]);