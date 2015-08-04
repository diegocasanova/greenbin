angular.module('common').controller('HeaderCtrl', ['$scope', '$location','Authentication',
  function ($scope, $location, Authentication) {

  Authentication.loggedUser = window.user;

  $scope.location = $location;
  $scope.isAuthenticated = Authentication.isAuthenticated;


}]);


angular.module('common').controller('LoginCtrl', ['$scope','$http' ,'$location','Authentication',
  function ($scope, $http, $location, Authentication) {

    // The model for this form 
  $scope.user = {};

  // Any error message from failing to login
  $scope.authError = null;


  $scope.login = function() {
    // Clear any previous security errors
    $scope.authError = null;
    
    var request = $http.post('/signin', {username: $scope.user.username, password: $scope.user.password});
        request.success(function(data, status, headers, config) {
            Authentication.loggedUser = data;
            $location.path('/');
        }).error(function(data, status, headers, config) {
          $scope.authError = data.message;
        });
  };

  $scope.clearForm = function() {
    $scope.user = {};
  };

}]);