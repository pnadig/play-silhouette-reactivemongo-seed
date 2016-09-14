'use strict';

app.factory('UserFactory', function($http) {
	return {
		get: function() {
			return $http.get('/user');
		}
	};
});