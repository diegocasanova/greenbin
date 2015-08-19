angular.module('articles').controller('ImagesCtrl', ['$scope', '$state','FileUploader', '$stateParams', 'Images', function($scope, $state, FileUploader, $stateParams, Images) {
        var uploader = new FileUploader({url:'/api/images', formData:[{articleId: $stateParams.articleId}]});

        $scope.error = null;

        $scope.remove = function(fileItem){
            if (fileItem.imageId){
               var image = new Images({_id:fileItem.imageId});
               image.$remove(function() {
                    fileItem.remove();
                });
            }
        }; 

        $scope.removeImage = function(item, index){
            if (item){
               var image = new Images({_id:item._id});
               image.$remove(function() {
                    $scope.$parent.images.splice(index,1);
                });
            }
        }; 


        $scope.done = function(){
            $state.go('articles_view', {
                articleId: $stateParams.articleId
            });
        };

        uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
            fileItem.imageId = response.imageId;
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
            $scope.error = response.message;
        };


        $scope.uploader = uploader;


    }]); 