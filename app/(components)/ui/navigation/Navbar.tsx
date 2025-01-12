// app/components/ui/navigation/Navbar.tsx

'use client'

import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { IconButton, Box, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import { useTheme } from '@mui/material/styles'
import { useAuth } from '../../../(hooks)/firebase/useAuth'

interface NavbarProps {
  onDrawerToggle: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onDrawerToggle }) => {
  const theme = useTheme()
  const { user, signOut } = useAuth()

  return (
    <AppBar position='fixed' sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* Menu Button for Mobile */}
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Branding */}
        <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
          <Link href='/' style={{ color: 'inherit', textDecoration: 'none' }}>
            Freelancer Platform
          </Link>
        </Typography>

        {/* Navigation Links for Desktop */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <Button color='inherit' component={Link} href='/projects'>
            Projects
          </Button>
          <Button color='inherit' component={Link} href='/about'>
            About
          </Button>
          {user ? (
            <Button color='inherit' onClick={signOut}>
              Sign Out
            </Button>
          ) : (
            <Button color='inherit' component={Link} href='/auth/login'>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
