// global variables
var db;
var shortName = 'WebSqlDB';
var version = '1.0';
var displayName = 'WebSqlDB';
var maxSize = 65535;
 
// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
   alert('Error: ' + error.message + ' code: ' + error.code);
 
}
// this is called when a successful transaction happens
function successCallBack() {
   //alert("DEBUGGING: success");
 
}
function nullHandler(){};
// called when the application loads
function onBodyLoad(){
 
// This alert is used to make sure the application is loaded correctly
// you can comment this out once you have the application working
//alert("DEBUGGING: we are in the onBodyLoad() function");
 
 if (!window.openDatabase) {
   // not all mobile devices support databases  if it does not, the following alert will display
   // indicating the device will not be albe to run this application
   alert('Databases are not supported in this browser.');
   return false;
 }
 
// this line tries to open the database base locally on the device
// if it does not exist, it will create it and return a database object stored in variable db
 db = openDatabase(shortName, version, displayName,maxSize);
 
// this line will try to create the table User in the database just created/openned
 db.transaction(function(tx){
 
  // you can uncomment this next line if you want the User table to be empty each time the application runs
  //tx.executeSql( 'DROP TABLE questions',nullHandler,nullHandler);
 
  // this line actually creates the table User if it does not exist and sets up the three columns and their types
  // note the UserId column is an auto incrementing column which is useful if you want to pull back distinct rows
  // easily from the table.
   tx.executeSql( 'CREATE TABLE IF NOT EXISTS questions(promoterID TEXT,Name TEXT,Mobile TEXT,Age TEXT,Email TEXT,Nationality TEXT,question1 TEXT, question2 TEXT, question3 TEXT, question4 TEXT)',
[],nullHandler,errorHandler);
 },errorHandler,successCallBack);
 
}
 
// list the values in the database to the screen using jquery to update the #lbUsers element
function ListDBValues() {
 
 if (!window.openDatabase) {
  alert('Databases are not supported in this browser.');
  return false;
 } else {
	//alert('Openied');
 }
 
// this line clears out any content in the #lbUsers element on the page so that the next few lines will show updated
// content and not just keep repeating lines
 $('#lbUsers').html('');
 
// this next section will select all the content from the User table and then go through it row by row
// appending the UserId  FirstName  LastName to the  #lbUsers element on the page
 db.transaction(function(transaction) {
   transaction.executeSql('SELECT * FROM questions;', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
          var row = result.rows.item(i);
          //$('#lbUsers').append('<br>' + row.question1 + '. ' + row.question2+ ' ' + row.question3 + ' ' + row.question4);
		  
        }
		$('#Name').val('');
		$('#Name').val('');
		$('#Mobile').val('');
		$('#Age').val('');
		$('#Email').val('');
		$('#Nationality').val('');
		$("input:radio").attr("checked", false);
		$("input:checkbox").attr("checked", false);
		$("#lbUsers").addClass('alert alert-success perauto100 roundcorner');
		$("#lbUsers").html('Successfully added the questionnaire');
		$("html, body").animate({ scrollTop: 0 }, "slow");
      }
     },errorHandler);
 },errorHandler,nullHandler);
 
 return false;
 
}
 
// this is the function that puts values into the database using the values from the text boxes on the screen
function AddValueToDB() {
 
 if (!window.openDatabase) {
   alert('Databases are not supported in this browser.');
   return false;
 } else {
	if($("#form1").valid()) {
		var errText = '' 
		var checkboxVal = $("input[name=question3]:checked").map(function () {
				return this.value;
			}).get().join(",")
		//alert(checkboxVal);
		
	   // this is the section that actually inserts the values into the User table
	   
	   db.transaction(function(transaction) { transaction.executeSql('INSERT INTO questions(promoterID, Name, Mobile, Age, Email, Nationality, question1, question2, question3, question4) VALUES (?,?,?,?,?,?,?,?,?,?)',[$("#promoterID").val(),$('#Name').val(),$('#Mobile').val(),$('#Age').val(),$('#Email').val(),$('#Nationality').val(),$('input[name=question1]:checked').val(), $('input[name=question2]:checked').val(), checkboxVal, $('input[name=question4]:checked').val()],
		 nullHandler,errorHandler);
	   });
	 
		// this calls the function that will show what is in the User table in the database
		ListDBValues();
	 
		return false;
	} else {
		$("html, body").animate({ scrollTop: 0 }, "slow");	
	}
 }
 return false;
}
 
function ExportDBValues() {
 
 if (!window.openDatabase) {
  alert('Databases are not supported in this browser.');
  return false;
 } else {
	//alert('Openied');
 }
 
// this line clears out any content in the #lbUsers element on the page so that the next few lines will show updated
// content and not just keep repeating lines
 $('#lbUsers').html('');
 
// this next section will select all the content from the User table and then go through it row by row
// appending the UserId  FirstName  LastName to the  #lbUsers element on the page
 db.transaction(function(transaction) {
   transaction.executeSql('SELECT * FROM questions;', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
		var rescheck = '';
        for (var i = 0; i < result.rows.length; i++) {
			var row = result.rows.item(i);
			//alert(row.promoterID);
			$.ajax({
				url: 'http://pixeledges.com/test.php',
				type: "POST",
				data:{'promoterID':row.promoterID,'Name':row.Name,'Mobile':row.Mobile,'Age':row.Age,'Email':row.Email,'Nationality':row.Nationality,'question1':row.question1,'question2':row.question2,'question3':row.question3,'question4':row.question4},
				success: function(data) {
					//alert(data);	
					rescheck = 1;
				}
			});
        }
		//alert(rescheck)
		//if(rescheck==1) {
			$("#lbUsers").addClass('alert alert-success perauto100 roundcorner');
			$("#lbUsers").html('Successfully exported to the server');
			$("html, body").animate({ scrollTop: 0 }, "slow");
			//transaction.executeSql( 'DROP TABLE questions',nullHandler,nullHandler);
			transaction.executeSql("DELETE FROM questions");
		//}
      }
     },errorHandler);
 },errorHandler,nullHandler);
 
 return;
 
} 
