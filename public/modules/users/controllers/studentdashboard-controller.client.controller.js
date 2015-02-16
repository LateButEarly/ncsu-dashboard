'use strict';

angular.module('users').controller('StudentdashboardController', ['$scope', 'Authentication',
	function($scope, Authentication) {
        $scope.user = Authentication.user;

        $scope.getGravatar = function() {
            var userEmail = $scope.user.email;
            return '//www.gravatar.com/avatar/' + md5(userEmail.trim()) + '?s=200';
        };

        // If user is not signed in then redirect back home
        if (!$scope.user) $location.path('/');

        $scope.eventSources = [];

        $scope.uiConfig = {
            calendar: {
                height: 450,
                editable: true,
                header: {
                    left: 'month basicWeek basicDay agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                dayClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };

	}
]);
