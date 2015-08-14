angular.module('articles').controller('ArticlesCtrl',
	['$scope', '$location', '$resource', 'Authentication', 'Articles',
	function($scope, $location, $resource, Authentication, Articles)
	{

		var conditions = $resource('/api/conditions');

		$scope.authentication = Authentication;

		// The model for the form 
		$scope.article = {};

		// Any error message from failing to create an article
		$scope.error = null;


		$scope.conditions = conditions.query();


		$scope.create = function() {

			$scope.error = null;

			var article = new Articles({
				title: $scope.article.title,
    			condition: $scope.article.condition,
    			description: $scope.article.description,
			    location: $scope.article.location,
			    pickupDate: $scope.article.pickupDate,
			    pickupTimeFrom: $scope.article.pickupTimeFrom,
			    pickupTimeTo: $scope.article.pickupTimeTo,
			    email: $scope.article.email,
			    contactNumber: $scope.article.contactNumber,
			    tags: $scope.article.tags
			});
			article.$save(function(response) {
				//$location.path('articles/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
		/*	$scope.article = Articles.get({
				articleId: $routeParams.articleId
			});*/
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



		$scope.processForm = function(){
			$location.path('articles/' + response._id);
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

		$scope.article.pickupDate = new Date();

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


angular.module('articles').controller('TimepickerCtrl',
	['$scope', function($scope){


		var from = new Date();
	    from.setHours( 9 );
	    from.setMinutes( 0 );

		var to = new Date();
	    to.setHours( 17 );
	    to.setMinutes( 0 );


		$scope.article.pickupTimeTo = to;
		$scope.article.pickupTimeFrom = from;

		$scope.hstep = 1;
		$scope.mstep = 1;

		$scope.ismeridian = true;
		$scope.toggleMode = function() {
			$scope.ismeridian = ! $scope.ismeridian;
		};

	}
	]);


angular.module('articles').controller('TagsMainCtrl',
	['$scope', '$resource',  function($scope, $resource){

		var tags = $resource('/api/tags');
				
		$scope.loadTags = function(query) {
			return tags.query().$promise;
		};

	}
	]);



