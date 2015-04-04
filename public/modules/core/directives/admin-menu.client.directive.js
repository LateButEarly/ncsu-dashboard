'use strict';

angular.module('core').directive('adminMenu', [
	function() {
		return {
            templateUrl: '/modules/core/directives/templates/admin-menu.html',
            restrict: 'E'
		};
	}
]);
