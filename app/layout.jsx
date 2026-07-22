import './globals.css'

export const metadata = {
  title: 'Bitesizeblogs',
  description: 'A blog from the mind of Miller and Friends',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
