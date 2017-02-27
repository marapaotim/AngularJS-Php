<?php
class DB{
	private $dbHost;
    private $dbUsername;
    private $dbPassword;
    private $dbName;

	public function __construct(){
		$this->dbHost = 'localhost';
		$this->dbUsername = 'root';
		$this->dbPassword = '';
		$this->dbName = 'angular';
	}

	public function dBase(){ 
        $conn = new PDO("mysql:host=".$this->dbHost.";dbname=".$this->dbName, $this->dbUsername, $this->dbPassword);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn; 
	}
}