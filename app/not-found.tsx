// app/not-found.tsx

'use client' // Designate this as a Client Component

import React, { useState, useEffect } from 'react'
import { Box, Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// TypingEffect Component: Displays text with a typing animation
interface TypingEffectProps {
  text: string
  speed?: number // Speed in milliseconds between each character
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState<string>('')

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setDisplayedText(prev => prev + text.charAt(index))
      index++
      if (index === text.length) {
        clearInterval(timer) // Stop the timer when all characters are displayed
      }
    }, speed)

    return () => clearInterval(timer) // Cleanup the timer on unmount
  }, [text, speed])

  return (
    <Typography
      variant='h6'
      color='textSecondary'
      component='p'
      sx={{ whiteSpace: 'pre-line', mt: 2, textAlign: 'center' }}
    >
      {displayedText}
    </Typography>
  )
}

// Array of poetic descriptions for the 404 page
const notFoundDescriptions: string[] = [
  `The link was a dream,
A shadow of what once was—
Now, nothing remains.`,
  `Where we are, there's only air,
A page misplaced, it isn't there.
In the void where data fades,
Questions linger, answers evade.
Not all paths lead where we care.`,
  `Where the page should be,
Empty space and missing words—
A void in the code.`,
  `Paths cross empty void
Seeking what once existed
Silence answers all.`,
  `Lost in the vast web,
Where you sought, there's only void—
Nothingness awaits.`,
  `Welcome, traveler.
You’ve reached a page that doesn't exist, a place where content used to be—or maybe never was.
Let’s take this moment to pause and reflect.
Take a deep breath in, and let it out slowly.
Notice the space around you, empty yet full of possibility.
Imagine that each exhale clears away confusion, leaving room for clarity.
As you sit with this blank page, know that it’s okay to be here.
You’ve discovered something unexpected, and that’s part of the journey.
Gently release any frustration, knowing that every path leads somewhere—even this one.
Now, when you're ready, slowly return to your search.
Trust that the right page, the right information, will appear when you need it.
Take another deep breath, and when you exhale, click back or try again.
The internet, like life, is full of surprises.
Thank you for taking this moment of calm.
Your journey continues.`,
  `An empty road lies ahead,
A destination lost to time—
Still, the journey matters.`,
  `The echo of a path untaken,
A whisper of a page unknown,
Silence lingers where words once shone.`,
  `No trace remains, no clue survives,
The trail ends here, where nothing thrives.`,
  `A moment misplaced,
A fragment of the web dissolved—
Seek and try again.`
]

// NotFound Component: The custom 404 page
const NotFound: React.FC = () => {
  const router = useRouter()

  // Select a random description from the array
  const randomDescription =
    notFoundDescriptions[Math.floor(Math.random() * notFoundDescriptions.length)]

  // Handle navigation back to the home page
  const handleGoBack = () => {
    router.push('/') // Navigate to the homepage
  }

  return (
    <Box
      sx={{
        minHeight: '100vh', // Full viewport height
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default', // Background color from theme
        p: 3 // Padding
      }}
    >
      {/* Logo Section */}
      <Box sx={{ mb: 4 }}>
        <Image src='/logo.png' alt='Logo' width={150} height={150} />
      </Box>

      {/* 404 Heading */}
      <Typography variant='h3' component='h1' gutterBottom align='center'>
        404 - Page Not Found
      </Typography>

      {/* Typing Description */}
      <TypingEffect text={randomDescription} speed={50} />

      {/* Go Back Button */}
      <Button variant='contained' color='primary' sx={{ mt: 4 }} onClick={handleGoBack}>
        Go to Home
      </Button>
    </Box>
  )
}

export default NotFound
