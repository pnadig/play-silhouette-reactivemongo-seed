'use strict';

app.controller('SignOutCtrl', ['$auth', function($auth) {
	if (!$auth.isAuthenticated()) {
		return;
	}
	$auth.logout()
		.then(function(response) {
			console.log(response);
		});
}]);