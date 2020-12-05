var ship1= false;
var ship2= false;
var ship3= false;
var ship4= false;
var ship5= false;
var ship6= false;
var ship7= false;
var usership1= false;
var usership2= false;
var usership3= false;
var usership4= false;
var usership5= false;
var usership6= false;
var usership7= false;
var triplesent = 0;
//starts local visual timer
function starttimer(){
    document.getElementById("timer").innerHTML = minutes + ":" + seconds;
    seconds++;
    if(seconds < 10)
    {
        seconds = "0" + seconds;
    }
    if(seconds==60)
    {
        seconds = "00";
        minutes++;
    }
    setTimeout(starttimer,1000);
}
//adds functoinality to enemy board based on the type of fire button pressed
function make_op_board_clickable(firetype){
    document.getElementById("opp").style.cursor = "url(../images/crosshair.png) 10 10, auto";
    console.log(firetype);
    if(firetype == "normal")
    {
        var boxes = document.getElementsByClassName("boxo");
        for(var i = 0 ; i<boxes.length ;i++)
        {
            boxes[i].setAttribute("onclick","return_oppval(this.id);setturn();");
        }
    }
    else if(firetype == "triple")
    {
        var boxes = document.getElementsByClassName("boxo");
        for(var i = 0 ; i<boxes.length ;i++)
        {
            boxes[i].setAttribute("onclick","return_oppvaltriple(this.id);");
        }
        
    }
    else if(firetype == "big")
    {
        var boxes = document.getElementsByClassName("boxo");
        for(var i = 0 ; i<boxes.length ;i++)
        {
            boxes[i].setAttribute("onclick","return_oppvalbig(this.id);setturn();");
        }
    }
}
//removes functionality from enemyboard
function remove_op_clickable()
{
    var boxes = document.getElementsByClassName("boxo");
    for(var i = 0 ; i<boxes.length ;i++)
    {
        boxes[i].removeAttribute("onclick");
    }
}
//normal fire fuction
function return_oppval(id) {
    place_fire(id);
    remove_op_clickable();
}
//big torpedo fire function
function return_oppvalbig(id) {
    place_firebig(id);
    remove_op_clickable();
}
//determines where the big torpedo can fire
function place_firebig(id)
{
    var top = true;
    var left = true;
    var right = true;
    var bottom = true;
    console.log(id);
    var row = parseInt(id.charAt(1));
    var col = parseInt(id.charAt(2));
    var rowid = id.charAt(1);
    var colid = id.charAt(2);
    if(row==0)
    {
        top = false;
    }
    if(row==9)
    {
        bottom = false;
    }
    if(col==0)
    {
        left = false;
    }
    if(col==9)
    {
        right = false;
    }
    if(enemy_coords[row][col] > 0){
        
        document.getElementById(id).innerHTML = '&#128163;'; //X
        ishit(id);
    }
    else{
        document.getElementById(id).innerHTML = '&#9711;'; //O
        ismiss(id);
    }
    if(top)
    {
        var topid = 'o' + (row-1) + col;

        if(enemy_coords[row-1][col] > 0){
            document.getElementById(topid).innerHTML = '&#128163;'; //X
            ishit(topid);
        }
        else{
            document.getElementById(topid).innerHTML = '&#9711;'; //O
            ismiss(topid);
        }
    }
    if(bottom)
    {
        var bottomid = 'o' + (row+1) + col;

        if(enemy_coords[row+1][col] > 0){
            document.getElementById(bottomid).innerHTML = '&#128163;'; //X
            ishit(bottomid);
        }
        else{
            document.getElementById(bottomid).innerHTML = '&#9711;'; //O
            ismiss(bottomid);
        }       
    }
    if(left)
    {
        var leftid = 'o' + row + (col-1);

        if(enemy_coords[row][col-1] > 0){
            document.getElementById(leftid).innerHTML = '&#128163;'; //X
            ishit(leftid);
        }
        else{
            document.getElementById(leftid).innerHTML = '&#9711;'; //O
            ismiss(leftid);
        }
    }
    if(right)
    {
        var rightid = 'o' + row + (col+1);

        if(enemy_coords[row][col+1] > 0){
            document.getElementById(rightid).innerHTML = '&#128163;'; //X
            ishit(rightid);
        }
        else{
            document.getElementById(rightid).innerHTML = '&#9711;'; //O
            ismiss(rightid);
        }       
    }
    
}
//function for triple torpedo
function return_oppvaltriple(id) {
    place_fire(id);
    triplesent++;
    if(triplesent==3)
    {
        hidesuper(); 
        remove_op_clickable();
        setturn();
    }
    
}
//updates values on enemyboard if torpedo hit or miss
function place_fire(id)
{
    var row = parseInt(id.charAt(1));
    var col = parseInt(id.charAt(2));
    var rowid = id.charAt(1);
    var colid = id.charAt(2);

    if(enemy_coords[row][col] > 0){
        document.getElementById(id).innerHTML = '&#128163;'; //X
        ishit(id);
    }else
    {
        document.getElementById(id).innerHTML = '&#9711;'; //O
        ismiss(id);
    }
}

