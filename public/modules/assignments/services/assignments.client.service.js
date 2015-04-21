'use strict';

//Assignments service used to communicate Assignments REST endpoints
angular.module('assignments').factory('Assignments', ['$resource',
	function($resource) {
		return $resource('assignments/:assignmentId', { assignmentId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);