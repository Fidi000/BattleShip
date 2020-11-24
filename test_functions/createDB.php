<?php 
$servername = "localhost";
$username = "AdminLab12";
$password = "4VPnroTOC6wOU3mn";
$db = "MyCarsLab12";
// Create connection
$conn = new mysqli($servername, $username, $password);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Create database
$sql = "CREATE DATABASE MyCarsLab12";
if ($conn->query($sql) === TRUE) {
  echo "Database created successfully";
} else {
  echo "Error creating database: " . $conn->error;
}
$conn->close();

$conn = new mysqli($servername, $username, $password, $db);
$sql = "CREATE TABLE Car (
brand VARCHAR(16) NOT NULL,
model VARCHAR(16) NOT NULL,
year YEAR(4) NOT NULL,
color VARCHAR(16),
bodyStyle VARCHAR(16),
transmission VARCHAR(16),
type VARCHAR(16)
)";

if ($conn->query($sql) === TRUE) {
  echo "Table Car created successfully";
} else {
  echo "Error creating table: " . $conn->error;
}
$conn->close();
?>