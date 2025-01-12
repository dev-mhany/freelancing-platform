'use client'

import { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia
} from '@mui/material'
import ProjectCard from './(components)/ui/cards/ProjectCard'
import StatsCard from './(components)/ui/cards/StatsCard'
import Link from 'next/link'
import { BaseDocument, useFirestore } from './(hooks)/firebase/useFirestore'

interface Project extends BaseDocument {
  title: string
  description: string
  imageUrl: string
}

const LandingPage = () => {
  const { getAllDocuments } = useFirestore()
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllDocuments<Project>('projects')
        setProjects(data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      }
    }

    fetchProjects()
  }, [getAllDocuments])

  return (
    <Container maxWidth='lg'>
      {/* Hero Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          py: 8
        }}
      >
        <Typography variant='h2' gutterBottom>
          Welcome to Freelancer Platform
        </Typography>
        <Typography variant='h5' color='text.secondary' gutterBottom>
          Connect with talented freelancers and manage your projects with ease.
        </Typography>
        <Button
          variant='contained'
          color='primary'
          size='large'
          component={Link}
          href='/auth/login'
          sx={{ mt: 4 }}
        >
          Get Started
        </Button>
      </Box>

      {/* Statistics Section */}
      <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
          <StatsCard title='Projects' value='1,200+' />
          <StatsCard title='Freelancers' value='500+' />
          <StatsCard title='Completed Tasks' value='10,000+' />
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Typography variant='h4' align='center' gutterBottom>
          Features
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {/* Feature Cards */}
          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component='img'
                height='140'
                image='/images/authentication.png'
                alt='User Authentication'
              />
              <CardContent>
                <Typography variant='h5' gutterBottom>
                  Secure Authentication
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Sign in with Google or LinkedIn for a seamless and secure login
                  experience.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component='img'
                height='140'
                image='/images/project-listings.png'
                alt='Project Listings'
              />
              <CardContent>
                <Typography variant='h5' gutterBottom>
                  Project Listings
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Browse and apply to a wide range of projects tailored to your skills and
                  interests.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component='img'
                height='140'
                image='/images/admin-management.png'
                alt='Admin Management'
              />
              <CardContent>
                <Typography variant='h5' gutterBottom>
                  Admin Management
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  Efficiently manage projects, users, and applications through a
                  comprehensive admin panel.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Projects Showcase */}
      <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Typography variant='h4' align='center' gutterBottom>
          Featured Projects
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {projects.slice(0, 6).map(project => (
            <Box key={project.id} sx={{ flex: '1 1 300px', minWidth: 0 }}>
              <ProjectCard project={project} />
            </Box>
          ))}
        </Box>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button variant='outlined' color='primary' component={Link} href='/projects'>
            View All Projects
          </Button>
        </Box>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8 }}>
        <Typography variant='h4' align='center' gutterBottom>
          What Our Users Say
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Box sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <Card sx={{ padding: 2 }}>
              <Typography variant='body1' gutterBottom>
                &ldquo;Freelancer Platform has transformed the way I manage my projects.
                The interface is intuitive and user-friendly.&rdquo;
              </Typography>
              <Typography variant='subtitle2' color='text.secondary'>
                - Jane Doe, Project Manager
              </Typography>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <Card sx={{ padding: 2 }}>
              <Typography variant='body1' gutterBottom>
                &ldquo;Connecting with skilled freelancers has never been easier.
                I&apos;ve completed multiple projects successfully.&rdquo;
              </Typography>
              <Typography variant='subtitle2' color='text.secondary'>
                - John Smith, Freelancer
              </Typography>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <Card sx={{ padding: 2 }}>
              <Typography variant='body1' gutterBottom>
                &ldquo;The admin panel provides comprehensive tools to oversee all aspects
                of project management seamlessly.&rdquo;
              </Typography>
              <Typography variant='subtitle2' color='text.secondary'>
                - Emily Johnson, Administrator
              </Typography>
            </Card>
          </Box>
        </Box>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant='h4' gutterBottom>
          Ready to Start Your Next Project?
        </Typography>
        <Button
          variant='contained'
          color='primary'
          size='large'
          component={Link}
          href='/auth/login'
        >
          Get Started Now
        </Button>
      </Box>
    </Container>
  )
}

export default LandingPage
