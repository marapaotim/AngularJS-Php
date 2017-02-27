var app = angular.module('signUpApp', ['ngMessages']); 
app.controller('signUpCtrl', function($scope, $http) {
  var original = $scope.user;
  $scope.loading = false;
	$scope.submitUser = function(){
  $scope.loading = true;
  $scope.users = {
    'type':'addUser',
    'name': $('#fname').val(),
    'age': $('#age').val(),
    'gender': $('input[name=gender]:checked').val(),
    'email': $('#emailAdd').val(),
    'username': $('#username').val(),
    'password': $('#password').val()
  }
	var request = $http({ 
       method: "post",
       url: "../../backend/main_class.php", 
       data: $.param($scope.users),
       headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });   
    request.success(function (data){ 
      $('#successAlert').html('<div class="alert alert-success alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a><strong>Congratulations!</strong> You are now Registered!</div>');
      $scope.loading = false;
      $scope.user = angular.copy(original);
      $scope.signupFrm.$setPristine(); 
      $scope.signupFrm.$setUntouched();
    }); 
	}
}) 