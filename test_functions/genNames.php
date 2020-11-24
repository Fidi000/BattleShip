<?php 
$file = file_get_contents("H:\Names\names.json");
if (isset($_POST["updatedList"])){
	$updatedList = $_POST["updatedList"];
	file_put_contents('mycars.json', $updatedList);
}
else{
	echo $file;
}
?>