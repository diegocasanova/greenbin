angular.module('articles').controller('ImagesCtrl', ['$scope', 'FileUploader', '$stateParams', function($scope, FileUploader, $stateParams) {
        $scope.uploader = new FileUploader({url:'/api/images', formData:[{articleId: $stateParams.articleId}]});
    }]); 