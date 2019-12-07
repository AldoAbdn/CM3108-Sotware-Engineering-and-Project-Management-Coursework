<?php
	class Donation{
		public $projectName;
		public $username;
		public $userEmail;
		public $amount;
		public $trans;

		public function __construct($projectName,$username,$userEmail,$amount,$trans){
			$this->projectName = $projectName;
			$this->username = $username;
			$this->userEmail = $userEmail;
			$this->amount = $amount;
			$this->trans = $trans;
		}
	}
?>