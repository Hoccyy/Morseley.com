'use client';
import styles from './page.module.css';
import copyTranslation from './copyTranslation';
import downloadTranslation from './downloadTranslation';
import Head from 'next/head';
import { encodeMorse, decodeMorse } from 'morseley';
import { useState } from 'react';

let translationCase = false;
const inputHolder = 'Type here to start...';
const outputHolder = 'Translations here!';


<Head>
  <script async src="adsenseURL" crossorigin="anonymous"></script>
</Head>

export default function Home() {
  let [translation, setTranslation] = useState(encodeMorse('Hoccyy'));
  let [error, setError] = useState(false);

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
    try {
    let encode = false;
    const charArray = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    ];

    for (let i = 0; i <= String(event.target.value).length; i++) {
      if (charArray.includes(String(event.target.value)[i])) {
        encode = true;
      }
    }

    if (encode) {
      setTranslation(encodeMorse(event.target.value));
      return;
    }
    let tmp = decodeMorse(event.target.value, true);
    setTranslation(tmp.charAt(0).toUpperCase() + tmp.slice(1));
  } catch (error) {
    setTranslation('Check input for invalid characters');
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
        <textarea id={styles.OutputBox} placeholder={outputHolder} readOnly onClick={() => copyTranslation(document.getElementById(styles.OutputBox), styles)} title='Click to copy' value={translation}></textarea>
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
