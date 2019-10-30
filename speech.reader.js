
/**
 * 1. Добавить функцию, которая будет регулярным выражением убирать из текста лишние пробелы; -
 * 2. Добавить функцию, которая будет убирать нечитабельный текст; -
 */


var speachReader = {
    bodyClass: '.sf-main-area',
    bodyChild: [],
    childText: '',
    speechText: '',
    synth: window.speechSynthesis,
    utterance: new SpeechSynthesisUtterance(),
    buttonOnId: '#speachPanel-on' ,
    buttonOffId: '#speachPanel-off',
    panel: {
        id: '#speachPanel',
        state: 'd-none',
    },
    readerState: 'stop',
    exceptions: ['SCRIPT', "I", 'STYLE', 'FORM', "#comment", "path", "polygon"],
};


function startSpeechReader(e) {
    var _e = e.currentTarget;
    if(_e.classList.contains("reader-off")) {
        _e.classList.add("reader-on");
        _e.classList.remove("reader-off");
        
        speachReader.bodyChild = document.querySelector(speachReader.bodyClass).childNodes;
        //checkExceptions();
        collectText();

    } else if(_e.classList.contains("reader-on")) {
        _e.classList.add("reader-off");
        _e.classList.remove("reader-on");
        speechSynthesis.cancel();
    }
}

function collectText() {
    speachReader.bodyChild.forEach((child, i) => {
        if(typeof child.textContent != null) {
            // console.log("Дети: " + child.childNodes);
            // console.log("Текст: " + child.textContent);
            // speachReader.childText += ' ' + child.textContent.replace(/\s+/g, ' ');
            checkChild(child);
        }  
    }); 
}


function checkExceptions(elem) {
    var counter = 0;

    for(var i = 0; i < speachReader.exceptions.length; i++) {
        if (speachReader.exceptions[i] == elem) {
            break;
        } 
        counter++;
    }

    if (counter == speachReader.exceptions.length) {
       return true;
    } else {
        return;
    }

}

/* function checkExceptions() {
    // console.log(speachReader);
    var newArr = [];
    speachReader.bodyChild.forEach((child, i) => {
        var counter = 0;
        for(var i = 0; i < speachReader.exceptions.length; i++) {
            if (speachReader.exceptions[i] == child.tagName) {
                break;
            } 
            counter++;
        }
        if (counter == speachReader.exceptions.length) {
            newArr.push(child);
        }
        speachReader.bodyChild = newArr;
    });
}*/

function checkChild(elem) {
    if(elem.childNodes.length > 0) {
        for(var k = 0; k < elem.childNodes.length; k++) {
            checkChild(elem.childNodes[k]);
        }
    } else {
        if(checkExceptions(elem.nodeName)) {
            speachReader.childText += ' ' + elem.textContent.replace(/\s+/g, ' ');
        }
    } 
}

function readText() {
    if (speachReader.readerState == 'stop') {
        speachReader.utterance.text = speachReader.childText;
        speachReader.utterance.lang = "ru-RU";
        speachReader.synth.speak(speachReader.utterance);
    } else if(speachReader.readerState == 'pause') {
        speachReader.synth.resume(speachReader.utterance);
    }
    activeStatePanel('on', speachReader.readerState);
    speachReader.readerState = 'on';
}

function pauseText() {
    activeStatePanel('pause', speachReader.readerState);
    speachReader.readerState = 'pause';
    speachReader.synth.pause();
}

function stopText() {
    speachReader.synth.cancel();
    speachReader.utterance.text = '';
    activeStatePanel('stop', speachReader.readerState);
    speachReader.readerState = 'stop';
}

function activeStatePanel(newAct, oldAct) {
    var oldActiveElem = document.querySelector('#speachPanel-' + oldAct);
    var newActiveElem = document.querySelector('#speachPanel-' + newAct);

    if (oldActiveElem.classList.contains('bg-primary')) {
        oldActiveElem.classList.remove('bg-primary');
    }
    newActiveElem.classList.add('bg-primary');
}

//Change state of SpeechReader panel
function changeStatePanel() {
    if(speachReader.panel.state == 'd-none') {
        document.querySelector(speachReader.panel.id).classList.remove('d-none');
        document.querySelector(speachReader.panel.id).classList.add('d-block');
        speachReader.panel.state = 'd-block';
    } else {
        document.querySelector(speachReader.panel.id).classList.remove('d-block');
        document.querySelector(speachReader.panel.id).classList.add('d-none');
        speachReader.panel.state = 'd-none';
        stopText();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#speech-reader").addEventListener("click", startSpeechReader);
});
