angular.module('common').controller('HeaderCtrl', ['$scope', '$state', 'Authentication',
  function($scope, $state, Authentication) {

    Authentication.loggedUser = window.user || Authentication.loggedUser;
    $scope.isAuthenticated = Authentication.isAuthenticated;

    $scope.searchText = null;

    $scope.search = function() {
      if ($scope.searchText) {
        $state.go('articles_search_result', {
          searchText: $scope.searchText
        });
      }
    };

  }
]);


angular.module('common').controller('LoginCtrl', ['$scope', '$http', '$state', 'Authentication',
  function($scope, $http, $state, Authentication) {

    // The model for this form 
    $scope.user = {};

    // Any error message from failing to login
    $scope.authError = null;


    $scope.login = function() {
      // Clear any previous security errors
      $scope.authError = null;

      var request = $http.post('/signin', {
        username: $scope.user.username,
        password: $scope.user.password
      });
      request.success(function(data, status, headers, config) {
        Authentication.loggedUser = data;
        $state.go('home');
      }).error(function(data, status, headers, config) {
        $scope.authError = data.message;
      });
    };


  }
]);


angular.module('common').controller('SignUpCtrl', ['$scope', '$http', '$state', 'Authentication',
  function($scope, $http, $state, Authentication) {

    // The model for this form 
    $scope.user = {};

    // Any error message from failing to login
    $scope.authError = null;


    $scope.signUp = function() {
      // Clear any previous security errors
      $scope.authError = null;

      var request = $http.post('/signup', {
        username: $scope.user.username,
        password: $scope.user.password,
        email: $scope.user.email,
        firstName: $scope.user.firstName,
        lastName: $scope.user.lastName
      });
      request.success(function(data, status, headers, config) {
        Authentication.loggedUser = data;
        $state.go('home');
      }).error(function(data, status, headers, config) {
        $scope.authError = data.message;
      });
    };


  }
]);