<?php
session_start();

$servername = "localhost";
$dbusername = "battleshipproject";
$dbpassword = "ContWdeOTzAb3Seh";
$dbname = "accountinfo";





$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}


if(isset($_SESSION["username"]))
{
  $playerusername = $_SESSION['username'];
  $deleteyou = "UPDATE players SET currentopponent=NULL, readytoplay='0', coords=NULL WHERE username='$playerusername'";
  $conn->query($deleteyou);
}

if(isset($_SESSION["enemyusername"]))
{
  $enemyusername =  $_SESSION['enemyusername'];
  $delete_enemy = "UPDATE players SET currentopponent=NULL, readytoplay='0', coords=NULL WHERE username='$enemyusername'";
  $conn->query($delete_enemy);

}



if(isset($_SESSION['enemyusername'])){
  unset($_SESSION['enemyusername']);
}

$conn->close();

?>
