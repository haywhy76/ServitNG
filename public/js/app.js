

// Material Select Initialization
// Material Select Initialization
$(document).ready(function() {
    $('.mdb-select').materialSelect();
    });

    $(function() {
      $('#WAButton').floatingWhatsApp({
        phone: '1231231231', //WhatsApp Business phone number International format-
        //Get it with Toky at https://toky.co/en/features/whatsapp.
        headerTitle: 'Chat with us on WhatsApp!', //Popup Title
        popupMessage: 'Hello, how can we help you?', //Popup Message
        showPopup: true, //Enables popup display
        buttonImage: '<img src="https://rawcdn.githack.com/rafaelbotazini/floating-whatsapp/3d18b26d5c7d430a1ab0b664f8ca6b69014aed68/whatsapp.svg" />', //Button Image
        //headerColor: 'crimson', //Custom header color
        //backgroundColor: 'crimson', //Custom background button color
        position: "right"    
      });
    });
// Homepage Typewriter
// var aText = new Array(
//     "",
//     "",
//     "We Connect", 
//     "",
//     "",
//     "",
//     "Institutions With",
//     "",
//     "",
//     "",
//     "IT Students &",
//     "",
//     "",
//     "",
//     "Corp Members."
//     );
//     var iSpeed = 100; // time delay of print out
//     var iIndex = 0; // start printing array at this posision
//     var iArrLength = aText[0].length; // the length of the text array
//     var iScrollAt = 20; // start scrolling up at this many lines
     
//     var iTextPos = 0; // initialise text position
//     var sContents = ''; // initialise contents variable
//     var iRow; // initialise current row
     
//     function typewriter()
//     {
//      sContents =  ' ';
//      iRow = Math.max(0, iIndex-iScrollAt);
//      var destination = document.getElementById("typedtext");
     
//      while ( iRow < iIndex ) {
//       sContents += aText[iRow++] + '<br />';
//      }
//      destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
//      if ( iTextPos++ == iArrLength ) {
//       iTextPos = 0;
//       iIndex++;
//       if ( iIndex != aText.length ) {
//        iArrLength = aText[iIndex].length;
//        setTimeout("typewriter()", 500);
//       }
//      } else {
//       setTimeout("typewriter()", iSpeed);
//      }
//     }
    
    
//     typewriter();

// End of Homepage Typewriter

//Fadein Homepage Buttons

// $(document).ready(function(){

//     /*! Fades in page on load */
//     $('.homepagebuttons').css('display', 'none');
//     $('.homepagebuttons').fadeIn(10);
    
    

//     });

//Fadein Homepage Image

// $(document).ready(function(){

//     /*! Fades in page on load */
//     $('.homepageimage').css('display', 'show');
//     $('.homepageimage').fadeIn(10000);
    
//     });



//Fadein Aboutus section
    $(document).ready(function(){

        /*! Fades in page on load */
        $('.aboutus').css('display', 'none');
        $('.aboutus').fadeIn(5000);
        
        });

//Fadein FAQ section
// $(document).ready(function(){

//     /*! Fades in page on load */
//     $('.faq').css('display', 'none');
//     $('.faq').fadeIn(5000);
    
//     });


//Fadein Contact section
$(document).ready(function(){

    /*! Fades in page on load */
    $('.contactus').css('display', 'none');
    $('.contactus').fadeIn(5000);
    
    });

    //Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

 