const drumPads = document.querySelectorAll('.drum-pad');
const display = document.getElementById('display');

function playSound(keyCode) {
  const audio = document.getElementById(keyCode);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
    const drumPad = document.getElementById(`${audio.parentNode.id}`);
    drumPad.classList.add('active');
    setTimeout(() => {
      drumPad.classList.remove('active');
    }, 100);
    display.textContent = drumPad.id;
  }
}

drumPads.forEach(pad => {
  pad.addEventListener('click', () => {
    const keyCode = pad.children[0].id;
    playSound(keyCode);
  });
});

document.addEventListener('keydown', event => {
  const keyCode = event.key.toUpperCase();
  playSound(keyCode);
});