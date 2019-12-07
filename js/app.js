//Angular
//App
var app = angular.module('crowdfundingApp',["ngRoute","ngSanitize","ngAnimate","ngMaterial","ngCookies"]);
app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when("/home",{
		templateUrl: "page/home.html",
		controller: "homeCtrl",
		activetab: 'home'
	})
	.when("/profile", {
		templateUrl : "page/profile.html",
		controller: "profileCtrl"
	})
	.when("/project/:ID", {
		templateUrl: "page/project.html",
		controller: "projectCtrl"
	})
	.when("/profileedit", {
		templateUrl : "page/profileedit.html",
		controller: "profileEditCtrl"
	})
	.when("/projectedit", {
		templateUrl : "page/projectedit.html",
		controller: "projectEditCtrl"
	})
	.when("/setprofilenotapproved", {
		templateUrl:"page/setprofilenotapproved.html",
		controller: "setProfileNotApprovedCtrl"
	})
	.when("/donation", {
		templateUrl:"page/donation.html",
		controller: "donationCtrl"
	})
	.otherwise({
		redirectTo:'home'
	});
}]);
app.directive("fileModel", ['$parse', function($parse){
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
app.controller('crowdfundingCtrl', function($scope,$http){

});
//Controllers
//Main
app.controller('mainCtrl', function($scope,$cookies,$mdDialog,$window,$mdSidenav,$location,$route,$http){
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
	$scope.getProfileBySalt = function(){
		var str = $cookies.get('crowdfundingapp');
		if (str){
			var url = $location.url();
			$http.get('/php/getProfileBySalt.php',{params:{salt:str}},{headers:{'Content-type':'application/x-www-form-urlencoded;charset=UTF-8;'}})
			.then(function success(response){
				$scope.profile = response.data;
				if ($scope.profile.viewed === undefined){
					$scope.profile.viewed = [];
				};
				if ($scope.profile.admin == '1'){
					$window.location.href="/admin.html";
				}
			}, function fail(response){
				$scope.showAlert('Alert', 'An Error Occured',null);
			});
		} else {
			$window.location.href="/";
		}
	}
	$scope.getProfileBySalt();
	//METHODS
	$scope.setProject = function(project){
		$scope.project = project;
	}
	$scope.setProfile = function(profile){
		$scope.profile = profile;
	}
	$scope.addViewedProject = function(project){
	 	$scope.profile.viewed.push(project);
	}
	$scope.showCategories = function(){
		$scope.categories = true;
	}
	$scope.hideCategories = function(){
		$scope.categories = false;
	}
	//HOME
	$scope.category = 'all';
	$scope.setCategory = function(category){
		$scope.category = category;
		//Reloads home page once category set
		$route.reload();
	};
	$scope.searchString = "";
 });
app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close();
    };
 });
