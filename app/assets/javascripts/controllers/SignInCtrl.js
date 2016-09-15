'use strict';

app.controller('SignInCtrl', ['$scope', '$auth', '$location', function($scope, $auth, $location) {
	$scope.submit = function() {
		$auth.setStorageType($scope.user.rememberMe ? 'localStorage' : 'sessionStorage');
		$auth.login($scope.user).then(function() {
				$location.path("/home");
			})
			.catch(function(response) {
				console.log(response);
			});
	};
}])