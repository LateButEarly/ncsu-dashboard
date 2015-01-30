'use strict';

//Classes service used to communicate Classes REST endpoints
angular.module('classes').factory('Classes', ['$resource',
	function($resource) {
		return $resource('classes/:classId', { classId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);