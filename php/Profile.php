<?php
	class Profile {
		public $id;
		public $name;
		public $email;
		public $avatar;
		public $password;
		public $salt;
		public $admin;
		public $approved;

		public function __construct($userID,$name,$email,$avatar,$password,$salt,$admin,$approved){
			$this->id = $userID;
			$this->name = $name;
			$this->email = $email;
			$this->avatar = $avatar;
			$this->password = $password;
			$this->salt = $salt;
			$this->admin = $admin;
			$this->approved = $approved;
		}
	}
?>