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

echo $playerusername;

?>
