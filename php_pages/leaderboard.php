<?php

$servername = "localhost";
$dbusername = "battleshipproject";
$dbpassword = "ContWdeOTzAb3Seh";
$dbname = "accountinfo";


$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT username,gameswon,gamesplayed,timeplayed FROM players ORDER BY gameswon";

$results = $conn->query($sql);

$rows = array();

while($r = mysqli_fetch_assoc($results)) {
    $rows[] = $r;
}
echo json_encode($rows);


if ($conn->query($sql) !== FALSE) {
  } 
else {
    echo $conn->error;
  }


$conn->close();


?>