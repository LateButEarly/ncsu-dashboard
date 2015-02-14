'use strict';

// Notifications controller
angular.module('notifications').controller('NotificationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Notifications',
	function($scope, $stateParams, $location, Authentication, Notifications) {
		$scope.authentication = Authentication;
        $scope.user = Authentication.user;

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


        $scope.dismissNotification = function() {
            var notification = $scope.notification;

            $scope.notification = Notifications.get({
                notificationId: $stateParams.notificationId
            });

            notification.$update(function() {
                //$location.path('notifications/' + notification._id);
                //$location.path('/' + $scope.dashboard);

                $scope.notification.isShowing = false;
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

		// Create new Notification
		$scope.create = function() {
			// Create new Notification object
			var notification = new Notifications ({
				name: this.name
			});

			// Redirect after save
			notification.$save(function(response) {
				$location.path('notifications/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Notification
		$scope.remove = function(notification) {
			if ( notification ) { 
				notification.$remove();

				for (var i in $scope.notifications) {
					if ($scope.notifications [i] === notification) {
						$scope.notifications.splice(i, 1);
					}
				}
			} else {
				$scope.notification.$remove(function() {
					$location.path('notifications');
				});
			}
		};

		// Update existing Notification
		$scope.update = function() {
			var notification = $scope.notification;

			notification.$update(function() {
                $location.path('notifications/' + notification._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Notifications
		$scope.find = function() {
			$scope.notifications = Notifications.query();
		};

		// Find existing Notification
		$scope.findOne = function() {
			$scope.notification = Notifications.get({ 
				notificationId: $stateParams.notificationId
			});
		};

        $scope.findOneExplicit = function() {
            for (var i in $scope.notifications) {
                if ($scope.notifications[i] === notification){
                    $scope.notification = $scope.notifications.splice(i, 1);
                }
            }
        };
	}
]);
