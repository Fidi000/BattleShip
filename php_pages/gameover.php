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
 
$get_turn = "UPDATE players SET gameisdone='2' WHERE username='$playerusername'";

$get_turn2 = "UPDATE players SET gameisdone='1' WHERE username='$enemyusername'";

$result = $conn->query($get_turn);

$query = $conn->query($get_turn2);

echo "gameisdoneYO";

$conn->close();

?>
