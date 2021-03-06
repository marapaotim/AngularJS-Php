<?php
session_start();
include("db.php");
$Database;
$conn;
 
if(isset($_REQUEST['type']) && !empty($_REQUEST['type'])){
	 $type = $_REQUEST['type'];
	 switch($type){
	 	case "addUser": 
	 		$arrayUser = array(
		 						"name" => $_REQUEST['name'],
		 						"age" => $_REQUEST['age'],
		 						"gender" => $_REQUEST['gender'],
		 						"email" => $_REQUEST['email'],
		 						"username" => $_REQUEST['username'],
		 						"password" => $_REQUEST['password']
	 						);
	 		$insertAccount = new User();
	 		$insertAccount->insertUser($arrayUser);
	 		echo json_encode($arrayUser);
	 	break; 
	 	case "login":
	 		$arrayUser = array($_REQUEST['user'], $_REQUEST['pass']);
	 		$logUser = new User();
	 		$data = $logUser->logIn($arrayUser);
	 		echo json_encode($data);
	 	break; 
	 	case "session":
	 		$data = ''; 
	 		if(isset($_SESSION['name'])){
	 			$data = $_SESSION['name'];
	 		}
	 		else{
	 			$data = 'false'; 
	 		} 
	 		echo json_encode($data);
	 	break;
	 	case "session_logout":
	 		session_destroy();
	 		echo json_encode("log Out");
	 	break;
	 }
}


class User{
	public function insertUser($dataUser){  
		$this->Database = new DB(); 
		$this->conn = $this->Database->dBase();
		$sql = "INSERT INTO `angular`.`user`
(
	`name`,
	`age`,
	`gender`,
	`email_address`,
	`username`,
	`password`,
	`status`
)
VALUES
(
	:name,
	:age,
	:gender,
	:email_address,
	:username,
	:password,
	:status
);";
	   $on = "on";
       $query = $this->conn->prepare($sql); 
       $query->bindParam(':name', $dataUser["name"]);
       $query->bindParam(':age', $dataUser["age"]);
       $query->bindParam(':gender', $dataUser["gender"]);
       $query->bindParam(':email_address', $dataUser["email"]);
       $query->bindParam(':username', $dataUser["username"]);
       $query->bindParam(':password', $dataUser["password"]);
       $query->bindParam(':status', $on);
       $query->execute();
	}

	public function logIn($dataUser){    
		$this->Database = new DB(); 
		$this->conn = $this->Database->dBase();
		$sql = "SELECT * FROM `angular`.`user` where BINARY `user`.`username` = :username and `user`.`password` = :password"; 
        $query = $this->conn->prepare($sql);  
        $query->bindParam(':username', $dataUser[0]);
        $query->bindParam(':password', $dataUser[1]); 
        $query->execute();  
        $status = '';
        if($query->rowCount() > 0){ 
        	$rows = $query->fetchAll();
        	foreach ($rows as $data) {
        		$status = $data["status"];
        		if($status == "on"){
        			$_SESSION['name'] = $data["name"];
        			return "on";
        		}
        		else{
        			$_SESSION['name'] = null;
        			return "off";
        		}
        	}
        }
        else{
        	$_SESSION['name'] = null;
        	return "unknown";
        } 
	}
}

