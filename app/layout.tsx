'use client'

import { ReactNode, useState } from 'react'
import { ThemeProvider, CssBaseline, Box } from '@mui/material'
import Navbar from './(components)/ui/navigation/Navbar'
import Sidebar from './(components)/ui/navigation/Sidebar'
import Footer from './(components)/ui/navigation/Footer'
import { theme } from './theme'
import { AuthProvider } from './(hooks)/firebase/useAuth'

interface RootLayoutProps {
  children: ReactNode
}

const Template = ({ children }: RootLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Navbar */}
          <Navbar onDrawerToggle={handleDrawerToggle} />

          {/* Sidebar */}
          <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />

          {/* Main Content */}
          <Box component='main' sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            {children}
          </Box>

          {/* Footer */}
          <Footer />
        </Box>
      </ThemeProvider>
    </AuthProvider>
  )
}

// Root Layout with required HTML tags
export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang='en'>
      <body>
        <Template>{children}</Template>
      </body>
    </html>
  )
}
