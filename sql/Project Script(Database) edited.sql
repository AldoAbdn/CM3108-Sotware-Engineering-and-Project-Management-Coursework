drop database Project_DB;
create database Project_DB;
use Project_DB;

create table user_details (
User_ID int(4) auto_increment,
User_name varchar(25),
Email varchar(25),
Avatar varchar(30),
Passwrd varchar(512),
Salt varchar(512),
Admin BIT,
Approved BIT,
primary key (User_ID));

create table project (
Project_ID int(4) auto_increment,
Project_Name varchar(40),
Category varchar(16),
Icon varchar(30),
Description varchar(1000),
Total decimal (19,2),
Goal decimal (19,2),
Approved BIT,
User_ID int(4),
Views BIGINT NOT NULL,
Featured BIT(1) NOT NULL,
primary key (Project_ID));

create table paypal (
Trans_Code varchar(123),
User_ID int(4),
Project_ID int(4),
Ammount_Donated decimal(19,2),
primary key (Trans_Code));

create table image (
Image_ID int(4) auto_increment,
User_ID int(4),
Project_ID int(4),
Image varchar(30),
primary key (Image_ID));

INSERT INTO user_details (User_name,Email,Avatar,Passwrd,Admin,Approved) VALUES ('User','user@rgu.ac.uk','/img/profile.png','P@ssw0rd',0,0);
INSERT INTO user_details (User_name,Email,Avatar,Passwrd,Admin,Approved) VALUES ('Admin','admin@rgu.ac.uk','/img/profile.png','P@ssw0rd',1,1);

INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Sport 1','Sports','/img/sports.jpeg','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);
INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Biology 1','Biology','/img/biology.jpg','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);
INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Computer 1','Computer Science','/img/computer.jpg','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);
INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Digital Media 1','Digital Media','/img/digital.png','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);
INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Other 1','Other','/img/other.jpg','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);

INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Sport 2','Sports','/img/sports.jpeg','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);
INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Biology 2','Biology','/img/biology.jpg','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);
INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Computer 2','Computer Science','/img/computer.jpg','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);
INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Digital Media 2','Digital Media','/img/digital.png','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);
INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Other 2','Other','/img/other.jpg','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);

INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Sport 3','Sports','/img/sports.jpeg','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);
INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Biology 3','Biology','/img/biology.jpg','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);
INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Computer 3','Computer Science','/img/computer.jpg','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);
INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Digital Media 3','Digital Media','/img/digital.png','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);
INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Other 3','Other','/img/other.jpg','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);

INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Sport 4','Sports','/img/sports.jpeg','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);
INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Biology 4','Biology','/img/biology.jpg','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);
INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Computer 4','Computer Science','/img/computer.jpg','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);
INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Digital Media 4','Digital Media','/img/digital.png','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);
INSERT INTO project (Project_Name,Category,Icon,Description,Total,Goal,Approved,User_ID,Views,Featured) VALUES ('Project Other 4','Other','/img/other.jpg','<p><strong><u>Our Goal</u></strong></p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ornare nec tellus commodo malesuada. Curabitur id neque lacus. Sed pretium purus eu bibendum malesuada. Integer lorem lorem, tincidunt sit amet malesuada in, egestas eget lacus. Nulla facilisi. Integer suscipit, sapien a commodo fringilla, ante dolor hendrerit massa, non imperdiet est odio in ipsum. Aliquam in purus nec ante sodales varius at malesuada lacus.</p><p><strong><u>Members</u></strong></p><p>Alistair,Chris,Robbie,Connor,Ajraf</p><p><em>Thank you for funding our project</em></p>',5000,10000,1,1,0,1);

INSERT INTO image (User_ID,Project_ID,Image) VALUES ('1','1','/img/placeholder.png');
INSERT INTO image (User_ID,Project_ID,Image) VALUES ('1','2','/img/placeholder.png');
INSERT INTO image (User_ID,Project_ID,Image) VALUES ('1','3','/img/placeholder.png');
INSERT INTO image (User_ID,Project_ID,Image) VALUES ('1','4','/img/placeholder.png');
INSERT INTO image (User_ID,Project_ID,Image) VALUES ('1','5','/img/placeholder.png');
INSERT INTO image (User_ID,Project_ID,Image) VALUES ('1','6','/img/placeholder.png');
INSERT INTO image (User_ID,Project_ID,Image) VALUES ('1','7','/img/placeholder.png');
INSERT INTO image (User_ID,Project_ID,Image) VALUES ('1','8','/img/placeholder.png');
INSERT INTO image (User_ID,Project_ID,Image) VALUES ('1','9','/img/placeholder.png');
INSERT INTO image (User_ID,Project_ID,Image) VALUES ('1','10','/img/placeholder.png');
INSERT INTO image (User_ID,Project_ID,Image) VALUES ('1','11','/img/placeholder.png');
INSERT INTO image (User_ID,Project_ID,Image) VALUES ('1','12','/img/placeholder.png');

INSERT INTO paypal VALUES ('1','1','1',5000);
INSERT INTO paypal VALUES ('2','1','2',5000);
INSERT INTO paypal VALUES ('3','1','3',5000);
INSERT INTO paypal VALUES ('4','1','4',5000);
INSERT INTO paypal VALUES ('5','1','5',5000);
INSERT INTO paypal VALUES ('6','1','6',5000);
INSERT INTO paypal VALUES ('7','1','7',5000);
INSERT INTO paypal VALUES ('8','1','8',5000);
INSERT INTO paypal VALUES ('9','1','9',5000);
INSERT INTO paypal VALUES ('10','1','10',5000);
INSERT INTO paypal VALUES ('11','1','11',5000);
INSERT INTO paypal VALUES ('12','1','12',5000);