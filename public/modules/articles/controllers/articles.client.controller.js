'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles', 'Comments',
	function($scope, $stateParams, $location, Authentication, Articles, Comments) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content,
                image: this.imageUrl
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
                $scope.imageUrl = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

        $scope.createComment = function() {
            var article = $scope.article;
            var comment = new Comments({
                body: this.body
            });

            console.log(comment + '\n');

            console.log(article);

            article.$update(function() {
                //$location.path('articles/' + article._id);

                comment.$save(function(response) {
                    $location.path('articles/' + article._id);

                    //$location.path('articles/' + response._id);

                    // Clear form fields
                    $scope.body = '';
                }, function(errorResponse) {
                    $scope.error = errorResponse.data.message;
                });

            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            };

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
            console.log(Articles.query());
        };

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
            });
            console.log($stateParams);
            console.log($scope.article);
        };
	}
]);
