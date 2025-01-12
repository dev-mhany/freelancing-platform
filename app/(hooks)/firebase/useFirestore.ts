'use client'

import { db } from '../../(lib)/firebase/config' // Fixed path
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit as firestoreLimit,
  startAfter,
  QueryConstraint,
  DocumentData,
  Timestamp,
} from 'firebase/firestore'

// Base interface for Firestore documents
export interface BaseDocument extends DocumentData {
  id: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

// Interface for Activity Document
export interface Activity extends BaseDocument {
  userId: string
  action: string
  timestamp: Timestamp
}

// Interface for Statistics
export interface Statistics {
  totalProjects: number
  totalFreelancers: number
  totalTasksCompleted: number
}

// Type for document updates
export type UpdateData<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>

// Custom hook for Firestore operations
export const useFirestore = () => {
  /**
   * Adds a new document to a specified collection.
   */
  const addDocument = async <T extends BaseDocument>(
    collectionName: string,
    data: Omit<T, 'id'>
  ) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      })
      return docRef
    } catch (error) {
      console.error(`Error adding document to ${collectionName}:`, error)
      throw error
    }
  }

  /**
   * Retrieves a document by ID from a specified collection.
   */
  const getDocument = async <T extends BaseDocument>(
    collectionName: string,
    id: string
  ): Promise<T | null> => {
    try {
      const docRef = doc(db, collectionName, id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T
      }
      console.warn(`No document found with ID: ${id} in ${collectionName}`)
      return null
    } catch (error) {
      console.error(`Error getting document from ${collectionName}:`, error)
      throw error
    }
  }

  /**
   * Retrieves all documents from a specified collection.
   */
  const getAllDocuments = async <T extends BaseDocument>(
    collectionName: string
  ): Promise<T[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName))
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[]
    } catch (error) {
      console.error(`Error getting all documents from ${collectionName}:`, error)
      throw error
    }
  }

  /**
   * Updates a specific document in a collection.
   */
  const updateDocument = async <T extends BaseDocument>(
    collectionName: string,
    id: string,
    data: UpdateData<T>
  ): Promise<void> => {
    try {
      const docRef = doc(db, collectionName, id)
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      })
    } catch (error) {
      console.error(`Error updating document in ${collectionName}:`, error)
      throw error
    }
  }

  /**
   * Deletes a specific document from a collection.
   */
  const deleteDocument = async (collectionName: string, id: string): Promise<void> => {
    try {
      const docRef = doc(db, collectionName, id)
      await deleteDoc(docRef)
    } catch (error) {
      console.error(`Error deleting document from ${collectionName}:`, error)
      throw error
    }
  }

  /**
   * Queries documents from a collection based on provided constraints.
   */
  const queryDocuments = async <T extends BaseDocument>(
    collectionName: string,
    constraints: QueryConstraint[]
  ): Promise<T[]> => {
    try {
      const q = query(collection(db, collectionName), ...constraints)
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[]
    } catch (error) {
      console.error(`Error querying documents from ${collectionName}:`, error)
      throw error
    }
  }

  /**
   * Fetches aggregated statistics from Firestore.
   */
  const getStatistics = async (): Promise<Statistics> => {
    try {
      const [projects, freelancers, tasks] = await Promise.all([
        getAllDocuments('projects'),
        getAllDocuments('users'),
        getAllDocuments('tasks')
      ])

      return {
        totalProjects: projects.length,
        totalFreelancers: freelancers.length,
        totalTasksCompleted: tasks.length
      }
    } catch (error) {
      console.error('Error fetching statistics:', error)
      throw error
    }
  }

  /**
   * Fetches recent activities.
   */
  const getRecentActivities = async (limitNumber = 10): Promise<Activity[]> => {
    try {
      const activities = await queryDocuments<Activity>('activities', [
        orderBy('timestamp', 'desc'),
        firestoreLimit(limitNumber)
      ])
      return activities
    } catch (error) {
      console.error('Error fetching recent activities:', error)
      throw error
    }
  }

  /**
   * Fetches projects with pagination support.
   */
  const getProjectsWithPagination = async <T extends BaseDocument>(
    pageSize = 10,
    lastVisible?: T
  ): Promise<{ projects: T[]; lastVisible: T | null }> => {
    try {
      const constraints: QueryConstraint[] = [
        orderBy('createdAt', 'desc'),
        firestoreLimit(pageSize)
      ]

      if (lastVisible) {
        constraints.push(startAfter(lastVisible.createdAt))
      }

      const projects = await queryDocuments<T>('projects', constraints)
      const newLastVisible = projects.length > 0 ? projects[projects.length - 1] : null

      return { projects, lastVisible: newLastVisible }
    } catch (error) {
      console.error('Error fetching paginated projects:', error)
      throw error
    }
  }

  return {
    addDocument,
    getDocument,
    getAllDocuments,
    updateDocument,
    deleteDocument,
    queryDocuments,
    getStatistics,
    getRecentActivities,
    getProjectsWithPagination
  }
}
