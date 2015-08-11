angular.module('articles').controller('ArticlesCtrl',
	['$scope', '$routeParams', '$location', 'Authentication', 'Articles',
	function($scope, $routeParams, $location, Authentication, Articles)
	{
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $routeParams.articleId
			});
		};

		$scope.update = function() {
			$scope.article.$update(function() {
				$location.path('articles/' + $scope.article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.delete = function(article) {
			if (article) {
				article.$remove(function() {
					for (var i in $scope.articles) {
						if ($scope.articles[i] === article) {
							$scope.articles.splice(i, 1);
						}
					}
				});
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};
	}
	]);



angular.module('articles').controller('ButtonsCtrl',
	['$scope', function($scope){
		$scope.singleModel = 1;

		$scope.radioModel = '3';

		$scope.checkModel = {
			'1': false,
			'2': true,
			'3': false,
			'4': false
		};
	}
	]);


angular.module('articles').controller('DatepickerDemoCtrl',
	['$scope', function($scope){
		$scope.today = function() {
			$scope.dt = new Date();
		};
		$scope.today();

		$scope.clear = function () {
			$scope.dt = null;
		};

		  // Disable weekend selection
		  $scope.disabled = function(date, mode) {
		  	return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		  };

		  $scope.toggleMin = function() {
		  	$scope.minDate = $scope.minDate ? null : new Date();
		  };
		  $scope.toggleMin();

		  $scope.open = function($event) {
		  	$event.preventDefault();
		  	$event.stopPropagation();

		  	$scope.opened = true;
		  };

		  $scope.dateOptions = {
		  	formatYear: 'yy',
		  	startingDay: 1
		  };

		  
		  $scope.format = 'shortDate';
		}
		]);


angular.module('articles').controller('AutocompleteLocationCtrl',
	['$scope', function($scope){
		$scope.result = '';
		$scope.options = {
			country: 'au',

		};    
		$scope.details = '';
	}
	]);

angular.module('articles').controller('DatepickerDemoCtrl',
	['$scope', function($scope){

		$scope.today = function() {
			$scope.dt = new Date();
		};
		$scope.today();

		$scope.clear = function () {
			$scope.dt = null;
		};

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
  	return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
  	$scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
  	$event.preventDefault();
  	$event.stopPropagation();

  	$scope.opened = true;
  };

  $scope.dateOptions = {
  	formatYear: 'yy',
  	startingDay: 1
  };

  
  $scope.format = 'shortDate';

}
]);


angular.module('articles').controller('TimepickerCtrl',
	['$scope', function($scope){
		$scope.mytime = new Date();

		$scope.hstep = 1;
		$scope.mstep = 15;

		$scope.options = {
			hstep: [1, 2, 3],
			mstep: [1, 5, 10, 15, 25, 30]
		};

		$scope.ismeridian = true;
		$scope.toggleMode = function() {
			$scope.ismeridian = ! $scope.ismeridian;
		};

	}
	]);


angular.module('articles').controller('TagsMainCtrl',
	['$scope', '$resource',  function($scope, $resource){

		//TODO change for a resource
		var tags = $resource('/api/tags');
		
		$scope.tags = [
		{ text: 'Tag1' },
		{ text: 'Tag2' },
		{ text: 'Tag3' }
		];
		
		$scope.loadTags = function(query) {
			return tags.query().$promise;
		};

	}
	]);



