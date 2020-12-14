<?php
session_start();

$servername = "localhost";
$dbusername = "battleshipproject";
$dbpassword = "ContWdeOTzAb3Seh";
$dbname = "accountinfo";

$playerusername = $_SESSION['username'];

$elapsed = $_POST["mstime"];

$isdone = $_POST["isdone"];

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
 
$get_turn = "UPDATE players SET timeplayed = timeplayed + $elapsed WHERE username='$playerusername'";

$result = $conn->query($get_turn);

echo "time played updated in database";

$conn->close();

?>
