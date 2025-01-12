// app/components/ui/buttons/GoogleButton.tsx

'use client'

import React from 'react'
import { Button, CircularProgress } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import { useAuth } from '../../../(hooks)/firebase/useAuth'

const GoogleButton: React.FC = () => {
  const { signInWithGoogle, loading } = useAuth()

  const handleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Google sign-in failed:', error)
      // Optionally, display an error message to the user using a Snackbar or Alert
    }
  }

  return (
    <Button
      variant='contained'
      color='primary'
      startIcon={<GoogleIcon />}
      onClick={handleSignIn}
      disabled={loading}
      fullWidth
      sx={{ mt: 2 }}
    >
      {loading ? <CircularProgress size={24} color='inherit' /> : 'Sign in with Google'}
    </Button>
  )
}

export default GoogleButton
