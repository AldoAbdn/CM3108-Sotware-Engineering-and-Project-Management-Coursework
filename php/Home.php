<?php
	class Home{
		public $featuredProjects;
		public $newestProjects;
		public $popularProjects;
		public $nameProjects;
		public $keywordProjects;

		public function __construct($featuredProjects,$newestProjects,$popularProjects,$nameProjects,$keywordProjects){
			$this->featuredProjects = $featuredProjects;
			$this->newestProjects = $newestProjects;
			$this->popularProjects = $popularProjects;
			$this->nameProjects = $nameProjects;
			$this->keywordProjects = $keywordProjects;
		}
	}
?>