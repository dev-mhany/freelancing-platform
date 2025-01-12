'use client'

import React from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { Statistics } from '../../(hooks)/firebase/useFirestore'
import { useTheme } from '@mui/material/styles'

interface StatsOverviewProps {
  statistics: Statistics
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ statistics }) => {
  const theme = useTheme()

  const statsData = [
    { title: 'Total Projects', value: statistics.totalProjects },
    { title: 'Total Freelancers', value: statistics.totalFreelancers },
    { title: 'Tasks Completed', value: statistics.totalTasksCompleted }
  ]

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        width: '100%'
      }}
    >
      {statsData.map(stat => (
        <Box
          key={stat.title}
          sx={{
            flex: {
              xs: '1 1 100%', // Full width on mobile
              sm: '1 1 calc(33.333% - 16px)' // One third width minus gap on larger screens
            },
            minWidth: {
              xs: '100%',
              sm: 'calc(33.333% - 16px)'
            }
          }}
        >
          <Card
            sx={{
              textAlign: 'center',
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
              boxShadow: 3,
              borderRadius: 2,
              height: '100%' // Ensure cards have equal height
            }}
          >
            <CardContent>
              <Typography variant='h5' component='div' gutterBottom>
                {stat.value}
              </Typography>
              <Typography variant='subtitle1'>{stat.title}</Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  )
}

export default StatsOverview
