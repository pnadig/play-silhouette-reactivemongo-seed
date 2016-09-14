'use strict';

app.controller('HomeCtrl', ['$rootScope', '$scope', 'UserFactory', function($rootScope, $scope, UserFactory) {
	$scope.init = function() {
		UserFactory.get()
			.success(function(data) {
				console.log(data);
				$rootScope.user = data;
			})
			.error(function(error) {
				console.log(error);
			});
	};
}]);