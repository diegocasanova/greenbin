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


angular.module('common').controller('MessagesCtrl', ['$scope', '$http', '$state', '$stateParams', 'url', 'Authentication',
  function($scope, $http, $state, $stateParams, url, Authentication) {

    // The model for this form 
    $scope.newMessage = '';

    // Any error message from failing to login
    $scope.error = null;


    $scope.editable = $state.current.data.editable;

    $scope.authentication = Authentication;
    $scope.articleCreator = $stateParams.creatorId;


    $scope.addMessage = function() {
      // Clear any previous security errors
      $scope.error = null;

      var message = {
        content : $scope.newMessage,
        _article : $stateParams.articleId,
        _to : $scope.articleCreator
      };


      var request = $http.post('/api/messages', message);

      request.success(function(data, status, headers, config) {
        $scope.newMessage = '';
        $scope.messages.push(data);

      }).error(function(data, status, headers, config) {
        $scope.error = data.message;
      });
    };


    $scope.find = function(){
      $http.get(url)
        .then(function(result) {
          $scope.messages = result.data;
        });

    };


  }
]);


angular.module('common').controller('NotificationsCtrl', ['$scope', '$http', '$state', '$stateParams', 'Authentication',
  function($scope, $http, $state, $stateParams, Authentication) {


    $scope.authentication = Authentication;


    $scope.check = function(message) {

      $scope.error = null;
      
      var request = $http.put('/api/messages/' + message._id, message);

      request.success(function(data, status, headers, config) {
        
        $scope.find();

      }).error(function(data, status, headers, config) {
        $scope.error = data.message;
      });
    };


    $scope.find = function(){
      $http.get('/api/messages')
        .then(function(result) {
          $scope.messages = result.data;
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


$(document).on('click','.navbar-collapse.in',function(e) {
    if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});