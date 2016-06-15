'use strict';

angular
.module('infoMobi')
.controller('LoginController', LoginController);

function LoginController(DeviceService, PushService, $rootScope, $http, $scope, $location, API, UtilsService, APP, AuthService, $log, MeumobiCloud, translateFilter) {

	//this should not be scope available, and may be put inside a more reusable place, like a service
	var authenticateUser = function() {
		MeumobiCloud.syncPerformance(
			function(response) {
				var data = response.data;
				data.logo = data.site.hasOwnProperty("logo") && data.site.logo != "" ? APP.cdnUrl + data.site.logo : defaultLogo;
				$rootScope.performance = data;
			}, function(error) {
				$log.debug("MeumobiCloud.syncPerformance ERROR");
				$log.debug(error);
			}
		)
		PushService.register(cb_push.register.success, cb_push.register.error);
		$rootScope.go('/list');
	};

	$scope.credentials = {
		email: "",
		password: ""
	};

	var cb_push = {
		register: {
			success: function(token){
				$log.debug("Device token: " + token);
				DeviceService.save(token);
			},
			error: function(status){
				DeviceService.save(null);
				$log.debug('failed to register : ' + JSON.stringify(status));
			}
		}
	};
	
	var cb_auth = {
		login: {
			success: function(response){
				$scope.Login.loading = false;
				//show modal if need change password, otherwise authenticate
				if (response.data && response.data.error) {
					if (response.data.error == "password expired") {
						$scope.visitor = response.data.visitor;
						$rootScope.Ui.turnOn('modal1');
					} 
				} else {
					authenticateUser();
				} 
			},
			error: function(response){
				var msg = translateFilter("auth.login.Error");
				if (response.data && response.data.error) {
					msg += ": " + translateFilter("[API]: " + response.data.error);
				} else {
					msg += ": " + translateFilter("default.network.Error");
				}
				$scope.Login.loading = false;
				UtilsService.toast(msg);
				$log.debug(msg)
			}
		}
	};
	
	var cb_login = { 
		save: {
			success: function(response) {
				UtilsService.toast(translateFilter("password.save.Success"));
				AuthService.loadAuthToken(response.data.token);
				$rootScope.Ui.turnOff('modal1');
				authenticateUser();
			},
			error: function(response) {
				var msg = translateFilter("password.save.Error");
				if (response.data && response.data.error) {
					msg += ": " + translateFilter("[API]: " + response.data.error);
				} else {
					msg += ": " + translateFilter("default.network.Error");
				}
				UtilsService.toast(msg);
			}
		}
	};

	$scope.Login = {
		submitForm: function(isValid) {
			$scope.submitted = true;
			if (!isValid) {
				UtilsService.toast('Erro de validação');
			}
			else {
        // Login.loading used by Ladda on submit button
				$scope.Login.loading = true;
				$scope.Login.signin($scope.credentials);
			}
		},
		signin: function(credentials) {
			AuthService.login(credentials, cb_auth.login.success, cb_auth.login.error)
		},

		changePassword: function() {
			var payload = {
				current_password: $scope.credentials.password,
				password: $scope.Login.new_password
			};
			
			API.Login.save(payload, cb_login.save.success, cb_login.save.error);
		}
	}
}
