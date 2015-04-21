'use strict';

angular.module('users').controller('StudentdashboardController', ['$scope', '$location', 'Authentication',
	function($scope, $location, Authentication) {
        $scope.user = Authentication.user;


        $scope.getGravatar = function() {
            var userEmail = $scope.user.email;
            return '//www.gravatar.com/avatar/' + md5(userEmail.trim()) + '?s=100';
        };


        // If user is not signed in then redirect back home
        if (!$scope.user) $location.path('/');

	}
]);
