<?php 
$file = file_get_contents("names.json");
//echo $file;
//if (isset($_POST["updatedList"])){
//	$updatedList = $_POST["updatedList"];
//	file_put_contents('mycars.json', $updatedList);
//}
//else{
//	echo $file;
//}

$arr = json_decode($file);

foreach($arr as $item) { //foreach element in $arr
    echo $uses = $item[0]; //etc
}
?>