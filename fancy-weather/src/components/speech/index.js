
export default class Speech {
  constructor(lang, input, search, button) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.lang = lang;
    this.input = input;
    this.search = search;
    this.button = button;
    this.word = null;
    this.working = false;
    this.init();
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
      this.input.value = this.word;
      this.search();
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
}
