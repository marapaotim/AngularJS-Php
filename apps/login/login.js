var app = angular.module('loginApp', []); 
app.controller('loginCtrl', function($scope, $http) {
  $scope.logUser = function(){
    $scope.loading = true;
    $scope.users = {
    'type':'login', 
    'user': $('#username').val(),
    'pass': $('#password').val()
  }  
  var request = $http({ 
       method: "POST",
       url: "../../backend/main_class.php", 
       data: $.param($scope.users),
       headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });   
    request.success(function (data){  
      var status = data; 
      var msg = '';
      if(status == 'on'){
        alert("Welcome");
      }
      else if(status == 'off'){
        msg = 'This Account has been Deactivated';
      }
      else{
        msg = 'Unknown Username or Password';
      }
      $scope.loading = false;
      $('#errorAlert').html('<div class="alert alert-danger alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a><strong>Error!</strong> '+ msg +'</div>');
    }); 
  }


  // session();
  // function session(){
  //   var request = $http({ 
  //      method: "GET",
  //      url: "../../backend/main_class.php", 
  //      param: {'type':'session_name'}
  //   }); 

  //    request.success(function (data){  
  //     alert(data);  
  //   });  

  // }
}) 