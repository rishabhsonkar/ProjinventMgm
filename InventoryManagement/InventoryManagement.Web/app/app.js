var app = angular.module('myApp', ['ngRoute']);
app.config(function ($routeProvider) {

    $routeProvider.when("/home", { controller: "homeController", templateUrl: "Home/home.html" });
    $routeProvider.when("/login", { controller: "loginController", templateUrl: "Login/login.html" });
    $routeProvider.when("/sidebar", {controller: "sidebarController", templateUrl:"sidebar/sidebar.html"});
    $routeProvider.otherwise({ redirectTo: "/login" });

});
