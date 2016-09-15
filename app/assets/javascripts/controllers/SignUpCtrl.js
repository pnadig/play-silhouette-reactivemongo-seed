'use strict';

app.controller('SignUpCtrl', ['$scope', '$auth', '$location', function($scope, $auth, $location) {
	$scope.submit = function() {
		$auth.signup($scope.user).then(function() {
			$location.path("/home");
		}).catch(function(error) {
			console.log(error);
		});
	};
}]);