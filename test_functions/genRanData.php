<?php
session_start();

$servername = "localhost";
$dbusername = "battleshipproject";
$dbpassword = "ContWdeOTzAb3Seh";
$dbname = "accountinfo";

$playerusername = $_SESSION['username'];

//Update gamesplayed for random names
$gplayed = rand (1, 100);

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

$get_turn = "UPDATE players SET gamesplayed = $gplayed WHERE username='$playerusername'";

$result = $conn->query($get_turn);

$conn->close();


//Update gameswon for random names

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

$gwon = rand ( 0 , $gplayed)
 
$get_turn = "UPDATE players SET gameswon = $gwon WHERE username='$playerusername'";

$get_turn2 = $conn->query("UPDATE players SET gamesplayed = gamesplayed + 1 WHERE username='$playerusername'");

$result = $conn->query($get_turn);

$conn->close();


//Update time for random names

$elapsed = $_POST["mstime"];

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
 
$get_turn = "UPDATE players SET timeplayed = timeplayed + $elapsed WHERE username='$playerusername'";

$result = $conn->query($get_turn);

$conn->close();
?>
