'use client'

import { useState, useEffect } from 'react'
import { Card, Typography, Button, Box, CircularProgress } from '@mui/material'
import ProjectCard from '../(components)/ui/cards/ProjectCard'
import { BaseDocument, useFirestore } from '../(hooks)/firebase/useFirestore'

interface Project extends BaseDocument {
  title: string
  description: string
  imageUrl: string
  // Add other project-specific fields
}

interface ProjectsListProps {
  projects: Project[]
  loading: boolean
  error: string | null
}

const ProjectsList = ({ projects, loading, error }: ProjectsListProps) => {
  const { getProjectsWithPagination } = useFirestore()

  const [allProjects, setAllProjects] = useState<Project[]>(projects)
  const [lastVisible, setLastVisible] = useState<Project | undefined>(undefined)
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    setAllProjects(projects)
    if (projects.length > 0) {
      setLastVisible(projects[projects.length - 1])
    }
  }, [projects])

  const loadMoreProjects = async () => {
    if (isLoadingMore || !hasMore) return

    setIsLoadingMore(true)
    setLoadError(null)

    try {
      const { projects: newProjects, lastVisible: newLastVisible } =
        await getProjectsWithPagination<Project>(10, lastVisible)
      setAllProjects(prev => [...prev, ...newProjects])
      setLastVisible(newLastVisible || undefined)
      if (newProjects.length < 10) {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error loading more projects:', error)
      setLoadError('Failed to load more projects.')
    } finally {
      setIsLoadingMore(false)
    }
  }

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )
    }

    if (error) {
      return (
        <Typography variant='body2' color='error'>
          {error}
        </Typography>
      )
    }

    return (
      <>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            '& > *': {
              flex: '1 1 300px',
              minWidth: 0,
              maxWidth: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.333% - 11px)' }
            }
          }}
        >
          {allProjects.map(project => (
            <Box key={project.id}>
              <ProjectCard project={project} />
            </Box>
          ))}
        </Box>

        {hasMore && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant='outlined'
              color='primary'
              onClick={loadMoreProjects}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? <CircularProgress size={24} /> : 'Load More'}
            </Button>
          </Box>
        )}

        {loadError && (
          <Typography variant='body2' color='error' align='center' sx={{ mt: 2 }}>
            {loadError}
          </Typography>
        )}
      </>
    )
  }

  return (
    <Card
      sx={{
        height: '100%',
        boxShadow: 3,
        borderRadius: 2,
        p: 2
      }}
    >
      <Typography variant='h6' gutterBottom>
        Projects
      </Typography>

      {renderContent()}
    </Card>
  )
}

export default ProjectsList
