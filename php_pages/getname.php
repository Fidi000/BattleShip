<?php
session_start();

$servername = "localhost";
$dbusername = "battleshipproject";
$dbpassword = "ContWdeOTzAb3Seh";
$dbname = "accountinfo";

$playerusername = $_SESSION['username'];

if(isset($_SESSION['enemyusername']))
{
    $enemyusername = $_SESSION['enemyusername'];
}

echo $enemyusername;

$conn->close();

?>
