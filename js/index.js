//INDEX JS
//Login App
var login = angular.module('crowdfundingloginApp',["ngRoute","ngAnimate","ngCookies"]);
//DIRECTIVES
//Binds value of input that takes a file to a variable in scope
login.directive("fileModel", ['$parse', function($parse){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;
			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element[0].files);
				})
			})
		}
	}
}]);
//CONTROLLERS
login.controller('crowdfundingloginCtrl', function($scope,$http){

});
login.controller('mainCtrl', function($scope,$window,$location,$route,$http,$cookies){
		//Gets profile from id, used to direct to app or admin
	$scope.getProfileBySalt = function(str){
		$http.get('/php/getProfileBySalt.php',{params:{salt:str}},{headers:{'Content-type':'application/x-www-form-urlencoded;charset=UTF-8;'}})
		.then(function success(response){
			$scope.profile = response.data;
			if ($scope.profile != ""){
				if ($scope.profile.admin == '1' && $scope.profile.id!=""){
					$window.location.href="/admin.html";
				} else if($scope.profile.id!=""){
					$window.location.href="/app.html";
				}
			} else {
				$cookies.remove("crowdfundingapp");
			}

		}, function fail(response){
		
		});
	}
	if ($cookies.get("crowdfundingapp") != ""){
		$scope.getProfileBySalt($cookies.get("crowdfundingapp"));
	}
	//Initial setup
	$scope.loginProfile =  new EmptyProfileModel();
	$scope.signUpProfile = new EmptyProfileModel(); 
	$scope.loginView = "modal/loginmodal.html";
	$scope.signUpView = "modal/signupmodal.html";
	$scope.loadingView = "modal/loadingmodal.html";
	$scope.messageView = "modal/messagemodal.html";
	$scope.previousView = null;
	$scope.showDialog = false;
	$scope.message = "";
	
	//Sets viewable part of the modal
	$scope.setModalView = function(view){
		$scope.modalView = view;
	};
	//Closes side nav;
	$scope.close = function(){
		$mdSidenav('left').close()
	};
	//Toggles side nav
	$scope.toggleLeftMenu = function(){
		$mdSidenav('left').toggle();
	};
	//Open Login Modal
	$scope.openLogin = function(){
		$scope.setModalView($scope.loginView);
		$scope.showDialog = true;
	};
	//Open Sign Up Modal
	$scope.openSignUp = function(){
		$scope.setModalView($scope.signUpView);
		$scope.showDialog = true;
	};
	//Closes Modal
	$scope.closeModal = function(){
		if ($scope.showDialog == true){
			$scope.showDialog = false;
		}
	};
	//Sign Up Ajax
	$scope.signUp = function(){
		$scope.setModalView($scope.loadingView);
		$scope.previousView = $scope.signUpView;
		if($scope.signUpProfile.name == "" || $scope.signUpProfile.email == "" || $scope.signUpProfile.password == "" ){
			$scope.message = "Please fill in all required fields";
			$scope.setModalView($scope.messageView);
		} else if ($scope.signUpProfile.email == undefined) {
			$scope.message = "Invalid Email";
			$scope.setModalView($scope.messageView);
		}else {
			$scope.setModalView($scope.loadingView);
			$http({
				method:'POST',
				url:'/php/signup.php',
				data:{username:$scope.signUpProfile.name,password:$scope.signUpProfile.password,email:$scope.signUpProfile.email},
				headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
			})
			.then(function success(response){
				if (response.data == "failed"){
					$scope.message = "Error occured, Please check your inputs and try again";
					$scope.setModalView($scope.messageView);
				} else if (response.data == "exists"){
					$scope.message = "Email Exists";
					$scope.setModalView($scope.messageView);
				}else {
					$cookies.put("crowdfundingapp",response.data);
					$scope.getProfileBySalt(response.data);
				}
			}, function fail(response){

			});
		}

	};
	//Login Ajax
	$scope.login = function(){
		$scope.previousView = $scope.loginView;
		if ($scope.loginProfile.email == "" || $scope.loginProfile.password == ""){
			return;
		} else if ($scope.loginProfile.email == undefined){
			$scope.message = "Invalid Email";
			$scope.setModalView($scope.messageView);
		} else {
			$scope.setModalView($scope.loadingView);
			$http({
				method:'POST',
				url:'/php/login.php',
				data:{email:$scope.loginProfile.email,password:$scope.loginProfile.password},
				headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
			})
			.then(function success(response){
				if (response.data == "failed"){
					$scope.message = "Wrong Email or Password"
					$scope.setModalView($scope.messageView);
				} else {
					$cookies.put("crowdfundingapp",response.data);
					$scope.getProfileBySalt(response.data);
				}
			}, function fail(response){
					$scope.message = "Error occured, please check your internet connection and try again"
					$scope.setModalView($scope.messageView);
			});
		}

	};

 });