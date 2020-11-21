function signup(){
    var good;
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
  
    if(user != "" && pass != "")
    {
    var j = new XMLHttpRequest(); 
    j.onreadystatechange = function () {
          if (j.readyState == 4 && j.status == 200) {
            good = j.responseText;
            document.getElementById("test").innerHTML =  j.responseText;
            if(good=="1")
            {
              location.replace("../html_pages/game.html");
            }
          }
    };
      j.open('POST','../php_pages/signup.php'); 
      j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      j.send("u=" + user + "&" + "p=" + pass);
    }
    else
    {
      document.getElementById("test").innerHTML = "Empty fields";
    }
  }
  function login(){
    var good;
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
  
    if(user != "" && pass != "")
    {
      var j = new XMLHttpRequest(); 
    j.onreadystatechange = function () {
          if (j.readyState == 4 && j.status == 200) {
            good = j.responseText;
            document.getElementById("test").innerHTML =  j.responseText;
            if(good=="1")
            {
              location.replace("../html_pages/game.html");
            }
          }
    };
      j.open('POST','../php_pages/login.php'); 
      j.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      j.send("u=" + user + "&" + "p=" + pass);
    }
    else
    {
      document.getElementById("test").innerHTML = "Empty fields";
    }
  }
  
  function logout()
  {
    var j = new XMLHttpRequest(); 
    j.onreadystatechange = function () {
          if (j.readyState == 4 && j.status == 200) {
            location.replace("../html_pages/index.html");
          }
    };
      j.open('GET','../php_pages/logout.php'); 
      j.send();
  }