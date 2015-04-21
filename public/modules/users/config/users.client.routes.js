'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('admin-dashboard', {
			url: '/admin-dashboard',
			templateUrl: 'modules/users/views/admin-dashboard.client.view.html'
		}).
            state('admin-dashboard/articles', {
                url: '/admin-dashboard/articles',
                templateUrl: 'modules/users/views/admin-dashboard-articles.client.view.html'
            }).
            state('admin-dashboard/activities', {
                url: '/admin-dashboard/activities',
                templateUrl: 'modules/users/views/admin-dashboard-activities.client.view.html'
            }).
            state('admin-dashboard/courses', {
                url: '/admin-dashboard/courses',
                templateUrl: 'modules/users/views/admin-dashboard-courses.client.view.html'
            }).
            state('admin-dashboard/clubs', {
                url: '/admin-dashboard/clubs',
                templateUrl: 'modules/users/views/admin-dashboard-clubs.client.view.html'
            }).
		state('teacher-dashboard', {
			url: '/teacher-dashboard',
			templateUrl: 'modules/users/views/teacher-dashboard.client.view.html'
		}).
		state('student-dashboard', {
			url: '/student-dashboard',
			templateUrl: 'modules/users/views/student-dashboard.client.view.html'
		}).
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('register', {
			url: '/register',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('login', {
			url: '/login',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
