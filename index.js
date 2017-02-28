var app = angular.module('indexApp', []); 

app.controller('indexController', function($scope, $location, $http) {
  sessions();
  function sessions(){
    $scope.session = {
    'type':'session',  
  }  
  var request = $http({ 
       method: "POST",
       url: "backend/main_class.php", 
       data: $.param($scope.session),
       headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });  

    request.success(function (data){   
      $scope.nameUser = data.replace(/"/g, ""); 
      if($scope.nameUser == "false"){ 
        $(".dropdown").hide();
        $(".animal").hide();
      }
      else{
        $(".log").hide();
        $(".sign").hide();
      }
    }); 
  }

  $scope.logout = function(){
    bootbox.confirm("Are you sure you want to log out?", function(result){ 
      if(result){
        $scope.session = {
      'type':'session_logout',  
      }  
      var request = $http({ 
           method: "POST",
           url: "backend/main_class.php", 
           data: $.param($scope.session),
           headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });  

        request.success(function (data){   
            window.location.replace('apps/login/login.html'); 
        });
      }
    }); 
  }
}) 