
export default class Speech {
  constructor(lang, input, search, button, sayIt, playButton) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.synth = window.speechSynthesis;
    this.lang = lang;
    this.input = input;
    this.search = search;
    this.button = button;
    this.word = null;
    this.working = false;
    this.saying = false;
    this.init();
    this.sayIt = sayIt;
    this.volume = 0.5;
    this.playButton = playButton;
  }

  init() {
    this.recognition.onaudiostart = () => {
      this.working = true;
      this.button.style.color = 'red';
    };

    this.recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((e) => e[0])
        .map((e) => e.transcript)[0];

      if (event.results[0].isFinal) {
        this.word = transcript;
      }
    };

    this.recognition.onend = () => {
      this.working = false;
      this.button.style.color = '#80868b';
      if (this.word === 'погода' || this.word === 'weather') {
        this.sayIt();
      } else if (this.word === 'louder' || this.word === 'громче') {
        this.volume = (this.volume + 0.1) > 1 ? 1 : (this.volume + 0.1);
      } else if (this.word === 'quieter' || this.word === 'тише') {
        this.volume = (this.volume - 0.1) < 0 ? 1 : (this.volume - 0.1);
      } else {
        this.input.value = this.word;
        this.search();
      }
      this.word = null;
    };
  }

  letsSpeech() {
    if (!this.working) {
      this.recognition.interimResults = true;
      this.recognition.lang = this.lang === 'en' ? 'en-En' : 'ru-Ru';
      this.recognition.start();
    } else {
      this.recognition.stop();
    }
  }

  read(str) {
    if (this.synth.speaking) {
      this.playButton.innerHTML = '<i class="fas fa-play"></i>';
      this.synth.cancel();
    } else {
      this.playButton.innerHTML = '<i class="fas fa-stop"></i>';
      const utterThis = new SpeechSynthesisUtterance(str);
      utterThis.lang = this.lang === 'en' ? 'en-En' : 'ru-Ru';
      utterThis.volume = this.volume;
      utterThis.onend = () => {
        this.playButton.innerHTML = '<i class="fas fa-play"></i>';
      };

      this.synth.speak(utterThis);
    }
  }
}
