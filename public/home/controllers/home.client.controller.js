angular.module('home')

.controller('HomeCtrl', ['$scope', 'Authentication', '$state',
	function($scope, Authentication, $state) {
		$scope.authentication = Authentication;


	}
])

.controller('CarouselDemoCtrl', function ($scope) {
  $scope.myInterval = 10000;
  var images = [
    	{image: '/assets/img/home/ok.png'},
    	{image: '/assets/img/home/ok1.png'},
    	{image: '/assets/img/home/ok2.png'}
    ];
  var slides = $scope.slides = images;
 
  }

);