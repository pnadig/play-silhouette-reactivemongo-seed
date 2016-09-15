'use strict';

app.controller('HeaderCtrl', ['$scope', '$auth', function($scope, $auth) {
  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };
}]);