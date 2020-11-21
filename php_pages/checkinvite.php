<?php
session_start();

$servername = "localhost";
$dbusername = "battleshipproject";
$dbpassword = "ContWdeOTzAb3Seh";
$dbname = "accountinfo";

$playerusername = $_SESSION['username'];

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$getdata = "SELECT currentopponent FROM players WHERE username='$playerusername' ";

$result = $conn->query($getdata);

if(mysqli_num_rows($result) > 0)
{
    $row = $result->fetch_assoc();

    $enemyusername = $row["currentopponent"];

    $getarray = "SELECT coords, username FROM players WHERE username='$enemyusername'";
    
    $enemyresult = $conn->query($getarray);

    if(mysqli_num_rows($enemyresult) > 0)
    {
        $enemyrow = $enemyresult->fetch_assoc();

        $_SESSION['enemyusername'] = $enemyusername;

        $rows = $enemyrow["coords"];

        $deseralized = unserialize($enemyrow["coords"]);

        $array = json_encode($deseralized);

        echo $array;
    }
    else
    {
        echo 0;
    }

}
else
{
  echo 0;
}


?>
