'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
                ncyBreadcrumb: {
                    parent: 'myDashboard',
                    label: 'My Articles'
                },
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
                ncyBreadcrumb: {
                    parent: 'listArticles',
                    label: 'Create New Article'
                },
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
                controller: function($scope, Articles, $stateParams) {
                    $scope.article = $scope.article = Articles.get({
                        articleId: $stateParams.articleId
                    });
                },
                ncyBreadcrumb: {
                    parent: 'listArticles',
                    label: 'View Article: {{article.title}}'
                },
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
                controller: function($scope, Articles, $stateParams) {
                    $scope.article = $scope.article = Articles.get({
                        articleId: $stateParams.articleId
                    });
                },
                ncyBreadcrumb: {
                    parent: 'viewArticle',
                    label: 'Edit Article: {{article.title}}'
                },
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
