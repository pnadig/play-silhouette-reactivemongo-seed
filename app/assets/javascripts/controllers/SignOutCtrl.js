'use strict';

app.controller('SignOutCtrl', ['$auth', '$location', function($auth, $location) {
	if (!$auth.isAuthenticated()) {
		return;
	}
	$auth.logout()
		.then(function() {
			$location.path("/signIn");
		});
}]);