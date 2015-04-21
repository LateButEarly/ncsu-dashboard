'use strict';

//Setting up route
angular.module('assignments').config(['$stateProvider',
	function($stateProvider) {
		// Assignments state routing
		$stateProvider.
		state('listAssignments', {
			url: '/assignments',
			templateUrl: 'modules/assignments/views/list-assignments.client.view.html'
		}).
		state('createAssignment', {
			url: '/assignments/create',
			templateUrl: 'modules/assignments/views/create-assignment.client.view.html'
		}).
		state('viewAssignment', {
			url: '/assignments/:assignmentId',
			templateUrl: 'modules/assignments/views/view-assignment.client.view.html'
		}).
		state('editAssignment', {
			url: '/assignments/:assignmentId/edit',
			templateUrl: 'modules/assignments/views/edit-assignment.client.view.html'
		});
	}
]);