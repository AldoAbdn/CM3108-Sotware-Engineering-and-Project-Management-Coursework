<?php
	class Project{
		public $id;
		public $name;
		public $category;
		public $icon;
		public $description;
		public $total;
		public $goal;
		public $approved;

		public function __construct($projectId,$name,$category,$icon,$desc,$total,$goal,$approved){
			$this->id = $projectId;
			$this->name = $name;
			$this->category = $category;
			$this->icon = $icon;
			$this->description = $desc;
			$this->total = $total;
			$this->goal = $goal;
			$this->approved = $approved;
		}
	}
?>