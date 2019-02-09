/* параметры кнопки */
const paramsButton = {
  element: [
    'button',
    'icon',
  ],
  newElement: {},
  text: {
    selfObj: '',
    lang: 'en-EN',
    utterance: '',
  },
  icon: [
    'fas fa-volume-up',
    'fas fa-microphone-alt-slash',
  ],
  style2: {
    display: 'none',
  },
  className: [
    'voice',
    'stopSpeak',
  ],
  startEvent: (event) => {
    /* поиск всех кнопок с классом voice на странице */
    // const isButton = document.getElementsByClassName(this.className.stop);
    const tag = event.target.tagName;

    /* получаем выделенный текст  */
    paramsButton.text.selfObj = window.getSelection().toString();
    // console.log(paramsButton.text.selfObj);
    this.utterance = new SpeechSynthesisUtterance(paramsButton.text.selfObj);

    // console.log(paramsButton.className.speak);

    if (paramsButton.text.selfObj.length > 2) {
      for (let i = 0; i < 2; i++) {
        paramsButton.createElements(paramsButton.element[0], paramsButton.className[i]);
      }
    } else console.log('No work!');
  },
  createElements: (element, elementClass) => {
    /* создание элемента на странице  */
    paramsButton.newElement = document.createElement(element);
    paramsButton.newElement.className = elementClass;

    if (elementClass === 'voice') {
      paramsButton.newElement.addEventListener('click', paramsButton.startSpeak);
    } else {
      paramsButton.newElement.addEventListener('click', paramsButton.stopSpeaK);
    }
    document.body.appendChild(paramsButton.newElement);
  },
  startSpeak: () => {
    speechSynthesis.speak(this.utterance);
    console.log(paramsButton.newElement);
    paramsButton.newElement.style.display = 'none';
    paramsButton.newElement.top = 0;
    paramsButton.newElement.left = 0;
  },
  stopSpeaK: () => {
    speechSynthesis.pause();
  },
};

document.addEventListener('click', paramsButton.startEvent);
