<?
$con = mysql_connect("localhost","pixeledg_tedgh","mHi_0x0mk&-N");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("pixeledg_dgh", $con);

if(mysql_query("INSERT INTO questioner (FirstName,LastName) VALUES ('".$_POST['FirstName']."','".$_POST['LastName']."')")) {
	echo "DONE";	
} else {
	echo "NOT DONE";	
}

?>