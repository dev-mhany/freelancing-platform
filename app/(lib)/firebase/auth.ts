import { auth } from './config'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  User,
  onAuthStateChanged
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'

/**
 * Initiates sign-in with Google using a popup.
 * @returns A promise that resolves with the signed-in user.
 */
export const signInWithGoogle = async (): Promise<User | null> => {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(auth, provider)
    // The signed-in user info.
    const user = result.user
    return user
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error('Error signing in with Google:', error)
    }
    throw error
  }
}

/**
 * Signs out the currently authenticated user.
 * @returns A promise that resolves when the sign-out is complete.
 */
export const signOutUser = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth)
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error('Error signing out:', error)
    }
    throw error
  }
}

/**
 * Returns the currently authenticated user.
 * @returns The current user or null if not authenticated.
 */
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      user => {
        resolve(user)
        unsubscribe()
      },
      error => {
        reject(error)
      }
    )
  })
}
