(function(){
  var app = angular.module("CoolWeather", []);
  var MainController = function($scope, $http){
    $scope.locations = [];
    $scope.title = "Cool Weather";
    $scope.temperature = "N/A";
    $scope.description = "Unavailable";
    $scope.isLocationInputVisible = false;
    $scope.image="";
    
    var imageBase = "https://openweathermap.org/img/w/";
    
    $scope.plusButtonClicked = function(){
      $scope.isLocationInputVisible = true;
    };
    
    $scope.addLocationClicked = function(){
      
      $scope.locations.push($scope.city);
      $scope.city = "";
      $scope.isLocationInputVisible = false;
      
    };
    
    var onSuccess = function(response){
      $scope.image = imageBase + response.data.weather[0].icon + ".png";
      $scope.temperature = response.data.main.temp;
      $scope.description = response.data.weather[0].description;
    };
    
    var onError = function(reason){
      console.log(reason);
    };
    
    $scope.refreshData = function(city){
      var promise = $http.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7b10426ee90376dc3d6525f847128b35&units=metric");
    
      promise.then(onSuccess, onError);
    };
  };
  
  app.controller("MainController", MainController);
  
}());
