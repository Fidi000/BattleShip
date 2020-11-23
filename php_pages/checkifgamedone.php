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
 
$get_gamedone = "SELECT turn FROM players WHERE username='$playerusername' AND gameisdone='2'";


$result = $conn->query($get_gamedone);

$get_gamedone2 = "SELECT turn FROM players WHERE username='$enemyusername' AND gameisdone='2'";


$result2 = $conn->query($get_gamedone2);


if(mysqli_num_rows($result) == 1) {
    echo 1;
}
elseif(mysqli_num_rows($result2) == 1){
    echo 2;
}
else {
    echo 0;
}

$conn->close();

?>
