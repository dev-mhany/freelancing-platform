import { db } from './config'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Query,
  DocumentData,
  QuerySnapshot,
  WhereFilterOp,
  WithFieldValue
} from 'firebase/firestore'

// Define a type for the document data that matches Firestore's expectations
export type FirestoreData = WithFieldValue<DocumentData>

/**
 * Adds a new document to a specified collection.
 * @param collectionName - The name of the collection.
 * @param data - The data to add.
 * @returns The reference to the newly added document.
 */
export const addDocument = async (collectionName: string, data: FirestoreData) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data)
    return docRef
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error adding document to ${collectionName}:`, error)
    }
    throw error
  }
}

/**
 * Retrieves a single document by its ID from a specified collection.
 * @param collectionName - The name of the collection.
 * @param id - The document ID.
 * @returns The document data or null if not found.
 */
export const getDocument = async (collectionName: string, id: string) => {
  try {
    const docRef = doc(db, collectionName, id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      console.warn(`No document found with ID: ${id} in ${collectionName}`)
      return null
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error getting document from ${collectionName}:`, error)
    }
    throw error
  }
}

/**
 * Retrieves all documents from a specified collection.
 * @param collectionName - The name of the collection.
 * @returns An array of document data.
 */
export const getAllDocuments = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName))
    const documents: DocumentData[] = []
    querySnapshot.forEach(doc => {
      documents.push({ id: doc.id, ...doc.data() })
    })
    return documents
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error getting all documents from ${collectionName}:`, error)
    }
    throw error
  }
}

/**
 * Updates a specific document in a collection.
 * @param collectionName - The name of the collection.
 * @param id - The document ID.
 * @param data - The data to update.
 * @returns A promise that resolves when the update is complete.
 */
export const updateDocument = async (
  collectionName: string,
  id: string,
  data: FirestoreData
) => {
  try {
    const docRef = doc(db, collectionName, id)
    await updateDoc(docRef, data)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error updating document in ${collectionName}:`, error)
    }
    throw error
  }
}

/**
 * Deletes a specific document from a collection.
 * @param collectionName - The name of the collection.
 * @param id - The document ID.
 * @returns A promise that resolves when the deletion is complete.
 */
export const deleteDocument = async (collectionName: string, id: string) => {
  try {
    const docRef = doc(db, collectionName, id)
    await deleteDoc(docRef)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error deleting document from ${collectionName}:`, error)
    }
    throw error
  }
}

/**
 * Type for query conditions
 */
interface QueryCondition {
  field: string
  operator: WhereFilterOp
  value: unknown
}

/**
 * Queries documents from a collection based on specific conditions.
 * @param collectionName - The name of the collection.
 * @param conditions - An array of conditions for the query.
 * @param orderField - The field to order the results by.
 * @param orderDirection - The direction to order the results ('asc' or 'desc').
 * @param limitNumber - The maximum number of documents to retrieve.
 * @returns An array of document data matching the query.
 */
export const queryDocuments = async (
  collectionName: string,
  conditions: QueryCondition[],
  orderField?: string,
  orderDirection: 'asc' | 'desc' = 'asc',
  limitNumber?: number
) => {
  try {
    let q: Query<DocumentData> = collection(db, collectionName)

    // Apply conditions
    conditions.forEach(condition => {
      q = query(q, where(condition.field, condition.operator, condition.value))
    })

    // Apply ordering
    if (orderField) {
      q = query(q, orderBy(orderField, orderDirection))
    }

    // Apply limit
    if (limitNumber) {
      q = query(q, limit(limitNumber))
    }

    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q)
    const documents: DocumentData[] = []
    querySnapshot.forEach(doc => {
      documents.push({ id: doc.id, ...doc.data() })
    })
    return documents
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error querying documents from ${collectionName}:`, error)
    }
    throw error
  }
}
