// YOUR CODE HERE:
(function() {
  var myData = new Firebase('https://chat-codestates.firebaseio.com/');
  var passData;
  var friendList = {};
  var existingRooms = {};
  var timeStamp = new Date().getTime();
  myData.set(timeStamp);

  var userData = function(){
    this.usernames = {};
    this.profile = '<span>Nothing yet...</span>';
    this.image = '<img src="img/me.png" alt="User Avatar" class="img-circle">';
  }

  userData.prototype.show = function(){
    $(".myProfile").append(this.profile);
    $(".myImage").append(this.image);
  }

  var me = new userData();
  me.show();

  // helper function
    // returns a string that has fixed HTML escape issues
  var escapeHtml = function(string){
    if(string){
      return string.replace(/[&]/g,"&#38;").replace(/[<]/g,"&lt;").replace(/[>]/g,"&gt;");
    }
  };

    // appends a tag inside specified ul ('.chat')
    // that includes username and userText
  var addMessage = function(snapshot) {

    var username = escapeHtml(snapshot.val().username);
    var userText = escapeHtml(snapshot.val().text);
    var message;

    username = username ? username.slice(0,30) : "Anonymous";
    userText = userText ? userText.slice(0,30) : "";

    // if the user sends the message
    if(me.usernames[username]){
      message =
      '<li class="right clearfix">' +
        '<span class="chat-img pull-right">' +
        me.image +
        '</span>' +
        '<div class="chat-body clearfix">' +
          '<div class="header">' +
            // '<small class=" text-muted"><span class="glyphicon glyphicon-time"></span>15 mins ago</small>'
            '<strong class="pull-right primary-font username">' + username + '</strong>' +
            '<small class="text-muted">' +
            '<span class="glyphicon glyphicon-time"></span>12 mins ago</small>' +
          '</div>' +
          '<p class="userText">' +
            userText +
          '</p>' +
        '</div>' +
      '</li>'
    }

    // if the uploaded message is from friends
    else if(friendList[username]){
      message =
      '<li class="left clearfix">' +
        '<span class="chat-img pull-left">' +
        '<img src="img/user.png" alt="User Avatar" class="img-circle">' +
        '</span>' +
        '<div class="chat-body clearfix">' +
          '<div class="header">' +
            '<strong class="primary-font username friend">' +username + '</strong>' +
            '<small class="pull-right text-muted">' +
            '<span class="glyphicon glyphicon-time"></span>12 mins ago</small>' +
            // '<small class="pull-right text-muted">
            // <span class="glyphicon glyphicon-time"></span>12 mins ago</small>'
          '</div>' +
          '<p class="pull-right userText friend">' +
            userText +
          '</p>' +
        '</div>' +
      '</li>'
    }

    // if the uploaded message is not from friends
    else{
      message =
      '<li class="left clearfix">' +
        '<span class="chat-img pull-left">' +
        '<img src="img/user.png" alt="User Avatar" class="img-circle">' +
        '</span>' +
        '<div class="chat-body clearfix">' +
          '<div class="header">' +
            '<strong class="primary-font username">' +username + '</strong>' +
            '<small class="pull-right text-muted">' +
            '<span class="glyphicon glyphicon-time"></span>12 mins ago</small>' +
            // '<small class="pull-right text-muted">
            //  <span class="glyphicon glyphicon-time"></span>12 mins ago</small>'
          '</div>' +
          '<p class="pull-right userText">' +
            userText +
          '</p>' +
        '</div>' +
      '</li>'
    }

    $('.chat').append(message);
  }

  //appends roomnames to the modal
  // to be used as a callback later
  var insertRoomname = function(snapshot){
    var roomname = snapshot.val().roomname;
    if (!existingRooms[roomname] && roomname !== undefined) {
      var room = '<li>' + '<a href="#" class="roomname" data-dismiss="modal">' + roomname + '<\a>' + '</li>';
      $('.rooms').append(room);
    }
    existingRooms[roomname] = true;
  };

  // appends message to the chatbox
  // to be used as a callback later
  var insertMessage = function(snapshot) {
    addMessage(snapshot);

    console.dir(snapshot.val());

    var el = document.getElementsByClassName('panel-body')[0];
    var scrollHeight = el.scrollHeight;
    $('.panel-body').stop().animate({scrollTop: scrollHeight},500)
  };

  // keeps on updating the list
  var listUpdate = (function() {
    myData.limitToLast(30).on('child_added', insertRoomname , function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  })();

  // updates a new message every time the data is pushed into the database
  var update = function() {
    myData.limitToLast(30).on("child_added", insertMessage , function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  };

  update();

  // detaches a given func from 'child_added' event
  var stopUpdate = function(func) {
    myData.off("child_added",func);
  };

  // updates a new message in a particular room.
  var roomUpdate = function(roomname) {
    myData.orderByChild("roomname").equalTo(roomname).on("child_added", insertMessage , function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  };

  var removeFriend = function(friendName) {
    friendList[friendName] = false;

    var friends = $('.username').filter(function () { return $(this).html() === friendName; });

    friends.removeClass('friend');
    friends.closest('.chat-body').find('.userText').removeClass('friend');
  };

  var addFriend = function(friendName) {
    friendList[friendName] = true;

    var friends = $('.username').filter(function () { return $(this).html() === friendName; });

    friends.addClass('friend');
    friends.closest('.chat-body').find('.userText').addClass('friend');
  };


  // event handlers
  $(".make").on('click', function() {
    var roomname = prompt("Type a new room name");
    passData = roomname;
    // clears up the current text box
    $(".chat").html('');
    $(".currentRoom").text(roomname);

    stopUpdate(insertMessage);
    roomUpdate(roomname);
  });

  $('#submit').on('click', function(){
    var name = $('#nameInput').val();
    var text = $('#messageInput').val();
    var roomname = passData? passData : null;

    if(!me.usernames[name]) $('.myUsernames').append('<li class="myUsername">'+name+'</li>')
    me.usernames[name] = true;

    myData.push({username: name, text: text, roomname: roomname});
  });

  $('#exit').on('click', function() {
    $('.chat').html('');
    $(".currentRoom").text('Open Chat');

    stopUpdate(insertMessage);
    update();
  });

  $('.chat').on('click','.username',function(){
    var name = $(this).text();

    // does not get triggered when I click myself
    if(!me.usernames[name]){
      if(friendList[name]){
        removeFriend(name);
      }
      else{
        addFriend(name);
      }
    }
  });

  // when user types something in the message box
  $('#messageInput').keydown(function (e) {

   var key = e.which;

   console.log(key);

   // the enter key code
   if(key == 13) {
      var isValid = false;

      if ($('#messageInput').val()) {
        isValid = true;
      }

      // checks if the user types something other than blank
      if (isValid) {
        $('button[id = submit]').click();
      }

      // make submit button disappear and make message box empty
      // debugger;
      $('#submit').css("opacity", "0");
      $('#messageInput').val("");
      // return false;

    } else {
      // submit button appears
      $('#submit').css("opacity", "1").css("animation-name", "popup");
    }
  });



  $('.rooms').on('click','.roomname',function(){
    var roomname = $(this).html();
    $(".chat").html('');
    $(".currentRoom").text(roomname);

    passData = roomname;
    stopUpdate(insertMessage);
    roomUpdate(roomname);
  });

  $('#settings').on('click',function(){

  });

})();








