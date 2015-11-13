Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}


window.myapp = {};
window.fbAsyncInit = function() {
  FB.init({
    appId      : '452220451533688',
    xfbml      : true,
    version    : 'v2.1'
  });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));


function login(){
  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      console.log('Logged in.');
    }
    else {
      FB.login(function(){}, {scope: 'read_stream'});
    }
  });
}

function removeWinner(){
  if(myapp.previousWinnerIndex) {
    myapp.sharers.splice(myapp.previousWinnerIndex, 1);    
    myapp.previousWinnerIndex = undefined;
  }
  initJSlots();
}

// fancy example
function initJSlots(){
  $('#slot').empty();  
  $('#sharers').empty();
  window.myapp.sharers = [
    "1",      
    "2",
      "3",      
      "4",      
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15"
  ]

  var len = myapp.sharers.length;
  while(len >0){
    len--;
    var sharer = myapp.sharers[len]    

    $('#sharers').append('<li><span>' + sharer + '</span></li>');
    $('#slot').append('<li><span>' + sharer + '</span></li>');
  }
  

  $('.fancy .slot').jSlots({
      number : 1,
      winnerNumber : 7,
      spinner : '#playFancy',
      easing : 'easeOutSine',
      time : 7000,
      loops : 6,
      onStart : function() {
          $('.slot').removeClass('winner');
      },
      onEnd: function(finalNumbers){
        console.log(finalNumbers);
        myapp.previousWinnerIndex = finalNumbers[0];
      },
      onWin : function(winCount, winners, finalNumbers) {
          // only fires if you win

          $.each(winners, function() {
              this.addClass('winner');
          });

          console.log(winCount, winners, finalNumbers);

          // react to the # of winning slots
          if ( winCount === 1 ) {
              //alert('You got ' + winCount + ' 7!!!');
          } else if ( winCount > 1 ) {
              //alert('You got ' + winCount + ' 7’s!!!');
          }

      }
  });
}


function getShare(){
  initJSlots();
}

// function getShare(){
//   FB.api(
//     "/488768554607276/sharedposts?limit=300",
//     function (response) {
//       console.log( 'response', response);
//       if (response && !response.error) {
//         var shares = response.data;
//         console.log( 'shares', shares.length);
//         var sharers = [];
//         var len = shares.length;
//         while(len >= 0){
//           len--;
//           var share = shares[len];
//           if(share && share.message){
//             console.log(share.message);
//             if(share.message.toLowerCase().indexOf("#android") >= 0){
//               sharers.push(share.from.name);                            
//             }
//           }
//         }
        
//         window.allSharers = sharers;                        
//         window.myapp.sharers = sharers.getUnique();

//         initJSlots();
        
        
//       }
//     }
//   );
// }