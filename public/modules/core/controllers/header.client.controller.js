'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
        $scope.user = Authentication.user;



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
                    $scope.dashboard = 'student-dashboard';
                    break;
                case 'teacher':
                    $scope.dashboard = 'teacher-dashboard';
                    break;
                case 'admin':
                    $scope.dashboard = 'admin-dashboard';
                    break;
                default:
                    $scope.dashboard = '';
        }

        $scope.alerts = [
            { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
            { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
        ];

        $scope.addAlert = function() {
            $scope.alerts.push({msg: 'Another alert!'});
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        /*
            if ($scope.authentication.user.role === 'student'){
                $scope.dashboard = "student-dashboard";
            } else {
                $scope.dashboard = "";
            }
            */
	}
]);
