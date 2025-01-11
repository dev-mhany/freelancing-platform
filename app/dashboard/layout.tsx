'use client'

import { Box } from '@mui/material'
import { Navbar } from '../(components)/ui/navigation/Navbar'
import { Sidebar } from '../(components)/ui/navigation/Sidebar'

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Box sx={{ display: 'flex' }}></Box>
      <Navbar />
      <Sidebar />
      <Box component='main' sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </>
  )
}
