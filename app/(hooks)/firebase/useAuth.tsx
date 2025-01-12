'use client'

import { useEffect, useState, createContext, useContext, ReactNode, useMemo } from 'react'
import { User } from 'firebase/auth'
import { signInWithGoogle, signOutUser, getCurrentUser } from '../../(lib)/firebase/auth'

interface AuthContextProps {
  user: User | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch (error) {
        console.error('Failed to fetch current user:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeUser()
  }, [])

  const handleSignInWithGoogle = async () => {
    setLoading(true)
    try {
      const signedInUser = await signInWithGoogle()
      setUser(signedInUser)
    } catch (error) {
      console.error('Google sign-in failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOutUser()
      setUser(null)
    } catch (error) {
      console.error('Sign-out failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      signInWithGoogle: handleSignInWithGoogle,
      signOut: handleSignOut
    }),
    [user, loading] // handleSignInWithGoogle and handleSignOut are stable references
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
