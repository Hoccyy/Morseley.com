'use client';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
//import { use } from 'react'
//import { useState } from 'react';
//const inter = Inter({ subsets: ['latin'] })

const text = 'Type here to start...'
var outputHolder = "Translations here";
var translationCase = false;

export default function Home() {
  function copyTranslation(outputBx, segment){
    if (segment){
      navigator.clipboard.writeText(outputBx.value);
      return;
    }
    else{
      let temp = outputBx.value;
      outputBx.value = "Copied!";
      setTimeout(() => {}, 5000);
      outputBx.value = temp;
      navigator.clipboard.writeText(outputBx.value);
    }
  }
  function downloadTranslation(outputBx){
    if (outputBx.value == 1 || outputBx.value.length == 0 || outputBx.value == null){
      return;
    }
    const translationFile = new Blob([(new Date())+"\n\n--------------  Translation Below   ----------------\n\n"+outputBx.value], {type: "text/plain"});
    const url_ = window.URL.createObjectURL(translationFile);
    //Anchor tag
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

    if (translationCase){
      capsbutton.style = "background-color: red;";
      Translation.value = Translation.value.toUpperCase();
    }else{
      capsbutton.style = "background-color: black;";
      Translation.value = Translation.value.toLowerCase();
    }
  }

  const mainTranslation = (event) => {
    var morse_Into_English = {"----": "0", "|": " ", "/": " ", "-....-":"-", ".----": "1", "..---": "2", "...--": "3", "....-":"4", ".....":"5", "-....":"6", "--...":"7","---..": "8", "----.": "9", ".-": "a", "-...":"b", "-.-.":"c", "-..": "d", ".":"e", "..-.":"f", "--.":"g", "....":"h", "..":"i", ".---": "j", "-.-": "k", ".-..":"l", "--":"m", "-.":"n", "---":"o", ".--.":"p", "--.-":"q", ".-.":"r", "...":"s", "-": "t", "..-": "u", "...-": "v", ".--": "w", "-..-":"x", "-.--":"y", "--..":"z", ".-.-.-": ".", "--..--":",", "..--..":"?", "..--.":"!", "---...":":", ".-..-.": '"', ".----.":"\'", "-...-": "=", ".-.-" : "Æ", ".-.-." : "+"};
    let userInput = (event.target.value).toLowerCase();
    //let ct = 0;
    let translationMode = false;
    let tempTranslation = "";

    //Dictionaries
    var morseAlphabet = {" ": "\/", "@": " .--.-. ", "-": " -....- ", "a": " .- ", "b": " -... ", "c": " -.-. ", "d": " -.. ", "e": " . ", "f": " ..-. ", "g": " --. ", "h": " .... ", "i": " .. ", "j": " .--- ", "k": " -.- ", "l": " .-.. ", "m": " -- ", "n": " -. ", "o": " --- ", "p": " .--. ", "q": " --.- ", "r": " .-. ", "s": " ... ", "t": " - ", "u": " ..- ", "v": " ...- ", "w": " .-- ", "x": " -..- ", "y": " -.-- ", "z": " --.. ", "1": " .---- ", "2": " ..--- ", "3": " ...-- ", "4": " ....- ", "5": " ..... ", "6": " -.... ", "7": " --... ", "8": " ---.. ", "9": " ----. ", "0": " ----- ", ".": " .-.-.- ", ",": " --..-- ", "?": " ..--.. ", "!": " -.-.-- ", ":": " ---... ", "\"": " .-..-. ", "\'": " .----. ", "=": " -...- ", "Æ": " .-.- ", "+": " .-.-. "};

    if (/^[0-9a-zA-Z]+$/.test(userInput[0])) {
      translationMode = true;
    }
    //alert(translationMode)
    //Checking for dashes(_) put instead of underscores (-)
    if (userInput.includes('_')){
      while (userInput.includes('_')){
        userInput = userInput.replace('_', '-');
      }
    }
    if (userInput.includes('\\')){
      while (userInput.includes('\\')){
        userInput = userInput.replace('\\', '/');
      }
    }

    for (var v=0; v<2;v++){
      if (userInput[v] == '.' || userInput[v] == '_'){
        translationMode = false;
      }
    }

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
      
      const translationOutput = document.getElementById(styles.OutputBox);
      translationOutput.value = tempTranslation;
      
      //alert(translationOutput.innerHTML);
      return;//
    }
    //For translating morsecode into english
    else{
      //Get ride of double spaces
      if (userInput.includes("  ")){
        while (userInput.includes("  ")){
          userInput = userInput.replace("  ", " ");
        }
      }
      let morseArr = userInput.trim().split(" ");

      for (var v = 0; v < userInput.length; v++){
        if (morse_Into_English[morseArr[v]] != undefined){
          tempTranslation += morse_Into_English[morseArr[v]];
          //alert(morseArr[v]);
        }
      }
      const translationOutput = document.getElementById(styles.OutputBox);
      //Returns translation in caps or common letters
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
        <button id={styles.buttonUt} onClick={() => copyTranslation(document.getElementById(styles.OutputBox), true)}>Copy</button>
        <button id={styles.buttonUt} onClick={() => downloadTranslation(document.getElementById(styles.OutputBox))}>Download</button>
      </div>
    </main>
  )
}