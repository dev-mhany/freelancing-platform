// app/components/ui/buttons/SubmitButton.tsx

'use client'

import React from 'react'
import { Button, CircularProgress } from '@mui/material'

interface SubmitButtonProps {
  label: string
  onClick: () => void
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  onClick,
  loading = false,
  type = 'button',
  disabled = false
}) => {
  return (
    <Button
      variant='contained'
      color='primary'
      onClick={onClick}
      type={type}
      disabled={loading || disabled}
      fullWidth
      sx={{ mt: 2 }}
    >
      {loading ? <CircularProgress size={24} color='inherit' /> : label}
    </Button>
  )
}

export default SubmitButton
