var app = angular.module('irs', ['ngRoute', 'ngCookies']);
app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/upload', {
		controller:'MainCtlr',
        templateUrl:'../upload.html'
	});
}]);
