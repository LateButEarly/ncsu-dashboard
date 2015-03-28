'use strict';

angular.module('core').directive('studentMenu', [
	function() {
		return {
			templateUrl: '/modules/core/directives/templates/student-menu.html',
			restrict: 'E'
		};
	}
]);
