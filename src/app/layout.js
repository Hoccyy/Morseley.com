import './globals.css'
import styles from './page.module.css'

export const metadata = {
  title: 'Morseley',
  description: 'A morse-code translator to translate English to Morse-code and back! Morseley uses international morse code and quickly gives you translations available for download.',
  
}
export default function RootLayout({ children }) {
  return(
    <html lang="en">
        <body>
        <div >
          <nav className={styles.menu}>
            <li className={styles.menuFont}><a href='https://github.com/Hoccyy' target='_blank'>💻 GitHub</a></li>
            <li className={styles.menuFont}><a href='mailto:hoccyy13@gmail.com?subject=Morseley%20Translator%20Suggestion&body=Leave Suggestions for the Morseley Translator!%0d%0a https://www.morseley.com %0d%0a______________________________________%0d%0a' title='Suggest features or fixes!'>Suggestions</a></li>
            <li className={styles.menuFont}><a href='mailto:hoccyy13@gmail.com?subject=Morseley%20Translator' title='Send an email for concerns'>Contact ⛑️</a></li>
          </nav>
        </div>
          {children}
          <nav className={styles.menu}>
            <div className={styles.spacing}>
              <li><img className={styles.previewImages} src='macOSX_Preview.png' alt='Website Preview' title='Website Preview on MacOSX Dark mode'/></li>
              <li><img className={styles.previewImages} src='morse-chart.png' alt='Morse code alphabet with numbers and symbols' title='Morsecode alphabet with morse-code symbols and numbers'/></li>
              <div></div>
              <li className={styles.menuFont}> <p>Project by</p><a href='mailto:hoccyy13@gmail.com?subject=Morseley%20Translator' title='Computer Science student and enthusiast! 🪴'>@Hoccyy p</a></li>
            </div>
          </nav>
        </body>
    </html>
  )
}
