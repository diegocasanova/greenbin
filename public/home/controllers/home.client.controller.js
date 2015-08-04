angular.module('home').controller('HomeCtrl', ['$scope', 'Authentication',
    function($scope, Authentication) {
        $scope.authentication = Authentication;
    }
]);
