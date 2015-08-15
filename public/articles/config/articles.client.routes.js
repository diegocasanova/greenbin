angular.module('articles').config(['$stateProvider',
	function($stateProvider) {

		$stateProvider
        .state('articles_list', {
            url: '/articles',
            templateUrl: 'articles/views/list-articles.client.view.html',
            parent: 'app'
        })

        .state('articles_view', {
            url: '/articles/:articleId',
            templateUrl: 'articles/views/view-article.client.view.html',
            parent: 'app'
        })

        .state('articles_create', {
            url: '/articles/create/form',
            templateUrl: 'articles/views/articles-create.tpl.html',
            controller: 'ArticlesCtrl',
            parent: 'app',
            abstract: true,
        })
        
        .state('articles_create.form_main', {
            url: '/main',
            templateUrl: 'articles/views/articles-create-form-main.html',
            data:{
            	requiresLogin:true
            }
        })

        .state('articles_create.form_complementary', {
            url: '/complementary',
            templateUrl: 'articles/views/articles-create-form-complementary.html',
            data:{
                requiresLogin:true
            }
        })

        .state('articles_create.form_images', {
            url: '/images',
            templateUrl: 'articles/views/articles-create-form-images.html',
            controller:'ImagesCtrl',
            params: {'articleId':''},
            data:{
                requiresLogin:true
            }
        });

	}
	]);