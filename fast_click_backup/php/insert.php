<?php 
	$playerName = $_GET["playerName"];
	$score = $_GET["score"];
	$sql="INSERT INTO usersscores (name, score)  VALUES ('$playerName',$score)";
	
  //--------------------------------------------------------------------------
  // Example php script for fetching data from mysql database
  //--------------------------------------------------------------------------
  
  $host = "localhost";
  $user = "root";
  $pass = "";

  $databaseName = "users";
  $tableName = "usersscores";

  //--------------------------------------------------------------------------
  // 1) Connect to mysql database
  //--------------------------------------------------------------------------
   $con = mysql_connect($host,$user,$pass);
   $dbs = mysql_select_db($databaseName, $con);
  // run mysql query 
   $res = mysql_query($sql) ;
    
  ?>
