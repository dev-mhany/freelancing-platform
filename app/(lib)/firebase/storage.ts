import { storage } from './config'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  UploadTaskSnapshot,
  UploadMetadata,
  StorageError
} from 'firebase/storage'

/**
 * Uploads a file to Firebase Storage.
 * @param path - The storage path where the file will be uploaded.
 * @param file - The file object to upload.
 * @param metadata - Optional metadata for the file.
 * @param onProgress - Optional callback to track upload progress.
 * @returns A promise that resolves with the download URL of the uploaded file.
 */
export const uploadFile = (
  path: string,
  file: File,
  metadata?: UploadMetadata,
  onProgress?: (snapshot: UploadTaskSnapshot) => void
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const storageRef = ref(storage, path)
      const uploadTask = uploadBytesResumable(storageRef, file, metadata)

      uploadTask.on(
        'state_changed',
        snapshot => {
          if (onProgress) {
            onProgress(snapshot)
          }
        },
        (error: StorageError) => {
          console.error('Error uploading file:', error)
          reject(new Error(`Upload failed: ${error.message}`))
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            resolve(downloadURL)
          } catch (error) {
            if (error instanceof Error) {
              console.error('Error getting download URL:', error)
              reject(new Error(`Failed to get download URL: ${error.message}`))
            } else {
              reject(new Error('Unknown error occurred while getting download URL'))
            }
          }
        }
      )
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error in uploadFile function:', error)
        reject(new Error(`Upload initialization failed: ${error.message}`))
      } else {
        reject(new Error('Unknown error occurred during upload initialization'))
      }
    }
  })
}

/**
 * Retrieves the download URL of a file from Firebase Storage.
 * @param path - The storage path of the file.
 * @returns A promise that resolves with the download URL.
 */
export const getFileDownloadURL = async (path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, path)
    const url = await getDownloadURL(storageRef)
    return url
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error getting download URL:', error)
      throw new Error(`Failed to get download URL: ${error.message}`)
    }
    throw new Error('Unknown error occurred while getting download URL')
  }
}

/**
 * Deletes a file from Firebase Storage.
 * @param path - The storage path of the file to delete.
 * @returns A promise that resolves when the deletion is complete.
 */
export const deleteFile = async (path: string): Promise<void> => {
  try {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting file:', error)
      throw new Error(`Failed to delete file: ${error.message}`)
    }
    throw new Error('Unknown error occurred while deleting file')
  }
}
