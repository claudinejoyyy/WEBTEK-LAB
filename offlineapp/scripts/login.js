function validate()
  {
      if(   document.getElementById("text1").value == "josh"
         && document.getElementById("text2").value == "jen" )
      {
          location.href="../index.html";
      }
      else
      {
          alert( "validation failed" );
      }
  }
