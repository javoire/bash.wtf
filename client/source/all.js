//= include '../bower_components/socket.io-client/socket.io.js'
//= include '../bower_components/jquery/dist/jquery.js'
//= include '../bower_components/handlebars/handlebars.js'

var socket = io.connect('http://localhost:8080')
var promptValue = '';

$(function() {
  var source   = $("#entry-template").html();
  var template = Handlebars.compile(source);

  socket.on('connect', function () {
    console.log('Socket connected');
  });

  socket.on('message', function(msg) {
    var context = { response: msg }
    var html    = template(context);
    $('#response').html([
      $('#response').html(),
      '<div class="prompt-line">',
        '<div class="prompt">$</div>',
          '<div class="prompt-value">',
            promptValue + '\n',
          '</div>',
      '</div>',
      html,
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
      $('#response').html('');
    };
    $('#input input').focus();
  })
});