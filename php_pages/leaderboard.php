<?php

$servername = "localhost";
$dbusername = "battleshipproject";
$dbpassword = "ContWdeOTzAb3Seh";
$dbname = "accountinfo";

if(isset($_POST["orderby"]))
{
  $orderby = $_POST["orderby"];
}

if(isset($_POST["test"]))
{
  $test = $_POST["test"];
}

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if($test==1)
{
  if($orderby == "username")
    {
     $sql = "SELECT username,gameswon,gamesplayed,timeplayed FROM players ORDER BY $orderby DESC";
    }
      else
    {
      $sql = "SELECT username,gameswon,gamesplayed,timeplayed FROM players ORDER BY $orderby";
    }
}
else
{
    if($orderby == "username")
    {
     $sql = "SELECT username,gameswon,gamesplayed,timeplayed FROM players ORDER BY $orderby";
    }
      else
    {
      $sql = "SELECT username,gameswon,gamesplayed,timeplayed FROM players ORDER BY $orderby DESC";
    }
}


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