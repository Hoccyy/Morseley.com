import './globals.css'
import styles from './page.module.css'

export const metadata = {
  title: 'Morseley',
  description: 'A Morsecode translator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

        <body>
        <div>
          <nav className={styles.menu}>
            <li className={styles.menuFont}>Github</li>
            <li className={styles.menuFont}>About</li>
            <li className={styles.menuFont}>Contact</li>
          </nav>
        </div>
          
          {children}
        </body>
    </html>
  )
}
