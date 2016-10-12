$(document).ready(function(){

    // SURVEY QUESTIONS
    var questions = {
      q1: "Your mind is always buzzing with unexplored ideas and plans.",
      q2: "Generally speaking, you rely more on your experience than your imagination.",
      q3: "You find it easy to stay relaxed and focused even when there is some pressure.",
      q4: "You rarely do something just out of sheer curiosity.",
      q5: "People can rarely upset you.",
      q6: "It is often difficult for you to relate to other people’s feelings.",
      q7: "In a discussion, truth should be more important than people’s sensitivities.",
      q8: "You rarely get carried away by fantasies and ideas.",
      q9: "You think that everyone’s views should be respected regardless of whether they are supported by facts or not.",
      q10: "You feel more energetic after spending time with a group of people."
    };
    var qnumber = 1;
    for (var question in questions) {

      var div = $('<div></div>').addClass('form-group');

      $(div).html('\
        <label class="control-label question">\
        <span class="number">Question ' + qnumber + ':</span> ' + questions[question] + '</label>\
        <div><select class="selectpicker" title="Select answer">\
            <option data-subtext="Strongly Disagree">1</option>\
            <option>2</option>\
            <option>3</option>\
            <option>4</option>\
            <option data-subtext="Strongly Agree">5</option>\
          </select></div>');

      // Provide each question with a unique ID
      $(div).find('.selectpicker').attr('id','q' + qnumber);

      // Appends div to quiz content
      $('.quiz-content').append(div);

      qnumber++;
    };

    console.log((qnumber - 1) + " questions displaying!");

    // On submit, add data to friends list
    $('#submit').on('click', function(){

      // Create new object to store data
      var newFriend = {
        name: $('#friendName').val().trim(),
        photo: $('#friendPhoto').val().trim(),
        answers: []
      };

      // Loop through each question to push new friend's answer to array
      for (var i = 1; i < qnumber; i++) {
        newFriend.answers.push(Number($('#q' + i).selectpicker('val')));
      };

      // Create array to find friend match
      var totalDifference = [];
      
      // Get location of root page
      var currentURL = window.location.origin;

      // Get existing array of data to compare answers
      $.get(currentURL + '/api/friends', function(friendsArray, err, next){

        // If friendsArray has members
        if (friendsArray !== undefined) 
        {

          var newFriendSum = 0;
          $.each(newFriend.answers,function() {
              newFriendSum += parseFloat(this);
          });
        
          // Loop through existing friends
          for (var j = 0; j < friendsArray.length; j++) 
          {
            var exisitingFriendSum = 0;

            $.each(friendsArray[j].answers,function(){
              exisitingFriendSum += parseFloat(this);
            });

            totalDifference.push(Math.abs(exisitingFriendSum - newFriendSum));
          };

          // Finds min difference by utalizing function to find min value of array
          Array.min = function(array){
            return Math.min.apply(Math,array);
          };

          // Calculates friends match
          var friendMatch = friendsArray[totalDifference.indexOf(Array.min(totalDifference))];

          // Creates <h3> elements and puts the matched name in it
          var matchText = $('<h3>');
          matchText.text(friendMatch.name);

          // Creates image tag and puts the matched friends picture url in it
          var matchImg = $('<img>');
          matchImg.attr('src',friendMatch.photo).width(300).height(300);

          // Appends matched friends name and image to match-result ID
          $('#match-result').append(matchText).append(matchImg);

          // Displays match...
          $('#match').modal('show');

        };
      });

      // Post new friends data
      $.post(currentURL + '/api/friends', newFriend, function(data){
        console.log('New friend data submitted!');
      });

      return false;
    });

    // When modal closes, form gets reset
    $('#match').on('hidden.bs.modal', function () {
      $('#friendName').val('');
      $('#friendPhoto').val('');
      $('.selectpicker').selectpicker('val','');
    });
});