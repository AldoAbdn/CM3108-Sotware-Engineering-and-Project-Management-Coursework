var admin = angular.module('crowdfundingadminApp',["ngRoute","ngAnimate","ngMaterial","ngCookies"]);
admin.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when("/admin", {
		templateUrl : "page/profile.html",
		controller: "adminCtrl"
	})
	.when("/projectmanagement", {
		templateUrl: "page/projectmanagement.html",
		controller: "projectmanagementCtrl"
	})
	.when("/profilemanagement", {
		templateUrl: "page/profilemanagement.html",
		controller: "profilemanagementCtrl"
	})
	.when("/featuredprojects", {
		templateUrl:"page/featuredprojects.html",
		controller:"featuredprojectsCtrl"
	})
	.when("/profileedit", {
		templateUrl : "page/profileedit.html",
		controller: "profileEditCtrl"
	})
	.when("/successful", {
		templateUrl:"page/successful.html",
		controller:"successfulCtrl"
	})
	.when("/donations", {
		templateUrl:"page/donations.html",
		controller: "donationsCtrl"
	})
	.otherwise({
		redirectTo:'admin'
	});
}]);
admin.directive("fileModel", ['$parse', function($parse){
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
admin.controller('crowdfundingadminCtrl', function($scope,$http){

});
admin.controller('mainCtrl', function($scope,$mdDialog,$cookies,$window,$mdSidenav,$location,$route,$http){
	//Initial setup
	$scope.profile =  new EmptyProfileModel();//Set this to 'setProfile' in sprint 2
	$scope.sideBar = new SideBar("");
	$scope.project = null; //Delete this in sprint 2
	$scope.categories = true;
	$scope.navigate = function(path){
		$location.path(path);
	};
	$scope.setSideBar = function(content){
		$scope.sideBar.content = content;
	};
	$scope.close = function(){
		$mdSidenav('left').close()
	};
	//Angular Material Setup
	$scope.toggleLeftMenu = function(){
		$mdSidenav('left').toggle();
	};
	//Alert Dialog
	$scope.showAlert = function(title,description,func) {
	    $mdDialog.show(
	      $mdDialog.alert()
	        .parent(angular.element(document.querySelector('#popupContainer')))
	        .clickOutsideToClose(true)
	        .title(title)
	        .textContent(description)
	        .ariaLabel('Alert')
	        .ok('OK')
	    ).then(func);
	};
	//Get profile by cookie 
	$scope.getProfileBySalt = function(){
		var str = $cookies.get('crowdfundingapp');
		if (str){
			var url = $location.url();
			$http.get('/php/getProfileBySalt.php',{params:{salt:str}},{headers:{'Content-type':'application/x-www-form-urlencoded;charset=UTF-8;'}})
			.then(function success(response){
				$scope.profile = response.data;
				if ($scope.profile.admin != '1'){
					$window.location.href="/app.html";
				};
			}, function fail(response){
				$scope.showAlert('Alert', 'An Error Occured', function(){$window.location.href="/";});
			});
		} else {
			$window.location.href = "/ ";
		}
	}
	$scope.getProfileBySalt();
	$scope.setProject = function(project){
		$scope.project = project;
	};
	$scope.showCategories = function(){
		$scope.categories = true;
	};
	$scope.hideCategories = function(){
		$scope.categories = false;
	};
	//HOME
	$scope.category = 'all';
	$scope.setCategory = function(category){
		$scope.category = category;
		//Reloads home page once category set
		$route.reload();
	};
	$scope.searchString = "";
 });
admin.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
    	//For side bar
      $mdSidenav('left').close();
    };
 });
