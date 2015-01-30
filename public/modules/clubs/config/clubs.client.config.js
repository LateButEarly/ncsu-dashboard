'use strict';

// Configuring the Articles module
angular.module('clubs').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Clubs', 'clubs', 'dropdown', '/clubs(/create)?');
		Menus.addSubMenuItem('topbar', 'clubs', 'List Clubs', 'clubs');
		Menus.addSubMenuItem('topbar', 'clubs', 'New Club', 'clubs/create');
	}
]);