'use strict';

app.controller('SignInCtrl', ['$scope', '$auth', '$location', function($scope, $auth, $location) {
	$scope.user = {
		rememberMe : false
	}
	$scope.submit = function() {
		$auth.setStorageType($scope.user.rememberMe ? 'localStorage' : 'sessionStorage');
		$auth.login($scope.user).then(function() {
				$location.path("/home");
			})
			.catch(function(error) {
				console.log(error);
			});
	};
}])