'use strict';

app.controller('SignUpCtrl', ['$scope', '$alert', '$auth', function($scope, $alert, $auth) {
  $scope.submit = function() {
    $auth.signup($scope.user).then(function(response) {
      console.log(response);
    }).catch(function(response) {
      console.log(response);
    });
  };
}]);