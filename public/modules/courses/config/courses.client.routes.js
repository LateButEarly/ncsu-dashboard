'use strict';

//Setting up route
angular.module('courses').config(['$stateProvider',
	function($stateProvider) {
		// Courses state routing
		$stateProvider.
        state('myDashboard', {
                url: '/student-dashboard',
                ncyBreadcrumb: {
                    label: 'My Dashboard'
                },
                templateUrl: 'modules/users/views/student-dashboard.client.view.html'
            }).
		state('listCourses', {
			url: '/courses',
                ncyBreadcrumb: {
                    parent: 'myDashboard',
                    label: 'My Courses'
                },
			templateUrl: 'modules/courses/views/list-courses.client.view.html'
		}).
		state('createCourse', {
			url: '/courses/create',
                ncyBreadcrumb: {
                    parent: 'listCourses',
                    label: 'Create New Course'
                },
			templateUrl: 'modules/courses/views/create-course.client.view.html'
		}).
		state('viewCourse', {
			url: '/courses/:courseId',
                controller: function($scope, Courses, $stateParams) {
                        $scope.course = Courses.get({
                        courseId: $stateParams.courseId
                    });
                },
                ncyBreadcrumb: {
                    parent: 'listCourses',
                    label: 'View Course: {{course.name}}' //TODO: View activity.name
                },
			templateUrl: 'modules/courses/views/view-course.client.view.html'
		}).
		state('editCourse', {
			url: '/courses/:courseId/edit',
                controller: function($scope, Courses, $stateParams) {
                    $scope.course = $scope.course = Courses.get({
                        courseId: $stateParams.courseId
                    });
                },
                ncyBreadcrumb: {
                    parent: 'viewCourse',
                    label: 'Edit Course: {{course.name}}' //TODO: View activity.name
                },
			templateUrl: 'modules/courses/views/edit-course.client.view.html'
		});
	}
]);
