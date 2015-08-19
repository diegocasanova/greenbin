angular.module('articles').controller('ArticlesCtrl', ['$scope', '$state', '$stateParams', '$resource', 'Authentication', 'Articles',
	function($scope, $state, $stateParams, $resource, Authentication, Articles) {

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
				location: [$scope.article.location,
					$scope.article.map.details.geometry.location.K,
					$scope.article.map.details.geometry.location.G
				],
				pickupDate: $scope.article.pickupDate,
				pickupTimeFrom: $scope.article.pickupTimeFrom,
				pickupTimeTo: $scope.article.pickupTimeTo,
				email: $scope.article.email,
				contactNumber: $scope.article.contactNumber,
				tags: sanitizeTags($scope.article.tags)
			});
			article.$save(function(response) {
				$scope.article.id = response._id;
				$state.go('articles_create.form_images', {
					articleId: response._id
				});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				$state.go('articles_create.form_main');
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};



	}
]);


angular.module('articles').controller('EditArticleCtrl', ['$scope', '$state', '$stateParams', '$resource', 'Articles', 'Authentication', function($scope, $state, $stateParams, $resource, Articles, Authentication) {

	$scope.authentication = Authentication;
	var conditions = $resource('/api/conditions').query();

	// Any error message from failing to create an article
	$scope.error = null;

	$scope.findOne = function() {
		Articles.get({
			articleId: $stateParams.articleId
		}, function(article) {
			$scope.article = article;
			$scope.conditions = conditions;
			$scope.originalLocation = article.location;
			$scope.article.location = article.location[0];
			// Set of Photos
			$scope.images = getGalleryImageArray(article.images);

		});

	};

	$scope.update = function() {

		// Any error message from failing to create an article
		$scope.error = null;

		//update the location
		var k = $scope.originalLocation[1];
		var g = $scope.originalLocation[2];

		if ($scope.article.map) {
			k = $scope.article.map.details.geometry.location.K;
			g = $scope.article.map.details.geometry.location.G;
		}

		$scope.article.location = [$scope.article.location, k, g];

		$scope.article.tags = sanitizeTags($scope.article.tags);

		$scope.article.$update(function() {
			$state.go('articles_view', {
				articleId: $scope.article._id
			});
		}, function(errorResponse) {
			$scope.error = errorResponse.data.message;
			$state.go('articles_edit.form_main');
		});
	};


}]);



angular.module('articles').controller('SearchArticlesCtrl', ['$scope', '$http', '$stateParams', 'Articles', 'url',
	function($scope, $http, $stateParams, Articles, url) {


		$scope.articles = [];
		$scope.totalArticles = 0;
		$scope.itemsPerPage = 10; // this should match however many results your API puts on one page
		getResultsPage(1);

		$scope.pagination = {
			current: 1
		};

		$scope.pageChanged = function(newPage) {
			getResultsPage(newPage);
		};

		function getResultsPage(pageNumber) {
			// this is just an example, in reality this stuff should be in a service
			$http.get(url + pageNumber)
				.then(function(result) {
					$scope.articles = result.data.articles;
					$scope.totalArticles = result.data.itemCount;
				});

		}

		$scope.getImageLink = function(article) {

			if (article.images[0]) {
				return '/api/images/' + article.images[0];
			} else {
				return '/assets/img/no_available_image.gif';
			}


		};

	}
]);

angular.module('articles').controller('ViewArticleCtrl', ['$scope', '$state', '$stateParams', '$resource', 'Articles', 'Authentication', function($scope, $state, $stateParams, $resource, Articles, Authentication) {

	$scope.authentication = Authentication;
	var conditions = $resource('/api/conditions').query();

	$scope.error = null;

	$scope.findOne = function() {
		Articles.get({
			articleId: $stateParams.articleId
		}, function(article) {
			$scope.article = article;

			$scope.article.itemCondition = conditions[article.condition].label;

			// Set of Photos
			$scope.photos = getGalleryImageArray(article.images);
			initMap($scope.article.location);


			$state.transitionTo('articles_view.messages', {articleId : $scope.article._id, creatorId: $scope.article.creator._id});

		});

	};

	$scope.showMap = true;

	

	// initial image index
	$scope._Index = 0;

	// if a current image is the same as requested image
	$scope.isActive = function(index) {
		return $scope._Index === index;
	};

	// show prev image
	$scope.showPrev = function() {
		$scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
	};

	// show next image
	$scope.showNext = function() {
		$scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
	};

	// show a certain image
	$scope.showPhoto = function(index) {
		$scope._Index = index;
	};


	$scope.showOnMap = function() {
		$scope.showMap = true;
		google.maps.event.trigger(map, 'resize');
	};

	$scope.delete = function(article) {
		$scope.error = null;
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
				$state.go('home');
			},function(errorResponse) {
			$scope.error = errorResponse.data.message;
		});
		}
	};

}]);



angular.module('articles').controller('DatepickerDemoCtrl', ['$scope', function($scope) {

	$scope.article.pickupDate = $scope.article.pickupDate || new Date();

	// Disable weekend selection
	$scope.disabled = function(date, mode) {
		return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
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
}]);


angular.module('articles').controller('AutocompleteLocationCtrl', ['$scope', function($scope) {
	$scope.result = '';
	$scope.options = {
		country: 'au',
	};
	$scope.details = '';
}]);


angular.module('articles').controller('TimepickerCtrl', ['$scope', function($scope) {


	var from = new Date();
	from.setHours(9);
	from.setMinutes(0);

	var to = new Date();
	to.setHours(17);
	to.setMinutes(0);


	$scope.article.pickupTimeTo = $scope.article.pickupTimeTo || to;
	$scope.article.pickupTimeFrom = $scope.article.pickupTimeFrom || from;

	$scope.hstep = 1;
	$scope.mstep = 1;

	$scope.ismeridian = true;
	$scope.toggleMode = function() {
		$scope.ismeridian = !$scope.ismeridian;
	};

}]);


angular.module('articles').controller('TagsMainCtrl', ['$scope', '$resource', function($scope, $resource) {

	var tags = $resource('/api/tags');

	$scope.loadTags = function(query) {
		return tags.query().$promise;
	};

}]);



function getGalleryImageArray(images) {

	var array = [];

	images.forEach(function(image) {
		var entry = {
			src: '/api/images/' + image,
			_id: image
		};
		array.push(entry);
	});

	return array;
}



function initMap(location) {

	var mapDiv = document.getElementById("newMap");

	if (mapDiv) {

		var latlng = new google.maps.LatLng(Number(location[2]), Number(location[1]));

		var mapOptions = {
			zoom: 15,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};


		var map = new google.maps.Map(mapDiv, mapOptions);
			

		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: 'Item Location!'
		});

	}

}



function sanitizeTags(tags) {
	var sanitized = [];
	if (tags) {
		tags.forEach(function(item) {
			sanitized.push(item.text || item);
		});
	}
	return sanitized;
}