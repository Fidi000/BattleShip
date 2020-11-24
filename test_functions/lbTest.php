<?php
$servername = "localhost";
$dbusername = "battleshipproject";
$dbpassword = "ContWdeOTzAb3Seh";
$dbname = "accountinfo";

$playerusername = $_POST['u'];
$playerpassword = $_POST['p'];
$gamesplayed = $_POST['gp'];
$timeplayed = $_POST['tp'];
$gameswon = $_POST['w'];
$rtp = $_POST['rtp'];
$turn = $_POST['turn'];
$coords = NULL;
$currentop = NULL;
$done = NULL;


$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT username FROM players where username='$playerusername'";

$results = $conn->query($sql);

$exists = $results->num_rows;

if ($exists > 0)
{
  echo "Username already exists";
}
else
{
  $sql = "INSERT INTO players (username, password, gamesplayed, timeplayed, gameswon, readytoplay, turn
		, coords, currentopponent, gameisdone)
          VALUES ('$playerusername','$playerpassword');";
  echo "1";
  
}


if ($conn->query($sql) !== FALSE) {
  } 
else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

  if($exists==0)
  {
      session_start();
      $_SESSION['loggedin'] = true;
      $_SESSION['username'] = $playerusername;
  
  }

$conn->close();


?>