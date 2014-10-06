var socket = io.connect('http://localhost:8080')
var promptValue = '';
var responseText = '';

$(function() {
  var responseTemplate = Handlebars.compile($("#response-template").html());
  var promptTemplate = Handlebars.compile($("#prompt-template").html());

  socket.on('connect', function () {
    console.log('Socket connected');
  });

  socket.on('message', function(msg) {
    // concat
    responseText += msg;
    // until we reach the end of this message
    if (responseText.match(/\n$/)) {
      var responseHtml = responseTemplate({ response: responseText });
      $('#shell-content').append(responseHtml);
      // keep the viewport scrolled down
      $('#shell').scrollTop($('#shell-inner').outerHeight() - window.innerHeight);
      responseText = '';
    };
  });

  $('#input input').focus();

  $('#input').submit(function(e) {
    e.preventDefault();
    var promptValue = $('#input input').val();
    socket.send(promptValue);
    var promptHtml = promptTemplate({ promptValue: promptValue })
    $('#shell-content').append(promptHtml);
    $('#input input').val('');
  });

  $(document).keydown(function(e) {
    if (e.keyCode === 75 && e.metaKey) {
      $('#shell-content').html('');
    };
    $('#input input').focus();
  })
});