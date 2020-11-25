<?php
session_start();

$servername = "localhost";
$dbusername = "battleshipproject";
$dbpassword = "ContWdeOTzAb3Seh";
$dbname = "accountinfo";

$playerusername = $_SESSION['username'];

$enemyusername = $_SESSION['enemyusername'];

$superenabled = $_POST['power'];

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
 
$setopponents = $conn->query("UPDATE players SET turn='1' WHERE username='$playerusername'");

$settheiropponents = $conn->query("UPDATE players SET turn='0' WHERE username='$enemyusername'");


if($superenabled == "true")
{
  $setpowers = $conn->query("UPDATE players SET superpower='1' WHERE username='$playerusername'");
  $setpowersthem = $conn->query("UPDATE players SET superpower='1' WHERE username='$enemyusername'");
}
else
{
  $setpowers = $conn->query("UPDATE players SET superpower='0' WHERE username='$playerusername'");
  $setpowersthem = $conn->query("UPDATE players SET superpower='0' WHERE username='$enemyusername'");
}

echo $superenabled;



$conn->close();

?>
