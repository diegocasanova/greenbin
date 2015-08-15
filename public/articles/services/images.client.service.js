angular.module('articles').factory('Images', ['$resource',
	function($resource) {
		return $resource('api/images/:imageId', {
			imageId: '@_id'
		});
	}]);