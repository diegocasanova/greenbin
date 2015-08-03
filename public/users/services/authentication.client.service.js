angular.module('users').factory('Authentication', [
	function() {

		var service = {

			loggedUser : null,

			isAuthenticated: function(){
				return !!service.loggedUser;
			}

		};

		return  service;
	}
	]);
