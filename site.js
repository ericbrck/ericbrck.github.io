(function () {
  var name = document.getElementById('site-name');
  var email = document.getElementById('contact-email');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var glyphs = '/\\|.:-+*#';

  function addScrambleEffect(element) {
    if (!element) return;

    var text = element.textContent;
    var letters = [];
    element.innerHTML = '';

    for (var i = 0; i < text.length; i++) {
      var character = text[i];
      var letter = document.createElement('span');
      letter.textContent = character === ' ' ? '\u00a0' : character;
      letter.dataset.original = character;
      element.appendChild(letter);
      if (character !== ' ') letters.push(letter);
    }

    function restore() {
      letters.forEach(function (letter) {
        letter.textContent = letter.dataset.original;
      });
    }

    if (!reducedMotion) {
      element.addEventListener('pointermove', function (event) {
        letters.forEach(function (letter) {
          var bounds = letter.getBoundingClientRect();
          var distance = Math.hypot(event.clientX - (bounds.left + bounds.width / 2), event.clientY - (bounds.top + bounds.height / 2));
          letter.textContent = distance < 70 && Math.random() > distance / 70
            ? glyphs[Math.floor(Math.random() * glyphs.length)]
            : letter.dataset.original;
        });
      });

      element.addEventListener('pointerleave', restore);

      var focusTarget = element.closest('a');
      if (focusTarget) {
        focusTarget.addEventListener('focus', function () {
          letters.forEach(function (letter) {
            letter.textContent = Math.random() > 0.45
              ? glyphs[Math.floor(Math.random() * glyphs.length)]
              : letter.dataset.original;
          });

          window.setTimeout(restore, 160);
        });
      }
    }
  }

  addScrambleEffect(name);
  addScrambleEffect(email);

})();
