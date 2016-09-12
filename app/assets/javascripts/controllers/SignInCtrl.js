'use strict';

app.controller('SignInCtrl', ['$scope', function($scope){
	$scope.submit = function(){
		console.log($scope.user)
	};
}])