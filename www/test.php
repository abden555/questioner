<?
$con = mysql_connect("localhost","pixeledg_tedgh","mHi_0x0mk&-N");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("pixeledg_dgh", $con);

if(mysql_query("INSERT INTO questioner (promoterID,Name,Mobile,Age,Email,Nationality,question1,question2,question3,question4) VALUES ('".$_POST['promoterID']."','".$_POST['Name']."','".$_POST['Mobile']."','".$_POST['Age']."','".$_POST['Email']."','".$_POST['Nationality']."','".$_POST['question1']."','".$_POST['question2']."','".$_POST['question3']."','".$_POST['question4']."')")) {
	echo "DONE";	
} else {
	echo "NOT DONE";	
}

?>