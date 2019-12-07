<?php
	class Image {
		public $id;
		public $userID;
		public $projectID;
		public $image;

		public function __construct($id,$userID,$projectID,$image){
			$this->id = $id;
			$this->userID = $userID;
			$this->projectID = $projectID;
			$this->image = $image;
		}
	}
?>