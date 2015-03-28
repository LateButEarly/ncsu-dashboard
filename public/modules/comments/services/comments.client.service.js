'use strict';

//Comments service used to communicate Comments REST endpoints
angular.module('comments').factory('Comments', ['$resource',
	function($resource) {
		return $resource('/articles/:articleId/comments/:commentId', {
            //articleId: '@articleId',
            commentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
