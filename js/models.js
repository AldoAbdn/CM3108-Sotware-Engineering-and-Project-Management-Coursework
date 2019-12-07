//SideBar
function SideBar(content){
	this.content = content;
}
//Models
function PageModel(sideBarModel,view){
	this.sideBarModel = sideBarModel;
	this.view = view;
}
function ProfileModel(userID,name,email,avatar,password,salt,admin,approved){
	this.id = userID;
	this.name = name;
	this.email = email;
	this.avatar = avatar;
	this.password = password;
	this.admin = admin;
	this.approved = approved;
	this.viewed = [];
}
function EmptyProfileModel(){
	this.id = "";
	this.name = "";
	this.email = "";
	this.avatar = "";
	this.password = "";
	this.admin = "";
	this.approved = 0;
	this.viewed = [];
}
function ProjectModel(projectID,name,category,iconimage,desc,total,goal,approved){
	this.id = projectID;
	this.name = name;
	this.category = category;
	this.icon = iconimage;
	this.description = desc;
	this.total = total;
	this.goal = goal;
	this.approved = approved;
}
function EmptyProjectModel(){
	this.id = "";
	this.name = "";
	this.category = "";
	this.icon = "";
	this.description = "";
	this.total = 0;
	this.goal = 0;
	this.approved = 0;
}
function Image (id,userID,projectID,image){
	this.id = id;
	this.userID = userID;
	this.projectID = projectID;
	this.image = image;
} 
function EmptyImage(){
	this.id = "";
	this.userID = "";
	this.projectID = "";
	this.image = "";
}
function EmptyDonation(){
	this.projectName = "";
	this.username = "";
	this.userEmail = "";
	this.amount = 0;
	this.trans = "";
}
function HomeModel(featuredProjects,newestProjects,popularProjects,nameProjects,keywordProjects){
	this.featuredProjects = featuredProjects;
	this.newestProjects = newestProjects;
	this.popularProjects = popularProjects;
	this.nameProjects = nameProjects;
	this.keywordProjects = keywordProjects;
}