//updates values in the database when it is a hit
function ishit(id)
{
    var j = new XMLHttpRequest(); 
    j.onreadystatechange = function () {
        if (j.readyState == 4 && j.status == 200) {
            enemy_coords = JSON.parse(j.responseText);
            var hitormiss = check_destroy();
            console.log(enemy_coords);
            if(hitormiss==1)
            {
                console.log("ship destroyed");
                totalship--;
                if(totalship==0)
                {
                    endthegame();
                }
            } 
        }

    };
    j.open('POST','../php_pages/fire.php', true); 
    j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    j.send("torpedo=" + id);
}
//check if a ship has been destroyed and updates counters
function check_destroy()
{
    var num_destroyed = 0;
    if(!ship1)
    {
        if(!enemy_coords.some(row => row.includes(1)))
        {
            ship1 = true;
            num_destroyed++;
            console.log(num_destroyed);
            return 1;
            
        }
    }
    if(!ship2)
    {
        if(!enemy_coords.some(row => row.includes(2)))
        {
            ship2 = true;
            num_destroyed++;
            console.log(num_destroyed);
            return 1;
        }
    }
    if(!ship3)
    {
        if(!enemy_coords.some(row => row.includes(3)))
        {
            ship3 = true;
            num_destroyed++;
            console.log(num_destroyed);
            return 1;
        }
    }
    if(!ship4)
    {
        if(!enemy_coords.some(row => row.includes(4)))
        {
            ship4 = true;
            num_destroyed++;
            console.log(num_destroyed);
            return 1;
        }
    }
    if(!ship5)
    {
        if(!enemy_coords.some(row => row.includes(5)))
        {
            ship5= true;
            num_destroyed++;
            console.log(num_destroyed);
            return 1;
        }
    }
    if(!ship6)
    {
        if(!enemy_coords.some(row => row.includes(6)))
        {
            ship6 = true;
            num_destroyed++;
            console.log(num_destroyed);
            return 1;
        }
    }
    if(!ship7)
    {
        if(!enemy_coords.some(row => row.includes(7)))
        {
            ship7 = true;
            num_destroyed++;
            console.log(num_destroyed);
            return 1;
        }
    }
    console.log(num_destroyed);
    return 0;
    
}
//check if your ships have been destroyed updates counters
function checkyour_destroy()
{
    if(!usership1)
    {
        if(!ship_coords.some(row => row.includes(1)))
        {
            usership1 = true;

            return 1;
        }
    }
    if(!usership2)
    {
        if(!ship_coords.some(row => row.includes(2)))
        {
            usership2 = true;
            return 1;
        }
    }
    if(!usership3)
    {
        if(!ship_coords.some(row => row.includes(3)))
        {
            usership3 = true;
            return 1;
        }
    }
    if(!usership4)
    {
        if(!ship_coords.some(row => row.includes(4)))
        {
            usership4 = true;
            return 1;
        }
    }
    if(!usership5)
    {
        if(!ship_coords.some(row => row.includes(5)))
        {
            usership5= true;
            return 1;
        }
    }
    if(!usership6)
    {
        if(!ship_coords.some(row => row.includes(6)))
        {
            usership6 = true;
            return 1;
        }
    }
    if(!usership7)
    {
        if(!ship_coords.some(row => row.includes(7)))
        {
            usership7 = true;
            return 1;
        }
    }

    return 0;
}
//updates your coords depending on hits and misses
function updateyourboard()//right now its called on startgame button, but should be called when it becomes your turn again
{
    var j = new XMLHttpRequest(); 
    j.onreadystatechange = function () {
    if (j.readyState == 4 && j.status == 200) {
        ship_coords = JSON.parse(j.responseText);
        //console.log(ship_coords);
        printupdatedboard();
        setTimeout(updateyourboard,1000);
        var hitormiss = checkyour_destroy();
        if(hitormiss==1)
        {
            totalyourship--;
            console.log("your ship destroyed");
            document.getElementById("yourshipcount").innerHTML = totalyourship;
        
        }
    }
    
};
    j.open('GET','../php_pages/updateyourboard.php', true); 
    j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    j.send();
}
//prints updatedboard with hits and misses visible on your board
function printupdatedboard()
{
    for(var i = 0;i<10;i++){
        for(var j = 0;j<10;j++){
            if(ship_coords[i][j] == null || ship_coords == null)
            {
                displayOverlapAlert("ENEMY HAS LEFT", "#c41230");
            }
            else{
                if(ship_coords[i][j] == -1)
                {
                    var row = String(i);
                    var col = String(j);
                    var box = document.getElementById(row+col);
                    //box.style.backgroundColor = "black";
                    //box.style.transform = "rotate(90deg)"
                    var img = document.getElementById(row+col),

                    source = img.currentStyle || window.getComputedStyle(img, false),

                    bi = source.backgroundImage;

                    var ogship = bi.replace("http://73.235.199.12/mysite/project/GitHub/BattleShip","..")
                    


                    box.style.background =   "url('../images/fire.gif') no-repeat center, url('../images/wreck.png')";
                    box.innerHTML = "";
                }

                else if(ship_coords[i][j] == -2)
                {
                    var row = String(i);
                    var col = String(j);
                    var box = document.getElementById(row+col);
                    //box.style.backgroundColor = "black";
                    box.style.background = "url('../images/miss.gif')";
                    box.innerHTML = "";
                }
            }
            
            
        }
    }

}
//updates coords if it is a miss
function ismiss(id)
{
    var j = new XMLHttpRequest(); 
    j.onreadystatechange = function () {
        if (j.readyState == 4 && j.status == 200) {
            enemy_coords = JSON.parse(j.responseText);
            console.log(enemy_coords);
        }
    };
    j.open('POST','../php_pages/missfire.php', true); 
    j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    j.send("torpedo=" + id);
}
//onload login alert thing
function myFunction()
{
    return "";
}
//deletes all game state data from player on reload
function resetall()
{
    var j = new XMLHttpRequest(); 
    j.onreadystatechange = function () {
        if (j.readyState == 4 && j.status == 200) {
        }
    };
    j.open('POST','../php_pages/deleteall.php', true); 
    j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    j.send();
}
