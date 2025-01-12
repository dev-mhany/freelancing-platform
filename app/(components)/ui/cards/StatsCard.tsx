// app/components/ui/cards/StatsCard.tsx

'use client'

import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface StatsCardProps {
  title: string
  value: string
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value }) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        minWidth: 200,
        textAlign: 'center',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        boxShadow: 3,
        borderRadius: 2
      }}
    >
      <CardContent>
        <Typography variant='h5' component='div' gutterBottom>
          {value}
        </Typography>
        <Typography variant='subtitle1'>{title}</Typography>
      </CardContent>
    </Card>
  )
}

export default StatsCard
