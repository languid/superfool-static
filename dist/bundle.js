(function () {
'use strict';

queue.exec(function () {

  var lineWidth = 15;
  var waveLength = 100;
  if (isMobile) {
    lineWidth = 8;
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 20 + 'px';
  }
  var waves = document.getElementById('waves');
  if (waves) {
    new SineWaves({
      el: waves,
      speed: 8,
      width: function width() {
        return window.innerWidth;
      },
      height: function height() {
        return 300;
      },
      ease: 'SineInOut',
      wavesWidth: '200%',
      waves: [{
        timeModifier: 1,
        lineWidth: lineWidth,
        amplitude: 100,
        wavelength: waveLength,
        segmentLength: 20
      }, {
        timeModifier: 1,
        lineWidth: 2,
        amplitude: waveLength * .9,
        wavelength: 120
      }, {
        timeModifier: 1,
        lineWidth: lineWidth,
        amplitude: -waveLength,
        wavelength: 90,
        segmentLength: 10
      }],

      resizeEvent: function resizeEvent() {
        var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
        gradient.addColorStop(0, "rgba(65, 27, 80, 0.2)");
        gradient.addColorStop(.25, "rgba(42, 42, 105, 0.5)");
        gradient.addColorStop(.5, "rgba(30, 76, 110, .8)");
        gradient.addColorStop(.75, "rgba(42, 42, 105, 0.5)");
        gradient.addColorStop(1, "rgba(65, 27, 80, 0.2)");
        var index = -1;
        var length = this.waves.length;
        while (++index < length) {
          this.waves[index].strokeStyle = gradient;
        }

        index = void 0;
        length = void 0;
        gradient = void 0;
      }
    });
  }

  setTimeout(function () {
    $('.brand').addClass('show');
  }, 500);
});

$(function () {
  queue.isReady = true;
  for (var i = 0; i < queue.length; i++) {
    queue[i]();
  }
});

}());
//# sourceMappingURL=bundle.js.map
