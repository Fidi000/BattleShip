<?php
session_start();

$servername = "localhost";
$dbusername = "battleshipproject";
$dbpassword = "ContWdeOTzAb3Seh";
$dbname = "accountinfo";


if(isset($_SESSION['username']))
{
  $playerusername = $_SESSION['username'];
}


if(isset($_SESSION['enemyusername']))
{
  $enemyusername = $_SESSION['enemyusername'];
}

$coords = $_POST['torpedo'];

$x = intval(substr($coords, -2, 1));
$y = intval(substr($coords, -1));

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$getdata = "SELECT coords FROM players WHERE username='$enemyusername' AND turn='0'";

//$getdata = "SELECT coords FROM players WHERE username='$playerusername' AND turn='0'";

$result = $conn->query($getdata);

if(mysqli_num_rows($result) > 0) 
{
  global $conn, $x, $y;
  $row = $result->fetch_assoc();
  $deseralized = unserialize($row["coords"]); //get coords and deseralizes it 
  $deseralized[$x][$y] = 0; //sets coord at torpedo to 0

  $seralized = serialize($deseralized);
  $sql = "UPDATE players SET coords='$seralized' WHERE username='$enemyusername'";
  //$sql = "UPDATE players SET coords='$seralized' WHERE username='$playerusername'";
  $conn->query($sql);

  $array = json_encode($deseralized); // encodes and sends back to javascript
  
  echo $array;



}
else
{
  echo 0;
}



if ($conn->query($getdata) !== FALSE) {} 
else {echo "Error: " . $getdata . "<br>" . $conn->error;}

$conn->close();

?>
