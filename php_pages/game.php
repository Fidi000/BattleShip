<?php
session_start();

$servername = "localhost";
$dbusername = "battleshipproject";
$dbpassword = "ContWdeOTzAb3Seh";
$dbname = "accountinfo";

$playerusername = $_SESSION['username'];


$enemyusername = $_POST['enemyname'];



$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$getdata = "SELECT coords, username FROM players WHERE username='$enemyusername' AND readytoplay='1'";

$result = $conn->query($getdata);


if(mysqli_num_rows($result) > 0)
{
    $row = $result->fetch_assoc();
    $enemyname = $row['username'];
    $_SESSION['enemyusername'] = $row['username'];
    $rows = $row["coords"];
    $deseralized = unserialize($row["coords"]);
    $array = json_encode($deseralized);
    echo $array;

    global $conn;

    $setopponents = "UPDATE players SET currentopponent='$enemyusername' WHERE username='$playerusername'";
    $settheiropponents = "UPDATE players SET currentopponent='$playerusername' WHERE username='$enemyusername'";
    $conn->query($setopponents);
    $conn->query($settheiropponents);
}
else
{
  echo 0;
}



if ($conn->query($getdata) !== FALSE) {} 
else {echo "Error: " . $getdata . "<br>" . $conn->error;}

$conn->close();

?>
