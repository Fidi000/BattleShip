<?php
session_start();

$servername = "localhost";
$dbusername = "battleshipproject";
$dbpassword = "ContWdeOTzAb3Seh";
$dbname = "accountinfo";

$playerusername = $_SESSION['username'];

$enemyusername = $_SESSION['enemyusername'];



$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
 
$setopponents = $conn->query("UPDATE players SET turn='0' WHERE username='$playerusername'");

$settheiropponents = $conn->query("UPDATE players SET turn='1' WHERE username='$enemyusername'");


$conn->close();

?>
