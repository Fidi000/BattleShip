hostname = "localhost"
username = "battleshipproject";
password = "ContWdeOTzAb3Seh";
data base name = "accountinfo"

1) Install XAMPP, once installed start the apache and mysql functionalities, under actions. Then press admin in the MYSQL row to open the php admin page.

	(REMEMBER TO GRANT ALL PRIVLEGIES FOR THE ACCOUNT, GLOBAL TOO)
	
2a) In the MySQL admin, create a new user with the username and password mentioned above [MUST USE THIS USERNAME AND PASSWORD] 
2b) AND with the database name mentioned above
2c) and set the host name to LOCALHOST
2d) and CREATE A DATABASE CALLED accountinfo 



once the database is created 
3) import the players.sql found in the main folder into the database that you created, which should give you all the information in the data base that you need.

However, there is a script to populate with more random data found in the test_function folder, open the name.html page in a server environment,
and press the button and more names should be added.

Once that is done all the other pages will work when hosting on the server and you will be able to play.





