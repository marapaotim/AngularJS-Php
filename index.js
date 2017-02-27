var app = angular.module('indexApp', []); 

app.controller('indexController', function($scope, $location, $http) {
  sessions();
  function sessions(){
    $scope.loading = true;
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
    }); 
  }
}) 