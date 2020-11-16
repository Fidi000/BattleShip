<?php
session_start();

$servername = "localhost";
$dbusername = "battleshipproject";
$dbpassword = "ContWdeOTzAb3Seh";
$dbname = "accountinfo";

$playerusername = $_SESSION['username'];
$enemyusername =  $_SESSION['enemyusername'];

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$deleteyou = "UPDATE players SET currentopponent='NULL', readytoplay='0', coords='0' WHERE username='$playerusername'";
$delete_enemy = "UPDATE players SET currentopponent='NULL', readytoplay='0', coords='0' WHERE username='$enemyusername'";

$conn->query($deleteyou);

$conn->query($delete_enemy);

unset($_SESSION['enemyusername']);

?>
