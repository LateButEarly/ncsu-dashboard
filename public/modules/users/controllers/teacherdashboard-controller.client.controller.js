'use strict';

angular.module('users').controller('TeacherdashboardController', ['$scope', 'Authentication',
	function($scope, Authentication) {
        $scope.user = Authentication.user;

        // If user is not signed in then redirect back home
        if (!$scope.user) $location.path('/');

        $scope.isEditing = 'Off';

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

        $scope.addAssignment = function () {
            $scope.assignments.push({isComplete: false, isVisible: true, title: '', dueDate: 'dd/mm/yyyy'});
        };

        $scope.saveAssignment = function () {
            $scope.assignments.$save($scope.assignments).then(function (data) {
            });
        };
    }
]);