//Controllers
//You must create a controller for your views, if you need data from the server 
app.controller('homeCtrl', function($scope,$location,$http){
	$scope.search = false;
	$scope.setSideBar("menu/homesidebar.html");
	$scope.homeModel = new HomeModel([new ProjectModel("0","Test","Test","Test","img/placeholder.png","Test",0,0),new ProjectModel("0","Test","Test","Test","img/placeholder.png","Test",0,0),new ProjectModel("0","Test","Test","Test","img/placeholder.png","Test",0,0),new ProjectModel("0","Test","Test","Test","img/placeholder.png","Test",0,0)],[new ProjectModel("0","Test","Test","Test","img/placeholder.png","Test",0,0),new ProjectModel("0","Test","Test","Test","img/placeholder.png","Test",0,0),new ProjectModel("0","Test","Test","Test","img/placeholder.png","Test",0,0),new ProjectModel("0","Test","Test","Test","img/placeholder.png","Test",0,0)],[new ProjectModel("0","Test","Test","Test","img/placeholder.png","Test",0,0),new ProjectModel("0","Test","Test","Test","img/placeholder.png","Test",0,0),new ProjectModel("0","Test","Test","Test","img/placeholder.png","Test",0,0),new ProjectModel("0","Test","Test","Test","img/placeholder.png","Test",0,0)],[],[]);
	
	$scope.setHomeModel = function(category){
		//Make ajax call, populate homeModel
	};
	//Set lists
	$scope.getFeaturedProjects=function(){
		$http.get('/php/getFeaturedProjects.php',{params:{category:$scope.category}},{headers:{'Content-type':'application/x-www-form-urlencoded;charset=UTF-8;'}})
		.then(function success(response){
			$scope.homeModel.featuredProjects = response.data
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	$scope.getNewestProjects=function(){
		$http.get('/php/getNewestProjects.php',{params:{'category':$scope.category}},{headers:{'Content-type':'application/x-www-form-urlencoded;charset=UTF-8;'}})
		.then(function success(response){
			$scope.homeModel.newestProjects = response.data
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	$scope.getMostPopularProjects=function(){
		$http.get('/php/getMostPopularProjects.php',{params:{'category':$scope.category}},{headers:{'Content-type':'application/x-www-form-urlencoded;charset=UTF-8;'}})
		.then(function success(response){
			$scope.homeModel.popularProjects = response.data
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	$scope.getNameProjects=function(name){
		$http.get('/php/getProjectsByName.php',{params:{'search':$scope.searchText}},{headers:{'Content-type':'application/x-www-form-urlencoded;charset=UTF-8;'}})
		.then(function success(response){
			$scope.homeModel.nameProjects = response.data
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	$scope.getKeywordProjects=function(category){
		$http.get('/php/getProjectsByKeywords.php',{params:{'search':$scope.searchText}},{headers:{'Content-type':'application/x-www-form-urlencoded;charset=UTF-8;'}})
		.then(function success(response){
			$scope.homeModel.keywordProjects = response.data
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	$scope.getFeaturedProjects();
	$scope.getNewestProjects();
	$scope.getMostPopularProjects();
	$scope.onProjectClick = function(project){
		//Need to change this to pass project id as param in sprint 2
		$scope.setProject(project);
		$location.path('/project/' + project.id);
	};
	$scope.onSearchTextChanged = function(){
		if($scope.searchText == ""){
			$scope.showCategories();
			$scope.search = false;
		} else {
			$scope.search = true;
			$scope.hideCategories();
			$scope.getNameProjects($scope.searchText);
			$scope.getKeywordProjects($scope.searchText);
		}
	};
});
//Example View
app.controller('profileCtrl', function($scope,$cookies,$location,$http,$window){
	$scope.setSideBar("menu/profilesidebar.html");
	$scope.projects = [];
	$scope.donatedToProjects = [];
	$scope.edit = function(){
		$location.path('/profileedit');
	};
	//Set lists
	$scope.getProjectsByProfileId = function(id){
		$http.get('/php/getProjectsByProfileId.php',{params:{profileid:id}},{headers:{'Content-type':'application/x-www-form-urlencoded;charset=UTF-8;'}})
		.then(function success(response){
			$scope.projects = response.data;
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	$scope.getDonatedToProjects = function(id){
		$http.get('/php/getDonatedToProjects.php',{params:{profileid:id}},{headers:{'Content-type':'application/x-www-form-urlencoded;charset=UTF-8;'}})
		.then(function success(response){
			$scope.donatedToProjects = response.data;
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	$scope.getProjectsByProfileId($scope.profile.id);
	$scope.getDonatedToProjects($scope.profile.id);
	$scope.onProjectClick = function(project){
		$scope.setProject(project);
		$location.path('/projectedit');
	};
	//METHODS
	$scope.openProject = function(project){
		$location.path('/project/' + project.id);
	}
	$scope.addProject = function(){
		if ($scope.profile.approved == '1'){
			$scope.setProject(new EmptyProjectModel());
			$location.path('/projectedit');
		} else {
			$location.path('/setprofilenotapproved');
		}
	};
	$scope.signOut = function(){
		//Delete cookie
		$cookies.remove("crowdfundingapp");
		$window.location.href ='/';
	};
});
app.controller('projectCtrl', function($scope,$location,$routeParams,$http){
	$scope.setSideBar("menu/projectsidebar.html");
	//Need to change this to retrieve project id from param and load project 
	$scope.projectImages = [];
	$scope.ID = $routeParams.ID;
	$scope.goalAsString = "";
	$scope.percentage = "";
	//Get project data
	$scope.getProjectById = function(str){
		$http.get('/php/getProjectById.php',{params:{projectid:str}},{headers:{'Content-type':'application/x-www-form-urlencoded;charset=UTF-8;'}})		
		.then(function success(response){
			if (response.data == "no project"){
				$location.path("/home");
			} else {
				$scope.setProject(response.data);
				$scope.addViewedProject(response.data);
				var total = parseFloat($scope.project.total).toFixed(2);
				var goal = parseFloat($scope.project.goal).toFixed(2);
				$scope.goalAsString = "£" + total + " Raised of " + "£" + goal;
				var ratio = total / goal * 100;
				if (ratio >= 100){
					$('#progressBar').addClass("progress-bar-warning");
					$('#progressBar').attr("aria-valuenow",ratio);
					$('#progressBar').css("width", 100 + "%");
				} else {
					$('#progressBar').attr("aria-valuenow",ratio);
					$('#progressBar').css("width", ratio + "%");
				}
				$scope.percentage = ratio.toFixed(0) + "%";
			}		
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	$scope.getProjectImages = function(id){
		$http.get('/php/getProjectImages.php',{params:{projectid:id}},{headers:{'Content-type':'application/x-www-form-urlencoded;charset=UTF-8;'}})		
		.then(function success(response){
			$scope.projectImages = response.data;
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	$scope.getProjectById($scope.ID);
	$scope.getProjectImages($scope.ID);
});
app.controller('profileEditCtrl', function($scope,$http,$location){
	$scope.setSideBar("menu/profilesidebar.html");
	$scope.editProfile = $scope.profile;
	$scope.newPassword = "";
	$scope.reEnteredPassword = "";
	$scope.file = null;
	//Saved edited profile
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
app.controller('projectEditCtrl', function($scope,$http,$location){
	$scope.setSideBar("menu/projecteditsidebar.html");
	$scope.editProject = $scope.project;
	
	$scope.icon = null;
	$scope.images = null;
	if ($scope.editProject == null){
		$location.path('/profile');
	}
	$("#contentinput").val($scope.editProject.description);
	//Saves edit project
	$scope.save = function(){
		if ($scope.editProject.name == "" || $scope.editProject.category == "" || $scope.editProject.goal == 0){
			$scope.showAlert('Alert', 'Please fill in all fields',null);
		} else {
			var fd = new FormData();
			for(var key in $scope.editProject){
				fd.append(key, $scope.editProject[key]);
			}
			fd.append('description',$("#contentinput").val());
			if ($scope.icon != null){
				fd.append('icon',$scope.icon[0]);
			}
			if ($scope.images != null){
				for(var key in $scope.images){
					fd.append('images[]',$scope.images[key]);
				}
			}
			fd.append('userid',$scope.profile.id);
			if ($scope.project.id == ""){
				//Insert
				$http.post('/php/addProject.php',
					fd,{
					transformRequest: angular.indentity,
					headers:{'Content-Type': undefined}
				})
				.then(function success(response){
					$location.path('/profile');
				}, function fail(response){
					$scope.showAlert('Alert', 'An Error Occured',null);
				});
			} else {
				//Update
				$http.post('/php/editProject.php',
					fd,{
					transformRequest: angular.indentity,
					headers:{'Content-Type': undefined}
				})
				.then(function success(response){
					$location.path('/profile');
				}, function fail(response){
					$scope.showAlert('Alert', 'An Error Occured',null);
				});
			}
		}
	}
});
app.controller('setProfileNotApprovedCtrl', function($scope,$http){
	$scope.setSideBar("menu/profilesidebar.html");
	//Sets profiled not approved from null to 0
	//So that it shows up in admin portal 
	$scope.setProfileNotApproved = function(){
		$http({
			method:'POST',
			url:'/php/setProfileAsNotApproved.php',
			data:{profileid:$scope.profile.id},
			headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
		})
		.then(function success(response){
			
		}, function fail(response){
			$scope.showAlert('Alert', 'An Error Occured',null);
		});
	};
	$scope.setProfileNotApproved();
});
app.controller('donationCtrl', function($scope,$cookies,$http,$location){
	$scope.setSideBar("menu/projecteditsidebar.html");
	$scope.title = "Loading...";
	$scope.message = "";
	//Gets GET parameters and values from URL
	$scope.return = $location.search();
	$location.search({});
	if ($scope.return.tx == ""){
		$location.path("/home");
	}
	//Gets transaction info
	$http({
		method:'POST',
		url:'php/paypalSuccess.php',
		data:{userid:$cookies.get("crowdfundingapp"),projectid:$scope.return.cm,amount:$scope.return.amt,transid:$scope.return.tx},
		headers:{'Content-Type':'application/x-www-form-urlencoded'}
	})
	.then(function success(response){
		$scope.title = "Donation Success";
		$scope.message = "Thank You";
	}, function fail(response){
		$scope.showAlert('Alert', 'An Error Occured',null);
	});
});
app.controller('loadingCtrl', function($scope,$location){
	$scope.setSideBar("menu/projecteditsidebar.html");
	$location.path('/home');
});
