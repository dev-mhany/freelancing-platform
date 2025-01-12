// app/components/dashboard/ActivityFeed.tsx

'use client'

import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider
} from '@mui/material'
import { Activity } from '../../(hooks)/firebase/useFirestore'
import { useTheme } from '@mui/material/styles'
import PersonIcon from '@mui/icons-material/Person'
import AssignmentIcon from '@mui/icons-material/Assignment'
import SendIcon from '@mui/icons-material/Send'

interface ActivityFeedProps {
  activities: Activity[]
}

const getActivityIcon = (action: string) => {
  switch (action) {
    case 'created_project':
      return <AssignmentIcon />
    case 'applied_project':
      return <SendIcon />
    case 'user_signup':
      return <PersonIcon />
    // Add more cases as needed
    default:
      return <PersonIcon />
  }
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const theme = useTheme()

  return (
    <Card sx={{ height: '100%', boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          Recent Activities
        </Typography>
        <List>
          {activities.map(activity => (
            <React.Fragment key={activity.id}>
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                    {getActivityIcon(activity.action)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={formatActivity(activity)}
                  secondary={new Date(activity.timestamp.seconds * 1000).toLocaleString()}
                />
              </ListItem>
              <Divider variant='inset' component='li' />
            </React.Fragment>
          ))}
          {activities.length === 0 && (
            <Typography variant='body2' color='text.secondary'>
              No recent activities.
            </Typography>
          )}
        </List>
      </CardContent>
    </Card>
  )
}

// Helper function to format activity messages
const formatActivity = (activity: Activity): string => {
  switch (activity.action) {
    case 'created_project':
      return `${activity.userId} created a new project.`
    case 'applied_project':
      return `${activity.userId} applied to a project.`
    case 'user_signup':
      return `${activity.userId} signed up.`
    // Add more cases as needed
    default:
      return `${activity.userId} performed an action.`
  }
}

export default ActivityFeed
