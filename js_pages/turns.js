var invite_got = false;
window.onload = resetall();
var seconds = "00";
var minutes = 0;
var enemy_coords;
var invitename;
var x = 0;
var enemyname;
var gameisdone = false;
var time_elapsed = 0;
var time_ms_start = 0;
var superenabled = false;
var totalship = 7;
var totalyourship = 7;
var used = false;
var numofshipplaced = 0;
//removes ready button once in game
function removereadybutton(){
    var readyButtn = document.getElementById("readybutton");
    readyButtn.style.display = "none";
    var findP = document.getElementById("findplayerdiv");
    findP.style.display="block";
    var showPower = document.getElementById("superpowercheck");
    showPower.style.display = "inline";
    var showBox = document.getElementById("powerlabel");
    showBox.style.display = "inline";
}
//removes findplayer boxes once in game
function hidefinddiv(){
    var hideFind = document.getElementById("findplayerdiv");
    hideFind.style.display = "none";
    var showStart = document.getElementById("startButton");
    showStart.style.display = "block";
    
}
//hides start button once game has started
function hidestart(){
    var hideStart = document.getElementById("startdiv");
    hideStart.style.display = "none";
}
//shows fire button when your turn
function allowfire(){
    var fireButtn = document.getElementById("firebutton");
    if(!gameisdone){
        
        fireButtn.style.display = "block";
    }
    else{
        fireButtn.innerHTML = "GG!"
    }
    

}
//hides fire when not your turn
function hidefire(){
    var fireButtn = document.getElementById("firebutton");
    fireButtn.style.display = "none";

}


//initialized turn, with the person inviting going first always
function initialturn(){
    superenabled = document.querySelector('.supercheck').checked;
    console.log(superenabled);
    checkifpower();
    var j = new XMLHttpRequest(); 
    j.onreadystatechange = function () {
        if (j.readyState == 4 && j.status == 200) {
            console.log(j.responseText);
        }
    };
    j.open('POST','../php_pages/initialturn.php', true); 
    j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    j.send("power=" + superenabled);

}
//checks if all ships gone and then ends game
function checkifgamedone(){
    //console.log(totalyourship);
    
    if(totalship==0)
    {
        endthegame();
    }
}
//function to update database to indicate game has ended
function endthegame(){
    var j = new XMLHttpRequest(); 
    j.onreadystatechange = function () {
        if (j.readyState == 4 && j.status == 200) {
            //console.log(j.responseText);
            
        }
    };
    j.open('GET','../php_pages/gameover.php', true); 
    j.send();   
}
//gets name of opponent
function getenemyname(){
    var j = new XMLHttpRequest(); 
    j.onreadystatechange = function () {
        if (j.readyState == 4 && j.status == 200) {
            document.getElementById("enemycaption").innerHTML = j.responseText + "'s Board";
        }
    };
    j.open('GET','../php_pages/getname.php', true); 
    j.send();
}
//check if its your turn
function checkturn(){
    if(!gameisdone){
        var j = new XMLHttpRequest(); 
        j.onreadystatechange = function () {
            if (j.readyState == 4 && j.status == 200) {
                //console.log(j.responseText);
                // console.log(j.responseText);
                if(j.responseText==1){
                    checkifgamedone();
                    displayOverlapAlert("YOUR TURN", "#13284c");
                    setTimeout(hideOverlapAlert, 3000);
                    constantcheckforgamedone();
                    allowfire();
                    if(totalyourship==2 && !used && superenabled){
                        showsuperpowers();
                        used = true;
                    }
                }
                else if(j.responseText==0){
                    displayOverlapAlert("ENEMY TURN", "purple");
                    //setTimeout(hideOverlapAlert, 1000);
                    document.getElementById("enemyshipcount").innerHTML = totalship;
                    checkifgamedone();
                    hidefire();
                    hidesuper();
                    setTimeout(checkturn, 1000);
                }
            }
        };
        j.open('POST','../php_pages/checkturns.php', true); 
        j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        j.send();
    }
}
//starts timer that gets added to data base at game end
function startmstimer()
{
    console.log("ms timer started")
    time_ms_start = Date.now();

}
//adds time elapsed to database
function addtime()
{
    time_elapsed = Date.now() - time_ms_start;

    var j = new XMLHttpRequest(); 
    j.onreadystatechange = function () {
        if (j.readyState == 4 && j.status == 200) {
            console.log(j.responseText);
        }
    };
    j.open('POST','../php_pages/addtime.php', true); 
    j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    j.send("mstime=" + time_elapsed);

}
//function that polls for game done condition
function constantcheckforgamedone()
{
    if(!gameisdone)
    {
        var j = new XMLHttpRequest(); 
    j.onreadystatechange = function () {
        if (j.readyState == 4 && j.status == 200) {
            //console.log(j.responseText);
            if(j.responseText==1)
            {
                gameisdone = true;
                hidefire();
                //do someting else
                displayOverlapAlert("YOU WON!", "green");
                setTimeout(hideOverlapAlert, 15000);
                addgameswon();
                addtime();
                

            }
            else if(j.responseText==2)
            {
                gameisdone = true;
                hidefire();
                displayOverlapAlert("YOU LOST!", "red");
                setTimeout(hideOverlapAlert, 15000);
                addgamesplayed();
                addtime();
            }
            else if(j.responseText==0)
            {
                
                setTimeout(constantcheckforgamedone, 1000);
            }
        }
    };
    j.open('POST','../php_pages/checkifgamedone.php', true); 
    j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    j.send();
    }
}
//adds number of games won for both players
function addgameswon()
{
    var j = new XMLHttpRequest(); 
    j.onreadystatechange = function () {
        if (j.readyState == 4 && j.status == 200) {
            //console.log(j.responseText);
        }
    };
    j.open('POST','../php_pages/addgamewon.php', true); 
    j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    j.send();
}
//adds games played for both players
function addgamesplayed()
{
    var j = new XMLHttpRequest(); 
    j.onreadystatechange = function () {
        if (j.readyState == 4 && j.status == 200) {
            //console.log(j.responseText);
        }
    };
    j.open('POST','../php_pages/addgamesplayed.php', true); 
    j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    j.send();
}
//shows super power buttons
function showsuperpowers() {
    //console.log("can now see super powers");
    var triple = document.getElementById("triple");
    triple.style.display = "block";
    var big = document.getElementById("big");
    big.style.display = "block";

}
//hides superpower button
function hidesuper() {
    //console.log("powers hidden");
    var triple = document.getElementById("triple");
    triple.style.display = "none";
    var big = document.getElementById("big");
    big.style.display = "none";

}
//sets turn once youve fired
function setturn() {
    var j = new XMLHttpRequest();
    j.onreadystatechange = function () {
        if (j.readyState == 4 && j.status == 200) {
            //console.log(j.responseText);
            checkturn();
        }
    };
    j.open('POST', '../php_pages/turns.php', true);
    j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    j.send();
}