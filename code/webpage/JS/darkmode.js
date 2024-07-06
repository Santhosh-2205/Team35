function enableDarkMode(body,icons) {
    body.classList.add('dark-mode');
    body.style.backgroundColor = '#222';
    body.style.color = '#fff';
    invertIconBackgroundColors(icons, true);
  }

function disableDarkMode(body,icons) {
    body.classList.remove('dark-mode');
    body.style.backgroundColor = '#fff';
    body.style.color = '#000';
    invertIconBackgroundColors(icons, false);
  }

  function invertIconBackgroundColors(icons, invert) {
    icons.forEach(function(icon) {
      if (invert) {
        icon.style.filter = 'invert(1)';
      } else {
        icon.style.filter = 'none';
      }
    });
  }