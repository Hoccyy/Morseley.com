import './globals.css'
import styles from './page.module.css'

export const metadata = {
  title: 'Morseley',
  description: 'A morsecode translator to turn English to Morse-code and back!',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body>
        <div >
          <nav className={styles.menu}>
            <li className={styles.menuFont}><a href='https://github.com/Hoccyy' target='_blank'>Github</a></li>
            <li className={styles.menuFont}><a href='mailto:hoccyy13@gmail.com?subject=Morseley%20Translator'>Contact</a></li>
          </nav>
        </div>
          {children}
          <nav className={styles.menu}>
            <div className={styles.spacing}>
              <li><img src='morse-chart.gif'/></li>
              <div></div>
              <li className={styles.menuFont}> <p>Project by</p><a href='mailto:hoccyy13@gmail.com?subject=Morseley%20Translator'>Hoccyy</a></li>
            </div>
          </nav>
        </body>
    </html>
  )
}
