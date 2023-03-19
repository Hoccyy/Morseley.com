'use client';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
//import { use } from 'react'
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })
const text = 'Type here to start...'

var output = "Tra";

export default function Home() {
  //const [text, setText] = useState('Type here to start...');

  function handleClick() {
    return;
  }

  const mainTranslation = (event) => {
    let userInput = ( event.target.value );
    let ct = 0;
    let translationMode = false;
    let tempTranslation = "";

    //Dictionaries
    var morseAlphabet = {" ": "\/", "@": ".--.-.", "a": " .- ", "b": "  -... ", "c": " -.-. ", "d": " -.. ", "e": " . ", "f": " ..-. ", "g": " --. ", "h": " .... ", "i": " .. ", "j": " .--- ", "k": " -.- ", "l": " .-.. ", "m": " -- ", "n": " -. ", "o": " --- ", "p": " .--. ", "q": " --.- ", "r": " .-. ", "s": " ... ", "t": " - ", "u": " ..- ", "v": " ...- ", "w": " .-- ", "x": " -..- ", "y": " -.-- ", "z": " --.. ", "1": " .---- ", "2": " ..--- ", "3": " ...-- ", "4": " ....- ", "5": " ..... ", "6": " -.... ", "7": " --... ", "8": " ---.. ", "9": " ----. ", "0": " ----- ", ".": " .-.-.- ", ",": " --..-- ", "?": " ..--.. ", "!": " ..--. ", ":": " ---... ", "\"": " .-..-. ", "\'": " .----. ", "=": " -...- "};

  
    
    if (/^[0-9a-zA-Z]+$/.test(userInput[0])) {
      translationMode = true;
    }
    //alert(translationMode)
    if (translationMode){
      
      for (var v = 0; v < userInput.length; v++){

        tempTranslation += morseAlphabet[userInput[v]];
      }
      output += "dawg";
      alert(output);
    }

  }

  return (
    <main className={styles.main}>
      <ul id={styles.languages}>
        <li className={styles.description}>English</li>
        <li className={styles.description}> </li>
        <li className={styles.description}>MorseCode</li>
      </ul>
      <div className={styles.textArea}>
        <textarea id={styles.InputBox} onClick={handleClick} onChange={mainTranslation} placeHolder={text} />
        <textarea id={styles.OutputBox} disabled value={output}></textarea>
      </div>
    </main>
  )
}
