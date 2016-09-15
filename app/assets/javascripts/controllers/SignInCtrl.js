'use strict';

app.controller('SignInCtrl', ['$scope', '$auth', function($scope, $auth){
	$scope.submit = function(){
		$auth.setStorageType($scope.user.rememberMe ? 'localStorage' : 'sessionStorage');
		$auth.login($scope.user).then(function(response){
			console.log(response);
		})
		.catch(function(response){
			console.log(response);
		});
	};
}])