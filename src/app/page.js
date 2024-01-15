'use client';
import styles from './page.module.css';
import copyTranslation from './copyTranslation';
import downloadTranslation from './downloadTranslation';
import Head from 'next/head';

let translationCase = false;
const inputHolder = 'Type here to start...';
const outputHolder = 'Translations here!';

<Head>
  <script async src="adsenseURL" crossorigin="anonymous"></script>
</Head>

export default function Home() {
  function textCaseChange() {
    translationCase = !(translationCase);
    const capsbutton = document.getElementById(styles.translationTextCase);
    const Translation = document.getElementById(styles.OutputBox);
   
    if (translationCase) {
      capsbutton.style = 'background-color: Red;';
      capsbutton.innerHTML = capsbutton.innerHTML.toUpperCase();
      Translation.value = Translation.value.toUpperCase();
    }
    
    else {
      capsbutton.style = 'background-color: Black;';
      Translation.value = Translation.value.toLowerCase();
      capsbutton.innerHTML = 'Caps';
    }
  }

  // Main function entry point
  const mainTranslation = (event) => {
    const morse_Into_English = {'----': '0', '|': ' ', '/': ' ', '-....-':'-', '.----': '1', '..---': '2', '...--': '3', '....-':'4', '.....':'5', '-....':'6', '--...':'7','---..': '8', "----.": "9", ".-": "a", "-...":"b", "-.-.":"c", "-..": "d", ".":"e", "..-.":"f", "--.":"g", "....":"h", "..":"i", ".---": "j", "-.-": "k", ".-..":"l", "--":"m", "-.":"n", "---":"o", ".--.":"p", "--.-":"q", ".-.":"r", "...":"s", "-": "t", "..-": "u", "...-": "v", ".--": "w", "-..-":"x", "-.--":"y", "--..":"z", ".-.-.-": ".", "--..--":",", "..--..":"?", "..--.":"!", "---...":":", ".-..-.": '"', ".----.":"\'", "-...-": "=", ".-.-" : "Æ", ".-.-." : "+"};
    let userInput = (event.target.value).toLowerCase();

    // Sets translation mode - true (Eng to Morse) and false(Morse to Eng)
    let translationMode = false;
    let temporaryTranslation = '';
    const morseAlphabet = {' ': '\/', '@': ' .--.-. ', '-': ' -....- ', 'a': ' .- ', 'b': ' -... ', 'c': ' -.-. ', 'd': ' -.. ', 'e': ' . ', 'f': ' ..-. ', 'g': ' --. ', 'h': ' .... ', "i": " .. ", "j": " .--- ", "k": " -.- ", "l": " .-.. ", "m": " -- ", "n": " -. ", "o": " --- ", "p": " .--. ", "q": " --.- ", "r": " .-. ", "s": " ... ", "t": " - ", "u": " ..- ", "v": " ...- ", "w": " .-- ", "x": " -..- ", "y": " -.-- ", "z": " --.. ", "1": " .---- ", "2": " ..--- ", "3": " ...-- ", "4": " ....- ", "5": " ..... ", "6": " -.... ", "7": " --... ", "8": " ---.. ", "9": " ----. ", "0": " ----- ", ".": " .-.-.- ", ",": " --..-- ", "?": " ..--.. ", "!": " -.-.-- ", ":": " ---... ", "\"": " .-..-. ", "\'": " .----. ", "=": " -...- ", "Æ": " .-.- ", "+": " .-.-. "};

    if (/^[0-9a-zA-Z]+$/.test(userInput[0])) {
      // Changes trasnlation mode into 'English to morsecode'
      translationMode = true;
    }

    // Input cleaning and support for other symbols
    if (userInput.includes('_')) {
      while (userInput.includes('_')){
        userInput = userInput.replace('_', '-');
      }
    }
    if (userInput.includes('\\')) {
      while (userInput.includes('\\')) {
        userInput = userInput.replace('\\', '/');
      }
    }

    // Checks if mode is 'morsecode to English' and changes it to 'English to morsecode'
    for (let v=0; v<2;v++) {
      if (userInput[v] == '.' || userInput[v] == '_') {
        translationMode = false;
      }
    }

    // Mode #1 - 'English to Morsecode'
    if (translationMode) {
      for (let v = 0; v < userInput.length; v++) {
        temporaryTranslation += morseAlphabet[userInput[v]];
      }
      while (temporaryTranslation.includes('undefined')) {
        temporaryTranslation = temporaryTranslation.replace('undefined', ' # ');
      }
      if (temporaryTranslation.includes('  ') ) {
        while (temporaryTranslation.includes('  ')) {
          temporaryTranslation = temporaryTranslation.replace('  ', ' ');
        }
      }

      const translationOutput = document.getElementById(styles.OutputBox);
      translationOutput.value = temporaryTranslation;
      return;
    }

    // Mode #2 - 'Morsecode to English'
    else {
      if (userInput.includes('  ')) {
        while (userInput.includes('  ')) {
          userInput = userInput.replace('  ', ' ');
        }
      }

      let morseTranslationArray = userInput.trim().split(' ');

      for (let v = 0; v < userInput.length; v++) {
        if (morse_Into_English[morseTranslationArray[v]] != undefined) {
          temporaryTranslation += morse_Into_English[morseTranslationArray[v]];
        }
      }

      const translationOutput = document.getElementById(styles.OutputBox);

      if (translationCase) {
        translationOutput.value = temporaryTranslation.toUpperCase();
      }
      else {
        translationOutput.value = temporaryTranslation;
      }
    }
  }

  return (
    <main className={styles.primary}>
      <Head>
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9022203058839959"
          crossorigin="anonymous">
        </script>
      </Head>

      <ul id={styles.languages}>
        <li className={styles.description}>
          English
        </li>
        <li className={styles.description}></li>
        <li className={styles.description}>
          MorseCode
        </li>
      </ul>

        <h1 className={styles.mobileTranslations}>MorseCode Translator</h1>
      <div className={styles.caseDiv}>
        <button id={styles.translationTextCase} onClick={ textCaseChange } title='Caps lock for translations'>
          Caps
        </button>
      </div>
      
      <div className={styles.textArea}>
        <textarea id={styles.InputBox} onChange={mainTranslation} placeholder={inputHolder}></textarea>
        <textarea id={styles.OutputBox} placeholder={outputHolder} readOnly onClick={() => copyTranslation(document.getElementById(styles.OutputBox), styles)} title='Click to copy'></textarea>
      </div>

      <div id={styles.utilityButtonHolder}>
        <button id={styles.buttonUt1} onClick={() => copyTranslation(document.getElementById(styles.OutputBox), styles)} title='Copy translation to clipboard'>
          Copy
        </button>
        <button id={styles.buttonUt} onClick={() => downloadTranslation(document.getElementById(styles.OutputBox))} title='Download a text file of the translation'>
          Download
        </button>
      </div>
    </main>
  )
}
