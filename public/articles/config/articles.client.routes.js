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
            templateUrl: 'articles/views/create-article.client.view.html',
            controller: 'ArticlesCtrl',
            parent: 'app',
            abstract: true,
        })
        
        .state('articles_create.form_main', {
            url: '/main',
            templateUrl: 'articles/views/create-article-form-main.client.view.html',
            data:{
            	requiresLogin:true
            }
        })

        .state('articles_create.form_photo', {
            url: '/photo',
            templateUrl: 'articles/views/create-article-form-photos.client.view.html'
        });

	}
	]);