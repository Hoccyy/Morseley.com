'use client';
import styles from './page.module.css'

const text = 'Type here to start...'
var outputHolder = "Translations here";
var translationCase = false;

export default function Home() {
  function copyTranslation(outputBx){
    //Returns early if there is no translation to avoid clearing clipboard
    if (document.getElementById(styles.OutputBox).value == ' ' || document.getElementById(styles.OutputBox).value == '' || document.getElementById(styles.OutputBox).value == null){
      return;
    }
    let userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes("phone") || userAgent.includes("android") || userAgent.includes("mobile")|| userAgent.includes("iphone")){
      document.getElementById(styles.buttonUt1).remove();
      return;
    }
    else{//Copies to clipboard
      navigator.clipboard.writeText(outputBx.value);
      return;
    }
  }
  function downloadTranslation(outputBx){
    if (outputBx.value == 1 || outputBx.value.length == 0 || outputBx.value == null){
      return;
    }
    const translationFile = new Blob([(new Date())+"\n\n--------------  Translation Below   ----------------\n\n"+outputBx.value], {type: "text/plain"});
    const url_ = window.URL.createObjectURL(translationFile);
    //Anchor tag to create file
    const a = document.createElement("a");
    a.href = url_;
    a.download = "Morseley Translation.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  //Change translation text case
  function textCaseChange() {
    translationCase = !(translationCase);
    const capsbutton = document.getElementById(styles.translationTextCase);
    const Translation = document.getElementById(styles.OutputBox);
    //Casing button visual changes
    if (translationCase){
      capsbutton.style = "background-color: red;";
      Translation.value = Translation.value.toUpperCase();
    }else{
      capsbutton.style = "background-color: black;";
      Translation.value = Translation.value.toLowerCase();
    }
  }
  //Main function to handle all translations as the user enters characters
  const mainTranslation = (event) => {
    //Dictionary to store morsecode translations to English chars
    var morse_Into_English = {"----": "0", "|": " ", "/": " ", "-....-":"-", ".----": "1", "..---": "2", "...--": "3", "....-":"4", ".....":"5", "-....":"6", "--...":"7","---..": "8", "----.": "9", ".-": "a", "-...":"b", "-.-.":"c", "-..": "d", ".":"e", "..-.":"f", "--.":"g", "....":"h", "..":"i", ".---": "j", "-.-": "k", ".-..":"l", "--":"m", "-.":"n", "---":"o", ".--.":"p", "--.-":"q", ".-.":"r", "...":"s", "-": "t", "..-": "u", "...-": "v", ".--": "w", "-..-":"x", "-.--":"y", "--..":"z", ".-.-.-": ".", "--..--":",", "..--..":"?", "..--.":"!", "---...":":", ".-..-.": '"', ".----.":"\'", "-...-": "=", ".-.-" : "Æ", ".-.-." : "+"};
    //Gets user input as slowercase for efficient translations
    let userInput = (event.target.value).toLowerCase();
    //Sets translation mode true(Eng to Morse) and false(Morse to Eng)
    let translationMode = false;
    let tempTranslation = "";//Temporary storage of translations initialized

    //Dictionary to convert english chars to morsecode
    var morseAlphabet = {" ": "\/", "@": " .--.-. ", "-": " -....- ", "a": " .- ", "b": " -... ", "c": " -.-. ", "d": " -.. ", "e": " . ", "f": " ..-. ", "g": " --. ", "h": " .... ", "i": " .. ", "j": " .--- ", "k": " -.- ", "l": " .-.. ", "m": " -- ", "n": " -. ", "o": " --- ", "p": " .--. ", "q": " --.- ", "r": " .-. ", "s": " ... ", "t": " - ", "u": " ..- ", "v": " ...- ", "w": " .-- ", "x": " -..- ", "y": " -.-- ", "z": " --.. ", "1": " .---- ", "2": " ..--- ", "3": " ...-- ", "4": " ....- ", "5": " ..... ", "6": " -.... ", "7": " --... ", "8": " ---.. ", "9": " ----. ", "0": " ----- ", ".": " .-.-.- ", ",": " --..-- ", "?": " ..--.. ", "!": " -.-.-- ", ":": " ---... ", "\"": " .-..-. ", "\'": " .----. ", "=": " -...- ", "Æ": " .-.- ", "+": " .-.-. "};

    //Uses regex to check if the input is english or morsecode
    if (/^[0-9a-zA-Z]+$/.test(userInput[0])) {
      translationMode = true;//Changes mode to 'Eng. to morse'
    }
    //Checking for dashes(_) in input instead of underscores (-)
    if (userInput.includes('_')){
      while (userInput.includes('_')){
        userInput = userInput.replace('_', '-');
      }
    }
    //Caters to incorrect slashes so the user still gets an accurate translation
    if (userInput.includes('\\')){
      while (userInput.includes('\\')){
        userInput = userInput.replace('\\', '/');
      }
    }
    //Checks if mode is morse to Eng. and changes it
    for (var v=0; v<2;v++){
      if (userInput[v] == '.' || userInput[v] == '_'){
        translationMode = false;
      }
    }
    //Running of the English to Morse-code mode
    if (translationMode){
      for (var v = 0; v < userInput.length; v++){
        tempTranslation += morseAlphabet[userInput[v]];
      }
      while (tempTranslation.includes("undefined")){
        tempTranslation = tempTranslation.replace("undefined", " # ");
      }
      //removing double spaces
      if (tempTranslation.includes("  ")){
        while (tempTranslation.includes("  ")){
          tempTranslation = tempTranslation.replace("  ", " ");
        }
      }
      //Stores the output and shows the user
      const translationOutput = document.getElementById(styles.OutputBox);
      translationOutput.value = tempTranslation;
      
      return;
    }
    //morsecode to English mode
    else{
      //Removing double spaces
      if (userInput.includes("  ")){
        while (userInput.includes("  ")){
          userInput = userInput.replace("  ", " ");
        }
      }
      //Removal of end spaces and storing the morsecode as an array
      let morseArr = userInput.trim().split(" ");

      for (var v = 0; v < userInput.length; v++){
        if (morse_Into_English[morseArr[v]] != undefined){
          tempTranslation += morse_Into_English[morseArr[v]];
        }
      }
      const translationOutput = document.getElementById(styles.OutputBox);
      //Returns translation in caps or common letters (Linked to 'Caps' button)
      if (translationCase){
        translationOutput.value = tempTranslation.toUpperCase();
      }
      else{
        translationOutput.value = tempTranslation;
      }
    }
  }//
  return (
    <main className={styles.main}>
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9022203058839959"
     crossOrigin="anonymous"></script>
      </head>
      
      <ul id={styles.languages}>
        <li className={styles.description}>English</li>
        <li className={styles.description}></li>
        <li className={styles.description}>MorseCode</li>
      </ul>
      <div className={styles.caseDiv}>
        <button id={styles.translationTextCase} onClick={textCaseChange}>Caps</button>
      </div>
      <div className={styles.textArea}>
        <textarea id={styles.InputBox} onChange={mainTranslation} placeHolder={text} />
        <textarea id={styles.OutputBox} placeHolder={outputHolder} disabled></textarea>
      </div>
      <div id={styles.utilityButtons}>
        <button id={styles.buttonUt1} onClick={() => copyTranslation(document.getElementById(styles.OutputBox))}>Copy</button>
        <button id={styles.buttonUt} onClick={() => downloadTranslation(document.getElementById(styles.OutputBox))}>Download</button>
      </div>
    </main>
  )
}
