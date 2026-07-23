import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Northstar Café',
  description: 'A cozy cafe serving coffee, pastries, and breakfast.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}