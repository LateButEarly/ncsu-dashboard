'use strict';

//Setting up route
angular.module('clubs').config(['$stateProvider',
	function($stateProvider) {
		// Clubs state routing
		$stateProvider.
		state('listClubs', {
			url: '/clubs',
                ncyBreadcrumb: {
                    parent: 'myDashboard',
                    label: 'My Clubs'
                },
			templateUrl: 'modules/clubs/views/list-clubs.client.view.html'
		}).
		state('createClub', {
			url: '/clubs/create',
                ncyBreadcrumb: {
                    parent: 'listClubs',
                    label: 'Create New Club'
                },
			templateUrl: 'modules/clubs/views/create-club.client.view.html'
		}).
		state('viewClub', {
			url: '/clubs/:clubId',
                controller: function($scope, Clubs, $stateParams) {
                        $scope.club = Clubs.get({
                        clubId: $stateParams.clubId
                    });
                },
                ncyBreadcrumb: {
                    parent: 'listClubs',
                    label: 'View Club: {{club.name}}'
                },
			templateUrl: 'modules/clubs/views/view-club.client.view.html'
		}).
		state('editClub', {
			url: '/clubs/:clubId/edit',
                controller: function($scope, Clubs, $stateParams) {
                    $scope.club = Clubs.get({
                        clubId: $stateParams.clubId
                    });
                },
                ncyBreadcrumb: {
                    parent: 'viewClub',
                    label: 'Edit Club: {{club.name}}'
                },
			templateUrl: 'modules/clubs/views/edit-club.client.view.html'
		});
	}
]);
