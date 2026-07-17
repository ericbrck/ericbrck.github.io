(function () {
  var name = document.getElementById('site-name');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (name) {
    var text = name.textContent;
    var glyphs = '/\\|.:-+*#';
    var letters = [];
    name.innerHTML = '';

    for (var i = 0; i < text.length; i++) {
      var character = text[i];
      var letter = document.createElement('span');
      letter.textContent = character === ' ' ? '\u00a0' : character;
      letter.dataset.original = character;
      name.appendChild(letter);
      if (character !== ' ') letters.push(letter);
    }

    if (!reducedMotion) {
      name.addEventListener('pointermove', function (event) {
        letters.forEach(function (letter) {
          var bounds = letter.getBoundingClientRect();
          var distance = Math.hypot(event.clientX - (bounds.left + bounds.width / 2), event.clientY - (bounds.top + bounds.height / 2));
          letter.textContent = distance < 70 && Math.random() > distance / 70
            ? glyphs[Math.floor(Math.random() * glyphs.length)]
            : letter.dataset.original;
        });
      });

      name.addEventListener('pointerleave', function () {
        letters.forEach(function (letter) {
          letter.textContent = letter.dataset.original;
        });
      });
    }
  }

})();
