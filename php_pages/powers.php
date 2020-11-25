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
 
$get_turn = "SELECT superpower FROM players WHERE username='$playerusername' AND superpower='1'";


$result = $conn->query($get_turn);


if(mysqli_num_rows($result) == 1)
{
    echo 1;
}
else
{
  echo 0;
}

$conn->close();

?>
