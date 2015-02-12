'use strict';

angular.module('users').controller('StudentdashboardController', ['$scope', 'Authentication',
	function($scope, Authentication) {
        $scope.user = Authentication.user;

        // If user is not signed in then redirect back home
        if (!$scope.user) $location.path('/');
	}
]);
