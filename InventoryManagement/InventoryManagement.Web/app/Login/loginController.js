app.controller('loginController', function ($rootScope,$scope,userService,$location) {
    $rootScope.registerData = {};
    $rootScope.loginData = {};
    $rootScope.userData = {};
    $rootScope.LoginStatus = false;
    $rootScope.OrganisationInfo = {};
    $scope.userType = ["Owner", "Manager", "Employee"];
    $scope.users = [];
    $scope.Organisation = [];
    $scope.LoginFlag = true;
    $scope.showLogin = function () {
        $scope.LoginFlag = true;
    }
    $scope.showSignup = function () {
        $scope.LoginFlag = false;
    }
    $scope.Login = function(){
        $rootScope.LoginStatus = false;
        userService.getUsers().then(function (result) {
            $scope.users = result.data.value;
            angular.forEach($scope.users, function (value, key) {
                if (value.UserName == $rootScope.loginData.UserName && value.UserPassword == $rootScope.loginData.UserPassword) {
                    alert("login Sucessfull");
                    $rootScope.LoginStatus = true;
                    $rootScope.userData = value;
                    return true;
                }
                else if (($scope.users.length - 1 == key)&&($rootScope.LoginStatus==false)) {
                    alert("login failed");
                    return false;
                }
            });
            if ($rootScope.LoginStatus == true) {
                $location.path("/home");
            }
        },
    function (error) {
        alert(error);
    });
    }


    $scope.Register = function () {
        
        userService.createOrganisations($rootScope.OrganisationInfo).then(function (result) {
            
            userService.getOrganisations().then(function (result) {
                $scope.Organisation = result.data.value;
                
                angular.forEach($scope.Organisation, function (value, key) {
                    if (value.OrganisationName == $rootScope.OrganisationInfo.OrganisationName) {
                        $rootScope.registerData.OrganisationId = value.OrganisationId;
                    }
                });

                userService.createUsers($rootScope.registerData).then(function (result) {
                    alert("regitered successfully");
                    userService.getUsers().then(function (result) {
                        $scope.users = result.data.value;
                        angular.forEach($scope.users, function (value, key) {
                            if (value.UserName == $rootScope.registerData.UserName && value.UserPassword == $rootScope.registerData.UserPassword) {
                                $rootScope.userData = value;
                                alert("Your id" + $rootScope.userData.UserId);
                                return;
                            }
                            else if ($scope.users.length - 1 == key) {
                                alert("Register failed");                                
                                return;
                            }
                        });
                    },
            function (error) {
                alert(error);
            });
                },
                function (error) {
                   alert(error);
               });

            }, function (error) {
                alert(error);
            });
        },
        function(error){
            alert(error);
        });
        
    }
});