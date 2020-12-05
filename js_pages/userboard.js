    var rows = 10;
    var cols = 10;
    var ship_coords = new Array(10);
    var horizontal = true; //true = horizontal, false = vertical
    var placed = true;
    var global_shiplength = 0;
    var c_count = 1;
    var b_count = 2;
    var d_count = 2;
    var s_count = 1;
    var p_count = 1;
    var shipType = "";
    var shipValue = 1;
    function set_boardvalues()//creates empty 2d array
    {
        for(var i = 0;i<10;i++){
            ship_coords[i] = new Array(10); //size for both was previously 9 
        }
        for(var i = 0;i<10;i++){
            for(var j = 0;j<10;j++){
                ship_coords[i][j] = 0; 
            }
        }
        //printboard();
    }
    function printboard()
    {
        for(var i = 0;i<10;i++){
            for(var j = 0;j<10;j++){
                var print = ship_coords[i][j];
                var row = String(i);
                var col = String(j);
                document.getElementById(row + col).innerHTML = print;
            }
            
        }
        
    }
    function place(){placed = !placed;}
    function flip(){horizontal = !horizontal;}
    function set_length(len){global_shiplength=len}
    function returnval(id) {
        place_ship(id);
        remove_clickable();
        placed = true;
    }
    function place_ship(coords)
    {
        if (!amountIsZero()){
            if(!placed){
                var shiplength = global_shiplength;
                var row = parseInt(coords.charAt(0));
                var col = parseInt(coords.charAt(1));

                var rowid = coords.charAt(0);
                var colid = coords.charAt(1);

                //var color;
                var value;
                var flipped = false;
                 //GETS VALUE FROM 1-7 for each ship so each ship has a unique id, when determing if it has been destroyed
                if((col+shiplength)>10 && horizontal)
                    {
                        col = cols - shiplength;
                        colid = col; //appends int to string
                        flipped = true;
                    }
                if((row+shiplength)>10 && !horizontal)
                {
                    row = rows - shiplength;
                    rowid = row;  //appends int to string
                    flipped = true;
                }
                var isoverlap = check_overlap(shiplength, flipped, row, col);
                if(!isoverlap){
                    value = get_shipvalue();
                    for(var i = 0;i<shiplength;i++){
                    var box = document.getElementById(rowid + colid); 
                   // color = getColor();
                    ship_coords[rowid][colid] = value;
                   // box.style.backgroundColor = color;
                    //box.style.borderStyle = "none";
                    //box.innerHTML = value;
                    if(horizontal){
                            box.style.backgroundImage = "url('../shipimages/horizontal/" + shiplength +"/"+ shiplength + i + ".gif')";
                            colid++;
                        }
                    else {
                        box.style.backgroundImage = "url('../shipimages/"+ shiplength +"/"+ shiplength + i + ".gif')";
                        rowid++;
    
                            
                        }
                    }
                    // if(rowid==10)
                    // {
                    //     box.style.borderBottom = "1px solid black";
                    // }
                    // if(colid==10)
                    // {
                    //     box.style.borderRight = "1px solid black";
                    // }
                    horizontal = true;
                    reduceAmount();
                    numofshipplaced++;
                    
                }
                else {
                    displayOverlapAlert("SHIPS OVERLAPPING!", "#c41230");
                    setTimeout(hideOverlapAlert, 2000);
                    
                }
                
            }   
        }
    }

    function getColor()
    {
        var ship_id = shipType.slice(-1);

        if(ship_id == 'c')
        {
            return "red";
        }
        if(ship_id == 'b')
        {
            return "lightblue";
        }
        if(ship_id == 'd')
        {
            return "lightgreen";
        }
        if(ship_id == 's')
        {
            return "purple";
        }
        if(ship_id == 'p')
        {
            return "orange";
        }
        
    }
    function get_shipvalue()
    {
        return shipValue++;

        /*
        var ship_id = shipType.slice(-1);
        if(ship_id == 'c')
        {
            return 1;
        }
        if(ship_id == 'b')
        {
            return 2;
        }
        if(ship_id == 'd')
        {
            return 3;
        }
        if(ship_id == 's')
        {
            return 4;
        }
        if(ship_id == 'p')
        {
            return 5;
        }
        */

    }
    
    function check_overlap(len, flipped, row, col)
    {
        var overlap = false;
        var flippedcol = col;
        var normalcol = col;
        var flippedrow = row;
        var normalrow = row;
        if(horizontal)
        {
            for(var i = 0;i<len;i++)
            {
                if(flipped) 
                {
                    if(ship_coords[row][flippedcol] > 0) 
                        {
                        return true;
                        }
                    else
                    {
                        flippedcol++;
                    }
                }
                else
                    {
                        if(ship_coords[row][normalcol] > 0) 
                        {
                            return true;
                        }
                        else
                        {
                            normalcol++;
                        }
                    }
            }
        }
        else { 
            for(var i = 0;i<len;i++){
                if(flipped){
                    if(ship_coords[flippedrow][col] > 0){ return true;}
                    else{flippedrow++;}
                }
                else {
                        if(ship_coords[normalrow][col] > 0){return true;}
                        else{ normalrow++;}
                    }
            }
        }

        return overlap;
    }
    function make_clickable()
    {
        var boxes = document.getElementsByClassName("box");
        for(var i = 0 ; i<boxes.length ;i++)
        {
            boxes[i].setAttribute("onclick","returnval(this.id)");
            boxes[i].setAttribute("onmouseover","show_outline(this.id)");
            boxes[i].setAttribute("onmouseleave","remove_outline(this.id)");
        }
    }
    function remove_clickable()
    {
        var boxes = document.getElementsByClassName("box");
        for(var i = 0 ; i<boxes.length ;i++)
        {
            boxes[i].removeAttribute("onclick");
        }
    }
    function show_outline(id)
    {
        if (!amountIsZero()){
            
            if(!placed){
            var shiplength = global_shiplength;
            var row = parseInt(id.charAt(0));
            var col = parseInt(id.charAt(1));

            var rowid = id.charAt(0);
            var colid = id.charAt(1);
            var flipped = false;
            $(document).ready(function(){
                for(var i = 0;i<shiplength;i++){
                    if(horizontal){
                        if((col+shiplength)>10){
                            col = cols - shiplength;
                            colid = col;
                            flipped = true;
                            var isoverlap = check_overlap(shiplength, flipped, row, col);
                            if(!isoverlap)
                            {
                                $("#" + rowid + colid).each(function()
                                { 
                                    $("#" + rowid + colid).css("background-color", "lightgray");
                                });
                                colid++;
                            }
                                
                        }
                        else{
                            flipped = false;
                            var isoverlap = check_overlap(shiplength, flipped, row, col);
                            if(!isoverlap)
                            {
                                $("#" + rowid + colid).each(function()
                                    { 
                                        $("#" + rowid + colid).css("background-color", "lightgray");
                                    });
                                colid++;
                            }  
                        }  
                    }
                    else{
                        if((row+shiplength)>10){
                            row = rows - shiplength;
                            rowid = row;
                            flipped = true;
                            var isoverlap = check_overlap(shiplength,flipped,row,col);
                            if(!isoverlap)
                            {
                                $("#" + rowid + colid).each(function()
                                { 
                                    $("#" + rowid + colid).css("background-color", "lightgray");
                                });
                                rowid++;
                            }
                                
                        }
                        else{
                            flipped = false;
                            var isoverlap = check_overlap(shiplength, flipped, row, col);
                            if(!isoverlap)
                            {
                                $("#" + rowid + colid).each(function()
                                { 
                                    $("#" + rowid + colid).css("background-color", "lightgray");
                                    });
                                rowid++;
                            }
                        } 
                    }
                }  
            });
            }
        }
    }
    function remove_outline(id){
        if (!amountIsZero()){
            if(!placed){
            var shiplength = global_shiplength;
            var row = parseInt(id.charAt(0));
            var col = parseInt(id.charAt(1));

            var rowid = id.charAt(0);
            var colid = id.charAt(1);

            $(document).ready(function(){
                for(var i = 0;i<shiplength;i++){
                    if(horizontal){
                        if((col+shiplength)>10){
                            col = cols - shiplength;
                            colid = col;
                            flipped = true;
                            var isoverlap = check_overlap(shiplength,flipped,row,col);
                            if(!isoverlap)
                            {
                                $("#" + rowid + colid).each(function()
                                { 
                                    $("#" + rowid + colid).css("background-color", "transparent");
                                }); 
                                colid++;
                            }         
                        }
                        else{
                            flipped = false;
                            var isoverlap = check_overlap(shiplength, flipped, row,col);

                            if(!isoverlap)
                            {
                                $("#" + rowid + colid).each(function()
                                { 
                                    $("#" + rowid + colid).css("background-color", "transparent");
                                });
                                colid++;
                            }       
                        }  
                    }
                    else{
                        if((row+shiplength)>10){
                            row = rows - shiplength;
                            rowid = row;
                            flipped = true;
                            var isoverlap = check_overlap(shiplength,flipped,row,col);
                            if(!isoverlap)
                            {
                                $("#" + rowid + colid).each(function()
                                { 
                                    $("#" + rowid + colid).css("background-color", "transparent");
                                });
                                rowid++;
                            }
                                
                        }
                        else{
                            flipped = false;
                            var isoverlap = check_overlap(shiplength, flipped, row, col);
                            if(!isoverlap)
                            {
                                $("#" + rowid + colid).each(function()
                                { 
                                    $("#" + rowid + colid).css("background-color", "transparent");
                                    });
                                rowid++;
                            }
                        } 
                    }  
                }  
            });
            }
        }
    }
    function openMenu() {
      document.getElementById("myshipSelectMenu").style.width = "250px";
      document.getElementById("myshipSelectMenu").style.borderRight = "5px solid red";
	}
	function closeMenu() {
       
	  document.getElementById("myshipSelectMenu").style.width = "0";
      return false;
    }
   
    function amountIsZero(){
        if (document.getElementById(shipType+'_Num').innerHTML > 0){
            return false;
        }
        else{
            return true;
        }
    }
    function reduceAmount(){
        var amount = parseInt(document.getElementById(shipType+'_Num').innerHTML);
        amount--;
        document.getElementById(shipType+'_Num').innerHTML = amount;
        if (amount == 0){
            document.getElementById(shipType).removeAttribute("onClick");
            document.getElementById(shipType).innerHTML="";
            document.getElementById(shipType).disabled=true;
            document.getElementById(shipType).style.backgroundColor= "transparent";
            document.getElementById(shipType).style.cursor= "default";
        }
    }
    function getShipType(id){
        shipType = id;
    }
    function displayOverlapAlert(text, color){
        document.getElementById("overlap_text").innerHTML = text;
        document.getElementById("myoverlap_warning").style.backgroundColor = color;
        document.getElementById("myoverlap_warning").style.width = "400px";
    }
    function hideOverlapAlert(){
        document.getElementById("myoverlap_warning").style.width = "0px";
    }
