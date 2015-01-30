'use strict';

// Configuring the Articles module
angular.module('classes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Classes', 'classes', 'dropdown', '/classes(/create)?');
		Menus.addSubMenuItem('topbar', 'classes', 'List Classes', 'classes');
		Menus.addSubMenuItem('topbar', 'classes', 'New Class', 'classes/create');
	}
]);