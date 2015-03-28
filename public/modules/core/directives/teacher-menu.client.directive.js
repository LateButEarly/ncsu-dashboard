'use strict';

angular.module('core').directive('teacherMenu', [
	function() {
		return {
			templateUrl: '/modules/core/directives/templates/teacher-menu.html',
			restrict: 'E'
		};
	}
]);
