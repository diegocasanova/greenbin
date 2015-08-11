angular.module('home').controller('HomeCtrl', ['$scope','$location','Authentication',
    function($scope, $location, Authentication) {
        $scope.authentication = Authentication;

        $scope.createAd = function(){
        	$location.path('/articles/create');
        };
    }
]);
