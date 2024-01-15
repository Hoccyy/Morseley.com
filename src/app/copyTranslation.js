export default function copyTranslation(outputBx, styles) {
    let OutPutValue = document.getElementById(styles.OutputBox).value;

    if (OutPutValue == null || OutPutValue == ' ' || OutPutValue == '') {
      return;
    }
    
    // Device info to check if the user is on mobile or desktop
    let userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('phone') || userAgent.includes('android') || userAgent.includes('mobile') || userAgent.includes('iphone')) {
      alert('Sorry, copying not fully supported for mobile devices');

      if (document.getElementById(styles.buttonUt1)) document.getElementById(styles.buttonUt1).remove();
      return;
    } else {
      try {
        navigator.clipboard.writeText(outputBx.value);
        return;
      }
      catch {
        document.getElementById(styles.buttonUt1).remove();
        return;
      }
    }
}