var five = require('johnny-five'),
    board = new five.Board();

var CHARS = {
      32: ' ',     // SPACE
      48: '.----', // 1
      49: '..---', // 2
      50: '...--', // 3
      51: '....-', // 4
      52: '.....', // 5
      53: '-....', // 6
      54: '--...', // 7
      55: '---..', // 8
      56: '----.', // 9
      57: '-----', // 0

      97: '.-',    // a
      98: '-...',  // b
      99: '-.-.',  // c
      100:'-..',   // d
      101:'.',     // e
      102:'..-.',  // f
      103:'--.',   // g
      104:'....',  // h
      105:'..',    // i
      106:'.---',  // j
      107:'-.-',   // k
      108:'.-..',  // l
      109:'--',    // m
      110:'-.',    // n
      111:'---',   // o
      112:'.--.',  // p
      113:'--.-',  // q
      114:'.-.',   // r
      115:'...',   // s
      116:'-',     // t
      117:'..-',   // u
      118:'...-',  // v
      119:'.--',   // w
      120:'-..-',  // x
      121:'-.--',  // y
      122:'--..'   // z
    },
    Led,
    ON        = 125,
    OFF       = 250,
    SPACE     = 375,
    NBSP      = 125,
    InBuffer  = [],
    OutBuffer = [];

var blink = function() {
  var bit = OutBuffer.shift();
  if(!bit) {
    board.wait(10, function() { blink(); });
    return;
  }

  var delay = (bit == '.' ? ON : (bit == ' ' ? SPACE : OFF));
  Led.on();
  board.wait(delay, function() {
    Led.off();
    board.wait(NBSP, function() { blink(); });
  });
};

board.on('ready', function() {
  console.log('Ready for input');

  Led = new five.Led(13);

  setInterval(function() {
    if(InBuffer.length === 0) { return; }

    var code  = InBuffer.shift(),
        morse = CHARS[code].split('');

    OutBuffer = OutBuffer.concat(morse);
  }, 50);

  var stdin = process.openStdin();

  stdin.on('data', function(chunk) {
    var code = chunk.toLowerCase().charCodeAt();
    if(code == 32) { return; }
    if( (code >= 48 && code <= 57) || (code >= 97 && code <= 122)) {
      InBuffer.push(code);
    }
  });

  blink();
});