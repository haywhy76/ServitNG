// Material Select Initialization
// Material Select Initialization
$(document).ready(function() {
    $('.mdb-select').materialSelect();
    });


// Homepage Typewriter
var aText = new Array(
    "",
    "",
    "We Connect", 
    "",
    "",
    "",
    "Institutions With",
    "",
    "",
    "",
    "IT Students &",
    "",
    "",
    "",
    "Corp Members."
    );
    var iSpeed = 10; // time delay of print out
    var iIndex = 0; // start printing array at this posision
    var iArrLength = aText[0].length; // the length of the text array
    var iScrollAt = 20; // start scrolling up at this many lines
     
    var iTextPos = 0; // initialise text position
    var sContents = ''; // initialise contents variable
    var iRow; // initialise current row
     
    function typewriter()
    {
     sContents =  ' ';
     iRow = Math.max(0, iIndex-iScrollAt);
     var destination = document.getElementById("typedtext");
     
     while ( iRow < iIndex ) {
      sContents += aText[iRow++] + '<br />';
     }
     destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
     if ( iTextPos++ == iArrLength ) {
      iTextPos = 0;
      iIndex++;
      if ( iIndex != aText.length ) {
       iArrLength = aText[iIndex].length;
       setTimeout("typewriter()", 500);
      }
     } else {
      setTimeout("typewriter()", iSpeed);
     }
    }
    
    
    typewriter();

// End of Homepage Typewriter

//Fadein Homepage Buttons

$(document).ready(function(){

    /*! Fades in page on load */
    $('.homepagebuttons').css('display', 'none');
    $('.homepagebuttons').fadeIn(10000);
    
    

    });

//Fadein Homepage Image

$(document).ready(function(){

    /*! Fades in page on load */
    $('.homepageimage').css('display', 'none');
    $('.homepageimage').fadeIn(10000);
    
    });



//Fadein Aboutus section
    $(document).ready(function(){

        /*! Fades in page on load */
        $('.aboutus').css('display', 'none');
        $('.aboutus').fadeIn(10000);
        
        });

//Fadein FAQ section
$(document).ready(function(){

    /*! Fades in page on load */
    $('.faq').css('display', 'none');
    $('.faq').fadeIn(13000);
    
    });


//Fadein Contact section
$(document).ready(function(){

    /*! Fades in page on load */
    $('.contactus').css('display', 'none');
    $('.contactus').fadeIn(13000);
    
    });
