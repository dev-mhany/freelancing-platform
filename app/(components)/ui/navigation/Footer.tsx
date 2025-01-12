// app/components/ui/navigation/Footer.tsx

'use client'

import React from 'react'
import { Box, Typography, Link as MuiLink } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const Footer: React.FC = () => {
  const theme = useTheme()

  return (
    <Box
      component='footer'
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor:
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        textAlign: 'center'
      }}
    >
      <Typography variant='body2' color='text.secondary'>
        © {new Date().getFullYear()} Freelancer Platform. All rights reserved.
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        <MuiLink href='/privacy' color='inherit' sx={{ mx: 1 }}>
          Privacy Policy
        </MuiLink>
        |
        <MuiLink href='/terms' color='inherit' sx={{ mx: 1 }}>
          Terms of Service
        </MuiLink>
        |
        <MuiLink href='/contact' color='inherit' sx={{ mx: 1 }}>
          Contact Us
        </MuiLink>
      </Typography>
    </Box>
  )
}

export default Footer
