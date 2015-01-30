'use strict';

//Setting up route
angular.module('classes').config(['$stateProvider',
	function($stateProvider) {
		// Classes state routing
		$stateProvider.
		state('listClasses', {
			url: '/classes',
			templateUrl: 'modules/classes/views/list-classes.client.view.html'
		}).
		state('createClass', {
			url: '/classes/create',
			templateUrl: 'modules/classes/views/create-class.client.view.html'
		}).
		state('viewClass', {
			url: '/classes/:classId',
			templateUrl: 'modules/classes/views/view-class.client.view.html'
		}).
		state('editClass', {
			url: '/classes/:classId/edit',
			templateUrl: 'modules/classes/views/edit-class.client.view.html'
		});
	}
]);