<?php
$servername = "localhost";
$dbusername = "battleshipproject";
$dbpassword = "ContWdeOTzAb3Seh";
$dbname = "accountinfo";

$playerusername = $_POST['u'];
$playerpassword = $_POST['p'];


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
  $sql = "INSERT INTO players (username, password)
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