'use strict';

var app = angular.module('App', ['ngRoute', 'ngCookies', 'satellizer']);

app.run(function($rootScope) {
	$rootScope.user = {};
});

app.config(function($stateProvider, $httpProvider, $authProvider) {
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/views/home.html',
			resolve: {
				authenticated: function($q, $location, $auth) {
					var deferred = $q.defer();
					if (!$auth.isAuthenticated()) {
						$location.path('/signIn');
					} else {
						deferred.resolve();
					}
					return deferred.promise;
				}
			}
		})
		.state('signUp', {
			url: '/signUp',
			templateUrl: '/views/signUp.html',
			controller: 'SignUpCtrl'
		})
		.state('signIn', {
			url: '/signIn',
			templateUrl: '/views/signIn.html',
			controller: 'SignInCtrl'
		})
		.state('signOut', {
			url: '/signOut',
			template: null,
			controller: 'SignOutCtrl'
		});

	$httpProvider.interceptors.push(function($q, $injector) {
		return {
			request: function(request) {
				var $auth = $injector.get('$auth');
				if ($auth.isAuthenticated()) {
					request.headers['X-Auth-Token'] = $auth.getToken();
				}
				var cookies = $injector.get('$cookies');
				var token = cookies.get('PLAY_CSRF_TOKEN');
				if (token) {
					request.headers['Csrf-Token'] = token;
				}
				return request;
			},
			responseError: function(rejection) {
				if (rejection.status === 401) {
					var $auth = $injector.get('$auth');
					$auth.logout();
					$injector.get('$state').go('signIn');
				}
				return $q.reject(rejection);
			}
		};
	});
});