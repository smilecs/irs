var app = angular.module('irs', ['ngRoute', 'ngCookies']);
app.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/signin', {
		controller:'MainCtlr',
        templateUrl:'../signin.html'
	});
}]);
