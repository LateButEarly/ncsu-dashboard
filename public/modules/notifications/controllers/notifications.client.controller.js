'use strict';

// Notifications controller
angular.module('notifications').controller('NotificationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Notifications',
	function($scope, $stateParams, $location, Authentication, Notifications) {
		$scope.authentication = Authentication;
        $scope.user = Authentication.user;

        $scope.alerts = [
            { type: 'danger', msg: '<strong>Oh snap!</strong> Change a few things up and try submitting again.' },
            { type: 'success', msg: '<strong>Well done!</strong> You successfully read this important alert message.' }
        ];

        $scope.addAlert = function() {
            $scope.alerts.push({msg: 'Another alert!'});
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };


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
