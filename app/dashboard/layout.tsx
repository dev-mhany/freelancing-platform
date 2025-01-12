'use client'

import { ReactNode, useState } from 'react'
import { useAuth } from '../(hooks)/firebase/useAuth'
import { useRouter } from 'next/navigation'
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CssBaseline,
  Box,
  IconButton
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import ProjectIcon from '@mui/icons-material/Assignment'
import MessageIcon from '@mui/icons-material/Message'
import LogoutIcon from '@mui/icons-material/Logout'

interface DashboardLayoutProps {
  children: ReactNode
}

const drawerWidth = 240

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { signOut } = useAuth()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Handle drawer toggle for mobile view
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  // Handle navigation clicks
  const handleNavigation = (path: string) => {
    router.push(path)
    setMobileOpen(false)
  }

  // Handle sign out
  const handleSignOut = async () => {
    await signOut()
    router.push('/auth/login')
  }

  // Drawer content
  const drawer = (
    <div>
      <Toolbar>
        <Typography variant='h6' noWrap component='div'>
          Freelancer Dashboard
        </Typography>
      </Toolbar>
      <List>
        <ListItemButton onClick={() => handleNavigation('/dashboard')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary='Dashboard' />
        </ListItemButton>
        <ListItemButton onClick={() => handleNavigation('/dashboard/projects')}>
          <ListItemIcon>
            <ProjectIcon />
          </ListItemIcon>
          <ListItemText primary='Projects' />
        </ListItemButton>
        <ListItemButton onClick={() => handleNavigation('/dashboard/users')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary='Users' />
        </ListItemButton>
        <ListItemButton onClick={() => handleNavigation('/dashboard/messages')}>
          <ListItemIcon>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText primary='Messages' />
        </ListItemButton>
        <ListItemButton onClick={handleSignOut}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary='Sign Out' />
        </ListItemButton>
      </List>
    </div>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component='nav'
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label='dashboard folders'
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default DashboardLayout
