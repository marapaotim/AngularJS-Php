var app = angular.module('loginApp', []); 
app.controller('loginController', function($scope, $http) {
  sessions(); 

  function sessions(){
    $scope.session = {
    'type':'session'
  }  
  var request = $http({ 
       method: "POST",
       url: "../../backend/main_class.php", 
       data: $.param($scope.session),
       headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });  

    request.success(function (data){   
      $scope.nameUser = data.replace(/"/g, "");  
      if($scope.nameUser != "false"){    
       window.location.replace('../../index.html'); 
      } 
    }); 
  } 

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
      var res = status.replace(/"/g, "");  
      var msg =''; 
      if(res == 'on'){ 
        msg = '';
        window.location.href = '../../index.html';
      }
      else if(res == 'off'){
        msg = 'This Account has been Deactivated';
      }
      else{
        msg = 'Unknown Username or Password';
      }
      $scope.loading = false;
      if(msg!=''){
        $('#errorAlert').html('<div class="alert alert-danger alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a><strong>Error!</strong> '+ msg +'</div>');
      }
    }); 
  } 
}) 

  // $scope.logUser = function(){
  //   $scope.loading = true;
  //   $scope.users = {
  //   'type':'login', 
  //   'user': $('#username').val(),
  //   'pass': $('#password').val()
  // }  
  // var request = $http({ 
  //      method: "POST",
  //      url: "../../backend/main_class.php", 
  //      data: $.param($scope.users),
  //      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  //   });   
  //   request.success(function (data){  
  //     var status = data; 
  //     var msg = '';
  //     if(status == 'on'){
  //       alert("Welcome");
  //     }
  //     else if(status == 'off'){
  //       msg = 'This Account has been Deactivated';
  //     }
  //     else{
  //       msg = 'Unknown Username or Password';
  //     }
  //     $scope.loading = false;
  //     $('#errorAlert').html('<div class="alert alert-danger alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close">×</a><strong>Error!</strong> '+ msg +'</div>');
  //   }); 
  //}

  // $scope.logUser = function(){
  //   alert("ngreoute");

  // }


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