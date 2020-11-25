function check()
{
    var j = new XMLHttpRequest(); 
    j.onreadystatechange = function () {
    if (j.readyState == 4 && j.status == 200) {
      var check = j.responseText;
      if(check==0){
          alert("Not logged in");
          location.replace("../html_pages/login.html");
      }
    }
};
    j.open('POST','../php_pages/check.php', true); 
    j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    j.send();
}
function sendcoords()
{
    //TODO CHANGE TO 7 WHEN DONE
    if(numofshipplaced==7)
    {
        var test = JSON.stringify(ship_coords);
        var j = new XMLHttpRequest(); 
        j.onreadystatechange = function () {
        if (j.readyState == 4 && j.status == 200) {
            document.getElementById("test").innerHTML = j.responseText;
            checkinvite();
            removereadybutton();
        }
    };
        j.open('POST','../php_pages/ready.php', true); 
        j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        j.send("coords=" + test); 
    }
    else
    {
        displayOverlapAlert("Must place all 7 ships!");
        setTimeout(hideOverlapAlert, 3000);
    }

}
function getenemyboard()
{
    invitename = document.getElementById("enemyname").value;
    var j = new XMLHttpRequest(); 
    j.onreadystatechange = function () {
    if (j.readyState == 4 && j.status == 200) {
        var returnedarray = JSON.parse(j.responseText);
        if(returnedarray==0)
        {
            displayOverlapAlert("Enemy does not exist or not ready");
            setTimeout(hideOverlapAlert, 5000);
        }
        else
        {
            
            startmstimer();
            getenemyname();
            starttimer();
            hidefinddiv();
            invite_got=true;
            enemy_coords = returnedarray;
            printenemyboard();
            document.getElementById("yourshipcountdiv").style.display = "block";
            document.getElementById("yourshipcount").innerHTML = totalyourship;
            document.getElementById("enemyshipcountdiv").style.display = "block";
            document.getElementById("enemyshipcount").innerHTML = totalship;
            
        }

    }
};
    j.open('POST','../php_pages/game.php', true); 
    j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    j.send("enemyname=" + invitename);
}
function checkifpower()
{
    var j = new XMLHttpRequest(); 
        j.onreadystatechange = function () {
            if (j.readyState == 4 && j.status == 200) {
                console.log(j.responseText);
                if(j.responseText == 1)
                {
                    superenabled = true;
                }
                if(superenabled == true)
                {
                    console.log("Super powers are enbaled")
                }
                else
                {
                    superenabled = false;
                    console.log("Powers are not enabled")
                }
            }
        };
    j.open('POST','../php_pages/powers.php', true); 
    j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    j.send();
    
}
function checkinvite()
{
    if(!invite_got)
    {
        var invited;
        var j = new XMLHttpRequest(); 
        j.onreadystatechange = function () {
        if (j.readyState == 4 && j.status == 200) {
            invited = JSON.parse(j.responseText);
            if(invited==0)
            {
                setTimeout(checkinvite,1000);
            }
            else
            {
                checkifpower();
                startmstimer();
                getenemyname();
                starttimer();
                invite_got = true;
                removereadybutton();
                hidefinddiv();
                hidestart();
                
                updateyourboard();
                enemy_coords = invited;
                constantcheckforgamedone();
                printenemyboard();

                checkturn();

                document.getElementById("yourshipcountdiv").style.display = "block";
                document.getElementById("yourshipcount").innerHTML = totalyourship;
                document.getElementById("enemyshipcountdiv").style.display = "block";
                document.getElementById("enemyshipcount").innerHTML = totalship;
            }
        }
    };
        j.open('POST','../php_pages/checkinvite.php', true); 
        j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        j.send();
    }
}
function printenemyboard()
{
    for(var i = 0;i<10;i++){
        for(var j = 0;j<10;j++){
            var print = enemy_coords[i][j];
            var row = String(i);
            var col = String(j);
            document.getElementById("o" + row + col).innerHTML = print;
        }
        
    }
}

