'use strict';

angular.module('users').controller('TeacherdashboardController', ['$scope', 'Authentication',
	function($scope, Authentication) {
        $scope.user = Authentication.user;

        // If user is not signed in then redirect back home
        if (!$scope.user) $location.path('/');

        $scope.isEditing = 'Off';

        //course: this.course.code
        $scope.assignments = [
            {isComplete: true, isVisible: true, course: 'BUS 443', title: 'Homework Assignment #3', dueDate: '2/18/2015'},
            {isComplete: false, isVisible: true, course: 'BUS 440', title: 'Chocolate Heaven Case Study', dueDate: '2/29/2015'},
            {isComplete: false, isVisible: false, course: 'BUS 440', title: 'Homework Assignment #4', dueDate: '2/27/2015'}
        ];

        $scope.addAssignment = function() {
            $scope.assignments.push({isComplete: false, isVisible: true, title: '', dueDate: 'dd/mm/yyyy'});
        };

        $scope.saveAssignment = function() {
            $scope.assignments.$save($scope.assignment).then(function(data){});
        };

        $scope.eventSources = [];

        $scope.uiConfig = {
            calendar: {
                height: 450,
                editable: true,
                header: {
                    left: 'month basicWeek basicDay agendaWeek agendaDay',
                    center: 'title',
                    right: 'today prev,next'
                },
                dayClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };

        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };
        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['shortDate'];
        $scope.format = $scope.formats[0];

	}
]);
