// app/components/ui/cards/ProjectCard.tsx

'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button
} from '@mui/material'
import Link from 'next/link'

interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  // Add other relevant fields as needed
}

interface ProjectCardProps {
  project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Project Image */}
      <CardMedia
        component='img'
        height='160'
        image={project.imageUrl || '/images/default-project.png'} // Default image if none provided
        alt={project.title}
      />

      {/* Project Details */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant='h5' component='div'>
          {project.title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {project.description.length > 100
            ? `${project.description.substring(0, 100)}...`
            : project.description}
        </Typography>
      </CardContent>

      {/* Action Buttons */}
      <CardActions>
        <Button size='small' component={Link} href={`/projects/${project.id}`}>
          View Details
        </Button>
        <Button
          size='small'
          variant='contained'
          color='primary'
          component={Link}
          href={`/projects/${project.id}/apply`}
        >
          Apply
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProjectCard
