'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;

		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

        // TODO: Store warning isHidden() state per user.

        switch($scope.authentication.user.role){
                case 'student':
                    $scope.dashboard = "student-dashboard";
                    break;
                case 'teacher':
                    $scope.dashboard = "teacher-dashboard";
                    break;
                case 'admin':
                    $scope.dashboard = "admin-dashboard";
                    break;
                default:
                    $scope.dashboard = "";
        }

        /*
            if ($scope.authentication.user.role === 'student'){
                $scope.dashboard = "student-dashboard";
            } else {
                $scope.dashboard = "";
            }
            */
	}
]);
