<?php
session_start();

$servername = "localhost";
$dbusername = "battleshipproject";
$dbpassword = "ContWdeOTzAb3Seh";
$dbname = "accountinfo";

$playerusername = $_SESSION['username'];

$isdone = $_POST["isdone"];

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if(!$isdone)
{
  $get_turn = "UPDATE players SET gameswon = gameswon + 1 WHERE username='$playerusername'";

  $get_turn2 = $conn->query("UPDATE players SET gamesplayed = gamesplayed + 1 WHERE username='$playerusername'");
  
  $result = $conn->query($get_turn);
}



$conn->close();

?>
