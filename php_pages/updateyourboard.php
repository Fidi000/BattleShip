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

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$getdata = "SELECT coords FROM players WHERE username='$playerusername'";

//$getdata = "SELECT coords FROM players WHERE username='$playerusername' AND turn='0'";

$result = $conn->query($getdata);

if(mysqli_num_rows($result) > 0) 
{
  global $conn, $x, $y;
  $row = $result->fetch_assoc();
  $deseralized = unserialize($row["coords"]); //get coords and deseralizes it 

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
