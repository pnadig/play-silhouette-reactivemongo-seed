'use strict';

app.controller('SignUpCtrl', ['$scope', '$auth', function($scope, $auth) {
  $scope.submit = function() {
    $auth.signup($scope.user).then(function(response) {
      console.log(response);
    }).catch(function(response) {
      console.log(response);
    });
  };
}]);