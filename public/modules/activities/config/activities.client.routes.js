'use strict';

//Setting up route
angular.module('activities').config(['$stateProvider',
	function($stateProvider) {
		// Activities state routing
		$stateProvider.
		state('listActivities', {
			url: '/activities',
                ncyBreadcrumb: {
                  label: 'All Activities'
                },
			templateUrl: 'modules/activities/views/list-activities.client.view.html'
		}).
		state('createActivity', {
			url: '/activities/create',
                ncyBreadcrumb: {
                    parent: 'listActivities',
                    label: 'Create New Activity'
                },
			templateUrl: 'modules/activities/views/create-activity.client.view.html'
		}).
		state('viewActivity', {
			url: '/activities/:activityId',
                controller: function($scope, Activities, $stateParams) {
                    $scope.activity = $scope.activity = Activities.get({
                        activityId: $stateParams.activityId
                    });
                },
                ncyBreadcrumb: {
                    parent: 'listActivities',
                    label: 'View {{activity.name}}' //TODO: View activity.name
                },
			templateUrl: 'modules/activities/views/view-activity.client.view.html'
		}).
		state('editActivity', {
			url: '/activities/:activityId/edit',
                ncyBreadcrumb: {
                    parent: 'viewActivity',
                    label: 'Edit Activity'
                },
			templateUrl: 'modules/activities/views/edit-activity.client.view.html'
		});
	}
]);
