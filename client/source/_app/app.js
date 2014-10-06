var socket = io.connect('http://localhost:8080')
var promptValue = '';

$(function() {
  var responseTemplate = Handlebars.compile($("#response-template").html());
  var promptTemplate = Handlebars.compile($("#prompt-template").html());

  socket.on('connect', function () {
    console.log('Socket connected');
  });

  socket.on('message', function(msg) {
    var responseHtml = responseTemplate({ response: msg });
    var promptHtml = promptTemplate({ promptValue: promptValue })
    $('#shell-content').html([
      $('#shell-content').html(),
      promptHtml,
      responseHtml,
    ].join(''));
    $('#shell').scrollTop($('#shell-inner').outerHeight() - window.innerHeight);
  })

  $('#input input').focus();

  $('#input').submit(function(e) {
    e.preventDefault();
    promptValue = $('#input input').val();
    socket.send(promptValue);
    $('#input input').val('');
  });

  $(document).keydown(function(e) {
    if (e.keyCode === 75 && e.metaKey) {
      $('#shell-content').html('');
    };
    $('#input input').focus();
  })
});