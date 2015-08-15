angular.module('home').controller('HomeCtrl', ['$scope','Authentication','$state',
    function($scope, Authentication, $state) {
        $scope.authentication = Authentication;

        $scope.searchText = null;

        $scope.search = function(){
        	$state.go('articles_search_result', {
					searchText: $scope.searchText
			});
        };
    }
]);
