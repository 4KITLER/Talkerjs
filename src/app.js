/* вызов события при выделении текста */
const speakText = function speakText(event) {
  // поиск всех кнопок с классом voice на странице
  const isButton = document.getElementsByClassName('voice');

  /* получаем выделенный текст  */
  const selObj = window.getSelection();
  const utterance = new SpeechSynthesisUtterance(selObj);
  utterance.lang = 'en-EN';

  /* создание кнопки на странице  */
  const addButton = document.createElement('button');
  const icon = document.createElement('i');
  const tag = event.target.tagName;
  /* кнопка для прекращения озвучивания текста */
  const stopSpeakButton = document.querySelector('.stopSpeak');
  stopSpeakButton.addEventListener('click', () => {
    speechSynthesis.pause();
    stopSpeakButton.style.display = 'none';
    addButton.style.display = 'block';
  });

  /* если выделен текст и нету  кнопки */
  if (selObj.toString().length > 2 && !(tag === 'BUTTON' || tag === 'svg' || tag === 'path') && isButton.length < 1) {
    /* кнопка для чтения */
    addButton.className = 'voice';
    icon.className = 'fas fa-volume-up';

    /* получаем позицию, где произошел клик */
    addButton.style.top = `${event.pageY + 10}px`;
    addButton.style.left = `${event.pageX - 10}px`;

    /* добавление кнопки в DOM-дерево */
    document.body.appendChild(addButton);
    addButton.appendChild(icon);
    console.log('Кнопка создана!');

    /* событие на кнопке */
    addButton.addEventListener('click', () => {
      /* озвучиваем выделенный текст */
      speechSynthesis.resume();
      speechSynthesis.speak(utterance);
      /* скрываем кнопку воспроизведения */
      addButton.style.display = 'none';

      /* Показываем кнопку прекращения озвучки */
      stopSpeakButton.style.display = 'block';
      stopSpeakButton.style.top = `${event.pageY + 10}px`;
      stopSpeakButton.style.left = `${event.pageX - 10}px`;
    });
  // eslint-disable-next-line brace-style
  }

  /* Удаление кнопки  */
  else if (event.target.tagName === 'HTML') {
    document.body.removeChild(isButton[0]);
    stopSpeakButton.style.display = 'none';
    speechSynthesis.pause();
    console.log('Кнопка удалена!');
  }
};

if (navigator.userAgent.search(/MSIE/) > 0 || navigator.userAgent.search(/NET CLR /) > 0) {
  console.log('Internet Explorer не поддерживает чтение текста!');
} else {
  document.addEventListener('click', speakText);
}
