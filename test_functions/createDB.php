<?php  
$servername = "localhost";
$username = "AranFidel";
$password = "Fall2020Project";
$db = "BattleShip";
// Create connection
$conn = new mysqli($servername, $username, $password);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE BattleShip";
if ($conn->query($sql) === TRUE) {
  echo "Database created successfully";
} else {
  echo "Error creating database: " . $conn->error;
}
$conn->close();

$conn = new mysqli($servername, $username, $password, $db);
$sql = "CREATE TABLE gameData (
username VARCHAR(16) NOT NULL,
password VARCHAR(16) NOT NULL,
gamesplayed INT(4) NOT NULL,
timeplayed INT(12),
gameswon INT(16)
)";

if ($conn->query($sql) === TRUE) {
  echo "Table Car created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}
$conn->close();
?>