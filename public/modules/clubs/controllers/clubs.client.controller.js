'use strict';

// Clubs controller
angular.module('clubs').controller('ClubsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Clubs',
	function($scope, $stateParams, $location, Authentication, Clubs) {
		$scope.authentication = Authentication;

        $scope.notifications = [
            { title: 'New CEO Executive Members', icon: 'glyphicon-bullhorn', label: 'Notification', date: '2/22/2015' },
            { title: 'Executive Elections', icon: 'glyphicon-bullhorn', label: 'Notification', date: '2/16/2015' },
            { title: 'First meeting of the semester', icon: 'glyphicon-calendar', label: 'Event', date: '2/12/2015' },
            { title: 'Bill Nye the Noodle Guy joined the club', icon: 'glyphicon-user', label: 'Member', date: '2/10/2015' },
            { title: 'Albert Ramenstein joined the club', icon: 'glyphicon-user', label: 'Member', date: '2/06/2015' },
            { title: 'Pay Spring 2015 dues by 2/31', icon: 'glyphicon-bell', label: 'Reminder', date: '2/01/2015' }
        ];

        $scope.members = [
            { avatar: '', name: 'Daniel Marko', title: 'President', email: '' },
            { avatar: '', name: 'Dylan Ryan', title: 'Vice President', email: '' },
            { avatar: '', name: 'Kit Kat', title: 'Treasurer', email: '' },
            { avatar: '', name: 'Reese', title: 'Public Relations', email: '' },
            { avatar: '', name: 'Bill Nye', title: 'Member', email: '' },
            { avatar: '', name: 'Katherine Lampe', title: 'Member', email: '' }
        ];

        //$scope.club = Clubs;

        /* TODO: Make tabs dynamic
        $scope.tabs = [
            { title: 'About', content: '' },
            { title: 'Announcements', content: 'Dynamic content 2' },
            { title: 'Calendar', content: ''}
        ];
        */

		// Create new Club
		$scope.create = function() {
			// Create new Club object
			var club = new Clubs ({
				name: this.name,
                description: this.description
			});

			// Redirect after save
			club.$save(function(response) {
				$location.path('clubs/' + response._id);

				// Clear form fields
				$scope.name = '';
                $scope.description = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Club
		$scope.remove = function(club) {
			if ( club ) { 
				club.$remove();

				for (var i in $scope.clubs) {
					if ($scope.clubs [i] === club) {
						$scope.clubs.splice(i, 1);
					}
				}
			} else {
				$scope.club.$remove(function() {
					$location.path('clubs');
				});
			}
		};

		// Update existing Club
		$scope.update = function() {
			var club = $scope.club;

			club.$update(function() {
				$location.path('clubs/' + club._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Clubs
		$scope.find = function() {
			$scope.clubs = Clubs.query();
		};

		// Find existing Club
		$scope.findOne = function() {
			$scope.club = Clubs.get({ 
				clubId: $stateParams.clubId
			});
		};
	}
]);
