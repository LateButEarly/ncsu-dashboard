'use strict';

// Classes controller
angular.module('classes').controller('ClassesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Classes',
	function($scope, $stateParams, $location, Authentication, Classes) {
		$scope.authentication = Authentication;

		// Create new Class
		$scope.create = function() {
			// Create new Class object
			var class = new Classes ({
				name: this.name
			});

			// Redirect after save
			class.$save(function(response) {
				$location.path('classes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Class
		$scope.remove = function(class) {
			if ( class ) { 
				class.$remove();

				for (var i in $scope.classes) {
					if ($scope.classes [i] === class) {
						$scope.classes.splice(i, 1);
					}
				}
			} else {
				$scope.class.$remove(function() {
					$location.path('classes');
				});
			}
		};

		// Update existing Class
		$scope.update = function() {
			var class = $scope.class;

			class.$update(function() {
				$location.path('classes/' + class._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Classes
		$scope.find = function() {
			$scope.classes = Classes.query();
		};

		// Find existing Class
		$scope.findOne = function() {
			$scope.class = Classes.get({ 
				classId: $stateParams.classId
			});
		};
	}
]);