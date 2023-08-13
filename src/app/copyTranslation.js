export default function copyTranslation(outputBx, styles) {
    if (document.getElementById(styles.OutputBox).value == null || document.getElementById(styles.OutputBox).value == ' ' || document.getElementById(styles.OutputBox).value == '') {
      return;
    }
    let userAgent = navigator.userAgent.toLowerCase();//Device info
    if (userAgent.includes('phone') || userAgent.includes('android') || userAgent.includes('mobile') || userAgent.includes('iphone')) {
      alert('Sorry, copying not fully supported for mobile devices');
      document.getElementById(styles.buttonUt1).remove();
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