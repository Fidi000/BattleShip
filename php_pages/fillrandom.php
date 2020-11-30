<?php
$servername = "localhost";
$dbusername = "battleshipproject";
$dbpassword = "ContWdeOTzAb3Seh";
$dbname = "accountinfo";

$playerusername = $_POST['u'];
$playerpassword = $_POST['p'];

$rand_gamesplayed = $_POST['gp'];
$rand_timedplayed = $_POST['tp'];
$rand_gameswon = $_POST['gw'];

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}



$sql = "INSERT INTO players (username, password, gamesplayed, timeplayed, gameswon)
          VALUES ('$playerusername','$playerpassword', '$rand_gamesplayed', '$rand_timedplayed', '$rand_gameswon');";
  

if ($conn->query($sql) !== FALSE) {
  } 
else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }


$conn->close();


?>