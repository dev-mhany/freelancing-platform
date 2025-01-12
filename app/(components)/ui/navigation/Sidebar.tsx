'use client'

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  Button
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssignmentIcon from '@mui/icons-material/Assignment'
import MessageIcon from '@mui/icons-material/Message'
import LogoutIcon from '@mui/icons-material/Logout'
import Link from 'next/link'
import { useAuth } from '../../../(hooks)/firebase/useAuth'

interface SidebarProps {
  mobileOpen: boolean
  onDrawerToggle: () => void
  drawerWidth?: number
}

const Sidebar = ({ mobileOpen, onDrawerToggle, drawerWidth = 240 }: SidebarProps) => {
  const { user, signOut } = useAuth()

  const drawer = (
    <div>
      <Toolbar>
        <Button
          variant='contained'
          color='primary'
          component={Link}
          href='/'
          fullWidth
          sx={{ textTransform: 'none' }}
        >
          Home
        </Button>
      </Toolbar>
      <Divider />
      <List>
        <ListItemButton component={Link} href='/projects'>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary='Projects' />
        </ListItemButton>
        <ListItemButton component={Link} href='/about'>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary='About' />
        </ListItemButton>
        {user && (
          <>
            <ListItemButton component={Link} href='/dashboard'>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='Dashboard' />
            </ListItemButton>
            <ListItemButton component={Link} href='/dashboard/messages'>
              <ListItemIcon>
                <MessageIcon />
              </ListItemIcon>
              <ListItemText primary='Messages' />
            </ListItemButton>
            <ListItemButton onClick={signOut}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary='Sign Out' />
            </ListItemButton>
          </>
        )}
      </List>
    </div>
  )

  return (
    <Box
      component='nav'
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label='navigation folders'
    >
      {/* Temporary Drawer for Mobile */}
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
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

      {/* Permanent Drawer for Desktop */}
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
  )
}

export default Sidebar
