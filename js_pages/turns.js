var invite_got = false;
    window.onload = resetall();
    // window.addEventListener('beforeunload',(event) =>{
    //     resetall();
    // });
    var seconds = "00";
    var minutes = 0;
    var enemy_coords;
    //var enemy_coords = ship_coords; //for debugging
    var invitename;
    var x = 0;
    var enemyname;
    
    var gameisdone = false;
    
    var time_elapsed = 0;
    var time_ms_start = 0;
    var superenabled = false;
    function removereadybutton()
    {
        var readyButtn = document.getElementById("readybutton");
        readyButtn.style.display = "none";
        var findP = document.getElementById("findplayerdiv");
        findP.style.display="block";
        var showPower = document.getElementById("superpowercheck");
        showPower.style.display = "inline";
        var showBox = document.getElementById("powerlabel");
        showBox.style.display = "inline";
    }
    function hidefinddiv()
    {
        var hideFind = document.getElementById("findplayerdiv");
        hideFind.style.display = "none";
        var showStart = document.getElementById("startButton");
        showStart.style.display = "block";
        
    }
    function hidestart()
    {
        var hideStart = document.getElementById("startdiv");
        hideStart.style.display = "none";
    }
    function allowfire()
    {
        var fireButtn = document.getElementById("firebutton");
        if(!gameisdone)
        {
            
            fireButtn.style.display = "block";
        }
        else
        {
            fireButtn.innerHTML = "GG!"
        }
        

    }
    function hidefire()
    {
        var fireButtn = document.getElementById("firebutton");
        fireButtn.style.display = "none";

    }

   

    function initialturn()
    {
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
    function checkifgamedone()
    {
        //console.log(totalyourship);
        
        if(totalship==0)
        {
            endthegame();
        }
    }
    function endthegame()
    {
        var j = new XMLHttpRequest(); 
        j.onreadystatechange = function () {
            if (j.readyState == 4 && j.status == 200) {
                //console.log(j.responseText);
                
            }
        };
        j.open('GET','../php_pages/gameover.php', true); 
        j.send();   
    }
    function getenemyname()
    {
        var j = new XMLHttpRequest(); 
        j.onreadystatechange = function () {
            if (j.readyState == 4 && j.status == 200) {
                document.getElementById("enemycaption").innerHTML = j.responseText + "'s Board";
            }
        };
        j.open('GET','../php_pages/getname.php', true); 
        j.send();
    }

    function checkturn()
    {
        var j = new XMLHttpRequest(); 
        j.onreadystatechange = function () {
            if (j.readyState == 4 && j.status == 200) {
                //console.log(j.responseText);
               // console.log(j.responseText);
                if(j.responseText==1)
                {
                    checkifgamedone();
                    displayOverlapAlert("YOUR TURN", "#13284c");
                    setTimeout(hideOverlapAlert, 3000);
                    constantcheckforgamedone();
                    allowfire();
                    if(totalyourship==2 && !used && superenabled)
                    {
                        showsuperpowers();
                        used = true;
                    }
                }
                else if(j.responseText==0)
                {
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
    function startmstimer()
    {
        console.log("ms timer started")
        time_ms_start = Date.now();

    }
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
                    setTimeout(hideOverlapAlert, 5000);
                    addgameswon();
                    addtime();
                    

                }
                else if(j.responseText==2)
                {
                    gameisdone = true;
                    hidefire();
                    displayOverlapAlert("YOU LOST!", "red");
                    setTimeout(hideOverlapAlert, 5000);
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