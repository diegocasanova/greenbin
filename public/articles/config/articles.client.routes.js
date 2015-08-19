angular.module('articles').config(['$stateProvider',
    function($stateProvider) {

        $stateProvider
            .state('my_articles', {
                url: '/my_articles',
                templateUrl: 'articles/views/articles-list.html',
                controller: 'SearchArticlesCtrl',
                resolve: {
                    url: ['Authentication', function(Authentication) {
                        return 'api/' + Authentication.loggedUser._id + '/articles?page=';
                    }]
                },
                parent: 'app',
                data: {
                    requiresLogin: true
                }
            })

        .state('articles_search_result', {
            url: '/articles',
            templateUrl: 'articles/views/articles-list.html',
            controller: 'SearchArticlesCtrl',
            resolve: {
                url: ['$stateParams', function($stateParams) {
                    return 'api/articles/search?text=' + $stateParams.searchText + '&page=';
                }]
            },
            params: {
                'searchText': ''
            },
            parent: 'app'
        })

        .state('articles_view', {
            url: '/articles/:articleId',
            templateUrl: 'articles/views/articles-view.html',
            controller: 'ViewArticleCtrl',
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
            data: {
                requiresLogin: true
            }
        })

        .state('articles_create.form_complementary', {
            url: '/complementary',
            templateUrl: 'articles/views/articles-create-form-complementary.html',
            data: {
                requiresLogin: true
            }
        })

        .state('articles_create.form_images', {
            url: '/images',
            templateUrl: 'articles/views/articles-create-form-images.html',
            controller: 'ImagesCtrl',
            params: {
                'articleId': ''
            },
            data: {
                requiresLogin: true
            }
        })


        .state('articles_edit', {
            url: '/articles/edit/:articleId',
            templateUrl: 'articles/views/articles-edit.tpl.html',
            controller: 'EditArticleCtrl',
            parent: 'app',
            abstract: true
        })

        .state('articles_edit.form_main', {
            url: '/main',
            templateUrl: 'articles/views/articles-edit-form-main.html',
            data: {
                requiresLogin: true
            }
        })

        .state('articles_edit.form_complementary', {
            url: '/complementary',
            templateUrl: 'articles/views/articles-edit-form-complementary.html',
            data: {
                requiresLogin: true
            }
        })

        .state('articles_edit.form_images', {
            url: '/images',
            templateUrl: 'articles/views/articles-edit-form-images.html',
            controller: 'ImagesCtrl',
            params: {
                'articleId': ''
            },
            data: {
                requiresLogin: true
            }
        })

        .state('articles_view.messages', {
            url: '/messages',
            templateUrl: 'common/views/messages.tpl.html',
            controller: 'MessagesCtrl',
            data: {editable: true},
            params: {
                'articleId': '',
                'creatorId': ''
            },
            resolve: {
                url: ['$stateParams', function($stateParams) {
                    return 'api/'+ $stateParams.articleId +'/messages/';
                }]
            }
        })

        ;

    }
]);