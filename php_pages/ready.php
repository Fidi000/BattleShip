<?php

session_start();
$servername = "localhost";
$dbusername = "battleshipproject";
$dbpassword = "ContWdeOTzAb3Seh";
$dbname = "accountinfo";

$playerusername = $_SESSION['username'];
$jsonarray = $_POST['coords'];
$decoded = json_decode($jsonarray,true);
$seralized = serialize($decoded);
$ready = 1;

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE players SET readytoplay='$ready', coords='$seralized' WHERE username='$playerusername'";

if ($conn->query($sql) !== FALSE) {} 
else {echo "Error: " . $sql . "<br>" . $conn->error;}

echo "You are now ready to play";

$conn->close();

?>