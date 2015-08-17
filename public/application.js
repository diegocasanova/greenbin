var mainApplicationModuleName = 'mean';
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ui.router', 'ngTagsInput', 'ui.bootstrap', 'ngAutocomplete', 'mp.autoFocus', 'angularFileUpload', 'angularUtils.directives.dirPagination', 'ngTouch', 'users', 'common', 'home', 'articles']);

mainApplicationModule.config(['$locationProvider', function($locationProvider) {
	$locationProvider.hashPrefix('!');
}]);

mainApplicationModule.config(function(paginationTemplateProvider) {
	paginationTemplateProvider.setPath('lib/angular-utils-pagination/dirPagination.tpl.html');
});

if (window.location.hash === '#_=_') {
	window.location.hash = '#!';
}

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainApplicationModuleName]);
});