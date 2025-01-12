'use client'

import React, { useState, useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface TypingEffectProps {
  text: string
  speed?: number
}

const useTypingEffect = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState('')
  const [index, setIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setDisplayText('')
    setIndex(0)
    setIsComplete(false)
  }, [text])

  useEffect(() => {
    if (isComplete) return

    const intervalId = window.setInterval(() => {
      if (index >= text.length) {
        setIsComplete(true)
        return clearInterval(intervalId)
      }

      setDisplayText(text.substring(0, index + 1))
      setIndex(i => i + 1)
    }, speed)

    return () => clearInterval(intervalId)
  }, [text, index, speed, isComplete])

  return displayText
}

const notFoundDescriptions = [
  `The link was a dream,
A shadow of what once was,
Now, nothing remains.`,
  `Where we are, there's only air,
A page misplaced, it isn't there.
In the void where data fades,
Questions linger, answers evade.
Not all paths lead where we care.`,
  `Where the page should be,
Empty space and missing words,
A void in the code.`,
  `Paths cross empty void,
Seeking what once existed,
Silence answers all.`,
  `Lost in the vast web,
Where you sought, there's only void,
Nothingness awaits.`,
  `Welcome, traveler.
You've reached a page that doesn't exist, a place where content used to be.
Let's take this moment to pause and reflect.
Take a deep breath in, and let it out slowly.
Notice the space around you, empty yet full of possibility.
Imagine that each exhale clears away confusion, leaving room for clarity.
As you sit with this blank page, know that it's okay to be here.
You've discovered something unexpected, and that's part of the journey.
Gently release any frustration, knowing that every path leads somewhere.
Now, when you're ready, slowly return to your search.
Trust that the right page, the right information, will appear when you need it.
Take another deep breath, and when you exhale, click back or try again.
The internet, like life, is full of surprises.
Thank you for taking this moment of calm.
Your journey continues.`,
  `An empty road lies ahead,
A destination lost to time,
Still, the journey matters.`,
  `The echo of a path untaken,
A whisper of a page unknown,
Silence lingers where words once shone.`,
  `No trace remains, no clue survives,
The trail ends here, where nothing thrives.`,
  `A moment misplaced,
A fragment of the web dissolved,
Seek and try again.`
]

const TypingText: React.FC<TypingEffectProps> = ({ text, speed = 50 }) => {
  const displayText = useTypingEffect(text, speed)

  return (
    <Typography
      variant='h6'
      color='textSecondary'
      component='div'
      sx={{
        whiteSpace: 'pre-line',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
        minHeight: '4em',
        letterSpacing: '0.3px',
        lineHeight: 1.8,
        padding: '1rem',
        position: 'relative',
        zIndex: 1
      }}
    >
      {displayText}
    </Typography>
  )
}

const NotFound = () => {
  const router = useRouter()
  const [poem] = useState(
    () => notFoundDescriptions[Math.floor(Math.random() * notFoundDescriptions.length)]
  )

  return (
    <Box
      component='div'
      sx={{
        position: 'fixed !important',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'background.default',
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        gap: '2rem',
        margin: '0 !important',
        boxSizing: 'border-box',
        isolation: 'isolate',
        '& > *': {
          position: 'relative',
          zIndex: 1
        }
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 150,
          height: 150,
          zIndex: 1
        }}
      >
        <Image
          src='/logo.svg'
          alt='Logo'
          fill
          priority
          style={{ objectFit: 'contain' }}
        />
      </Box>

      <Typography
        variant='h2'
        component='h1'
        sx={{
          fontWeight: 500,
          textAlign: 'center',
          color: 'text.primary',
          marginBottom: '1rem',
          position: 'relative',
          zIndex: 1
        }}
      >
        404 - Page Not Found
      </Typography>

      <TypingText text={poem} speed={50} />

      <Button
        variant='contained'
        onClick={() => router.push('/')}
        sx={{
          marginTop: '2rem',
          padding: '0.75rem 2rem',
          fontSize: '1.1rem',
          borderRadius: '8px',
          textTransform: 'none',
          boxShadow: 2,
          position: 'relative',
          zIndex: 1
        }}
      >
        Return Home
      </Button>
    </Box>
  )
}

export default NotFound
