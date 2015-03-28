'use strict';

// Courses controller
angular.module('courses').controller('CoursesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Courses',
	function($scope, $stateParams, $location, Authentication, Courses) {
		$scope.authentication = Authentication;

        $scope.alerts = [
            { type: 'info', msg: '<strong>Due date changed!</strong> Our next case study has been moved forward. Check your syllabus!' },
            { type: 'success', msg: '<strong>Assignments Graded:</strong> Please visit your gradebook for more information.' }
        ];

        $scope.isEditingMaterials = 'Off';

        $scope.addAlert = function() {
            $scope.alerts.push({msg: $scope.msg});
            $scope.msg = '';
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };


        $scope.materials = [
            {
            isComplete: true,
            isVisible: true,
            course: 'BUS 443',
            title: 'Homework Assignment #3',
            dueDate: '2/18/2015'
        },
            {
                isComplete: false,
                isVisible: true,
                course: 'BUS 440',
                title: 'Chocolate Heaven Case Study',
                dueDate: '2/29/2015'
            },
            {
                isComplete: false,
                isVisible: false,
                course: 'BUS 440',
                title: 'Homework Assignment #4',
                dueDate: '2/27/2015'
            }];

        $scope.addMaterials = function () {
            $scope.materials.push({isComplete: false, isVisible: true, title: '', dueDate: 'dd/mm/yyyy'});
        };

        $scope.saveMaterials = function () {
            $scope.materials.$save($scope.materials).then(function (data) {
            });
        };

        $scope.assignments = [
            {
                isComplete: true,
                isVisible: true,
                course: 'BUS 443',
                title: 'Homework Assignment #3',
                dueDate: '2/18/2015'
            },
            {
                isComplete: false,
                isVisible: true,
                course: 'BUS 440',
                title: 'Chocolate Heaven Case Study',
                dueDate: '2/29/2015'
            },
            {
                isComplete: false,
                isVisible: false,
                course: 'BUS 440',
                title: 'Homework Assignment #4',
                dueDate: '2/27/2015'
            }
        ];


        // Create new Course
		$scope.create = function() {
			// Create new Course object
			var course = new Courses ({
                code: this.code,
				name: this.name,
                professor: this.professor,
                description: this.description
			});

			// Redirect after save
			course.$save(function(response) {
				$location.path('courses/' + response._id);

				// Clear form fields
                $scope.code = '';
				$scope.name = '';
                $scope.professor = '';
                $scope.description = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Course
		$scope.remove = function(course) {
			if ( course ) { 
				course.$remove();

				for (var i in $scope.courses) {
					if ($scope.courses [i] === course) {
						$scope.courses.splice(i, 1);
					}
				}
			} else {
				$scope.course.$remove(function() {
					$location.path('courses');
				});
			}
		};

		// Update existing Course
		$scope.update = function() {
			var course = $scope.course;

			course.$update(function() {
				$location.path('courses/' + course._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Courses
		$scope.find = function() {
			$scope.courses = Courses.query();
		};

		// Find existing Course
		$scope.findOne = function() {
			$scope.course = Courses.get({ 
				courseId: $stateParams.courseId
			});
		};
	}
]);
