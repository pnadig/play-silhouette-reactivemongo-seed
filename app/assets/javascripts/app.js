'use strict';

var app = angular.module('App', ['ngCookies', 'ui.router', 'satellizer']);

app.run(function($rootScope) {
	$rootScope.user = {};
});

app.config(function($urlRouterProvider, $stateProvider, $httpProvider, $authProvider) {
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/views/home.html',
			controller: 'HomeCtrl',
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

	$authProvider.httpInterceptor = true;
	$authProvider.loginOnSignup = true;
	$authProvider.loginRedirect = '/home';
	$authProvider.logoutRedirect = '/';
	$authProvider.signupRedirect = '/home';
	$authProvider.loginUrl = '/signIn';
	$authProvider.signupUrl = '/signUp';
	$authProvider.loginRoute = '/signIn';
	$authProvider.signupRoute = '/signUp';
	$authProvider.tokenName = 'token';
	$authProvider.tokenPrefix = 'satellizer';
	$authProvider.authHeader = 'X-Auth-Token';
	$authProvider.platform = 'browser';
	$authProvider.storage = 'localStorage';
});