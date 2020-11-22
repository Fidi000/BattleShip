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
function getenemyboard()
{
    invitename = document.getElementById("enemyname").value;
    var j = new XMLHttpRequest(); 
    j.onreadystatechange = function () {
    if (j.readyState == 4 && j.status == 200) {
        var returnedarray = JSON.parse(j.responseText);
        if(returnedarray==0)
        {
            document.getElementById("enemycaption").innerHTML = "User does not exist or is not ready";
        }
        else
        {
            hidefinddiv();
   
            invite_got=true;
            enemy_coords = returnedarray;
            printenemyboard();
        }

    }
};
    j.open('POST','../php_pages/game.php', true); 
    j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    j.send("enemyname=" + invitename);
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
                invite_got = true;
                removereadybutton();
                hidefinddiv();
                hidestart();
                checkturn();
                updateyourboard();
                enemy_coords = invited;
                // printenemyboard();
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

