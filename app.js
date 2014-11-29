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

// fancy example
function initJSlots(){
  $('.fancy .slot').jSlots({
      number : 1,
      winnerNumber : 1,
      spinner : '#playFancy',
      easing : 'easeOutSine',
      time : 7000,
      loops : 6,
      onStart : function() {
          $('.slot').removeClass('winner');
      },
      onWin : function(winCount, winners, finalNumbers) {
          // only fires if you win

          $.each(winners, function() {
              this.addClass('winner');
          });

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
  FB.api(
    "/401077880043011/sharedposts",
    function (response) {
      console.log(response);
      if (response && !response.error) {
        var shares = response.data;
        var sharers = [];
        shares.forEach(function(share){
          if(share.message ){
            if(share.message.indexOf("#khmer_smart_keyboard_happy_sunday") >= 0){
              sharers.push(share.from.name);                            
            }
          }
        });

        sharers = sharers.getUnique();
        sharers.forEach(function(sharer ){
          $('#sharers').append('<li><span>' + sharer + '</span></li>');
          $('#slot').append('<li><span>' + sharer + '</span></li>');
        });

        initJSlots();
        window.myapp.sharers = sharers;
        
      }
    }
  );
}