admin.controller('adminCtrl', function($scope,$window,$cookies,$location){
	$scope.setSideBar("menu/adminsidebar.html");
	$scope.signOut = function(){
		//Delete cookie
		$cookies.remove("crowdfundingapp");
		$window.location.href ='/';
	};
	//Navigate to edit
	$scope.edit = function(){
		$location.path('/profileedit');
	}
});
admin.controller('projectmanagementCtrl', function($scope,$http){
	$scope.setSideBar("menu/projectmanagementsidebar.html");
	//Setup
	$scope.approvedProjects = [];
	$scope.notApprovedProjects = [];
	$scope.project = new EmptyProjectModel();
	//Set viewable project
	$scope.setProject = function(project){
		$scope.project = project;
	};
	//Set lists
	$scope.getNotApprovedProjects = function(){
		$http.get('/php/getNotApprovedProjects.php',{},{headers:{'Content-type':'application/x-www-form-urlencoded;charset=UTF-8;'}})
		.then(function success(response){
			$scope.notApprovedProjects = response.data;
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	$scope.getApprovedProjects = function(){
		$http.get('/php/getApprovedProjects.php',{},{headers:{'Content-type':'application/x-www-form-urlencoded;charset=UTF-8;'}})
		.then(function success(response){
			$scope.approvedProjects = response.data;
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	$scope.getNotApprovedProjects();
	$scope.getApprovedProjects();
	//Delets selected project
	$scope.delete = function(id){
		$http({
			method:'POST',
			url:'/php/deleteProject.php',
			data:{projectid:id},
			headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
		})
		.then(function success(response){
			if (response.data == "Invalid ID"){
				$scope.showAlert('Alert', 'Invalid Project ID', null);
			} else {
				$scope.getNotApprovedProjects();
				$scope.getApprovedProjects();
				$scope.project = new EmptyProjectModel();
			}
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	//Toggles selected project
	$scope.toggleApprove = function(project){
		//Project not approved
		if (project.approved == '0'){
			$http({
				method:'POST',
				url:'/php/setProjectAsApproved.php',
				data:{projectid:project.id},
				headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
			})
			.then(function success(response){
				$scope.getNotApprovedProjects();
				$scope.getApprovedProjects();
				$scope.project = new EmptyProjectModel();
			}, function fail(response){
				$scope.showAlert('Alert', 'An Error Occured', null);
			});
		} else {
			//Project approved
			$http({
				method:'POST',
				url:'/php/setProjectAsNotApproved.php',
				data:{projectid:project.id},
				headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
			})
			.then(function success(response){
				$scope.getNotApprovedProjects();
				$scope.getApprovedProjects();
				$scope.project = new EmptyProjectModel();
			}, function fail(response){
				$scope.showAlert('Alert', 'An Error Occured', null);
			});
		}
	};
});
admin.controller('profilemanagementCtrl', function($scope,$http){
	$scope.setSideBar("menu/profilemanagementsidebar.html");
	//Setup
	$scope.notApprovedProfiles = [];
	$scope.approvedProfiles = [];
	$scope.profile = new EmptyProfileModel();
	//Set Viewable profile
	$scope.setProfile = function(profile){
		$scope.profile = profile;
	};
	//Set lists
	$scope.setNotApprovedProfiles = function(){
		$http({
			method:'POST',
			url:'/php/getNotApprovedProfiles.php',				
			data:{},
			headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
		})
		.then(function success(response){
			$scope.notApprovedProfiles = response.data;
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	$scope.setApprovedProfiles = function(){
		$http({
			method:'POST',
			url:'/php/getApprovedProfiles.php',				
			data:{},
			headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
		})
		.then(function success(response){
			$scope.approvedProfiles = response.data;
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	$scope.setApprovedProfiles();
	$scope.setNotApprovedProfiles();
	//Toggles profile
	$scope.toggleApprove = function(profile){
		if (profile.approved == '0'){
			$http({
				method:'POST',
				url:'/php/setProfileAsApproved.php',
				data:{profileid:profile.id},
				headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
			})
			.then(function success(response){
				$scope.setApprovedProfiles();
				$scope.setNotApprovedProfiles();
				$scope.profile = new EmptyProfileModel();
			}, function fail(response){
				$scope.showAlert('Alert', 'An Error Occured',null);
			});
		} else {
			$http({
				method:'POST',
				url:'/php/setProfileAsNotApproved.php',
				data:{profileid:profile.id},
				headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
			})
			.then(function success(response){
				$scope.setApprovedProfiles();
				$scope.setNotApprovedProfiles();
				$scope.profile = new EmptyProfileModel();
			}, function fail(response){
				$scope.showAlert('Alert', 'An Error Occured',null);
			});
		}
	};
	//Deletes profile
	$scope.delete = function(id){
		$http({
			method:'POST',
			url:'/php/deleteProfile.php',
			data:{profileid:id},
			headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
		})
		.then(function success(response){
			$scope.setApprovedProfiles();
			$scope.setNotApprovedProfiles();
			$scope.profile = new EmptyProfileModel();
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	}
});
admin.controller('featuredprojectsCtrl', function($scope,$http){
	$scope.setSideBar("menu/featuredprojectssidebar.html");
	//Setup
	$scope.featuredProjects = [];
	$scope.notFeaturedProjects = [];
	$scope.project = new EmptyProjectModel();
	//Set lists
	$scope.setFeaturedProjects = function(){
		$http.get('/php/getFeaturedProjectsAdmin.php',{params:{category:$scope.category}},{headers:{'Content-type':'application/x-www-form-urlencoded;charset=UTF-8;'}})
		.then(function success(response){

			$scope.featuredProjects = response.data;
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	$scope.setNotFeaturedProjects = function(){
		$http.get('/php/getFeaturedProjects.php',{params:{category:$scope.category}},{headers:{'Content-type':'application/x-www-form-urlencoded;charset=UTF-8;'}})
		.then(function success(response){
			$scope.notFeaturedProjects = response.data;
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	$scope.setFeaturedProjects();
	$scope.setNotFeaturedProjects();
	//Set project as featured
	$scope.featured = function(id){
		$http({
			method:'POST',
			url:'/php/setProjectAsFeatured.php',
			data:{projectid:id},
			headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
		})
		.then(function success(response){
			$scope.setFeaturedProjects();
			$scope.setNotFeaturedProjects();
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	//Sets project as not featured
	$scope.notFeatured = function(id){
		$http({
			method:'POST',
			url:'/php/setProjectAsNotFeatured.php',
			data:{projectid:id},
			headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
		})
		.then(function success(response){
			$scope.setFeaturedProjects();
			$scope.setNotFeaturedProjects();
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
});
admin.controller('successfulCtrl', function($scope,$http){
	$scope.setSideBar("menu/successfulsidebar.html");
	//Setup
	$scope.successfulProjects = [];
	$scope.project = new EmptyProjectModel();
	//Set list
	$scope.getSuccessfulProjects = function(){
		$http.get('/php/getSuccessfulProjects.php',{},{headers:{'Content-type':'application/x-www-form-urlencoded;charset=UTF-8;'}})
		.then(function success(response){
			$scope.successfulProjects = response.data;
			$scope.project = new EmptyProjectModel();
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	$scope.getSuccessfulProjects();
	//Sets viewable project
	$scope.setProject = function(project){
		$scope.project= project;
	}
});
admin.controller('donationsCtrl', function($scope,$http){
	$scope.setSideBar("menu/donationssidebar.html");
	//Setup
	$scope.donations = [];
	$scope.donation = new EmptyDonation();
	//Sets list
	$scope.getDonations = function(){
		$http.get('/php/getDonations.php',{},{headers:{'Content-type':'application/x-www-form-urlencoded;charset=UTF-8;'}})
		.then(function success(response){
			$scope.donations = response.data;
			$scope.donation = new EmptyProjectModel();
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	$scope.getDonations();
	//Sets viewable donation
	$scope.setDonation = function(donation){
		$scope.donation = donation;
	};
});
admin.controller('profileEditCtrl', function($scope,$http,$location){
	$scope.setSideBar("menu/profilesidebar.html");
	//Setup
	$scope.editProfile = $scope.profile;
	$scope.newPassword = "";
	$scope.reEnteredPassword = "";
	$scope.file = null;
	//Saves new profile
	$scope.save = function(){
		if ($scope.editProfile.name == "" || $scope.editProfile.email == ""){
			$scope.showAlert('Alert', 'Please fill in all fields',null);
		} else if ($scope.newPassword != $scope.reEnteredPassword){
			$scope.showAlert('Alert', 'Passwords do not match',null);
		} else {
			//Update db here
			$scope.editProfile.password = $scope.newPassword;
			var fd = new FormData();
			for(var key in $scope.editProfile){
				fd.append(key, $scope.editProfile[key]);
			}
			if ($scope.file != null){
				fd.append('icon',$scope.file[0]);
			}
			$http.post('/php/editProfile.php',
				fd,{
				transformRequest: angular.indentity,
				headers:{'Content-Type': undefined}
			})
			.then(function success(response){
				$location.path('/profile');
				$scope.getProfileBySalt();
			}, function fail(response){
				$scope.editProfile = $scope.profile;
				$scope.showAlert('Alert', 'An Error Occured',null);
			});
		}
	};
});
