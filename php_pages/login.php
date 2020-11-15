<?php

$dbusername = "battleshipproject";
$dbpassword = "ContWdeOTzAb3Seh";
$dbname = "accountinfo";

$playerusername = $_POST['u'];
$playerpassword = $_POST['p'];

echo $playerpassword . $playerusername;

// $conn = new mysqli($servername, $username, $password, $dbname);

// if ($conn->connect_error) {
//   die("Connection failed: " . $conn->connect_error);
// }

// $sql = "INSERT INTO Car (brand, model, yearmade, color, style, transmission, wheeldrive)
//         VALUES ('$brand','$model','$year','$color','$style','$transmission','$type');";


// if ($conn->multi_query($sql) === TRUE) {
//     echo "";
//   } else {
//     echo "Error: " . $sql . "<br>" . $conn->error;
//   }

// $conn->close();


?>