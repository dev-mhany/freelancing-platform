// app/auth/login/page.tsx

'use client'

import React from 'react'
import { Container, Typography, Box } from '@mui/material'
import GoogleButton from '../../(components)/ui/buttons/GoogleButton'

const LoginPage: React.FC = () => {
  return (
    <Container maxWidth='sm'>
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant='h4' gutterBottom>
          Welcome to Freelancer Platform
        </Typography>
        <Typography variant='body1' gutterBottom>
          Please sign in to continue
        </Typography>
        <GoogleButton />
      </Box>
    </Container>
  )
}

export default LoginPage
