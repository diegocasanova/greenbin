angular.module('home').controller('HomeCtrl', ['$scope','Authentication',
    function($scope, $location, Authentication) {
        $scope.authentication = Authentication;
    }
]);
