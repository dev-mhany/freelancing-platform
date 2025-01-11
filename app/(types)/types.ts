// app/(types)/types.ts

import { Timestamp } from 'firebase/firestore'

/* =========================
   1. Authentication Types
   ========================= */

/**
 * Defines the roles available within the platform.
 */
export type UserRole = 'admin' | 'user'

/**
 * Represents an authenticated user.
 */
export interface AuthUser {
  uid: string
  email: string
  displayName: string
  role: UserRole
  photoURL?: string
}

/**
 * Defines the structure of the authentication context.
 */
export interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithLinkedIn: () => Promise<void>
  signOut: () => Promise<void>
}

/* =========================
   2. User Profile Types
   ========================= */

/**
 * Represents the social links of a user.
 */
export interface SocialLinks {
  linkedin?: string
  github?: string
  twitter?: string
  website?: string
}

/**
 * Defines the structure of a user's profile.
 */
export interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: UserRole
  skills: string[]
  portfolio: string[]
  socialLinks?: SocialLinks
  createdAt: Timestamp
}

/* =========================
   3. Attachment Types
   ========================= */

/**
 * Enumerates the possible attachment types.
 */
export type AttachmentType = 'image' | 'document' | 'video' | 'other'

/**
 * Represents an attachment associated with various entities.
 */
export interface Attachment {
  id: string
  url: string // URL to the stored file
  fileName: string
  fileType: AttachmentType
  uploadedAt: Timestamp
  uploadedBy: string // UID of the user who uploaded the attachment
}

/* =========================
   4. Project Types
   ========================= */

/**
 * Enumerates the possible statuses of a project.
 */
export type ProjectStatus = 'open' | 'closed' | 'in-progress' | 'completed'

/**
 * Represents a project listed on the platform.
 */
export interface Project {
  id: string
  title: string
  description: string
  budget: number
  status: ProjectStatus
  createdBy: string // UID of the user who created the project
  createdAt: Timestamp
  deadline: Timestamp
  category?: string
  tags?: string[]
  attachments: Attachment[] // Attachments related to the project
}

/* =========================
   5. Application Types
   ========================= */

/**
 * Enumerates the possible statuses of an application.
 */
export type ApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'under-review'

/**
 * Represents an application submitted by a user for a project.
 */
export interface Application {
  id: string
  projectId: string
  userId: string
  proposal: string
  attachments: Attachment[] // Attachments related to the application
  status: ApplicationStatus
  submittedAt: Timestamp
}

/* =========================
   6. Message Types
   ========================= */

/**
 * Represents a message exchanged between users and admins.
 */
export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  attachments: Attachment[] // Attachments related to the message
  readAt: Timestamp | null
  createdAt: Timestamp
}

/* =========================
   7. Comment Types
   ========================= */

/**
 * Enumerates the possible statuses of a comment.
 */
export type CommentStatus = 'visible' | 'hidden' | 'flagged'

/**
 * Represents a comment made on a project or application.
 */
export interface Comment {
  id: string
  entityId: string // ID of the project or application the comment is associated with
  authorId: string // UID of the user who made the comment
  content: string
  attachments: Attachment[] // Attachments related to the comment
  status: CommentStatus
  createdAt: Timestamp
  updatedAt?: Timestamp
}

/* =========================
   8. Notification Types
   ========================= */

/**
 * Enumerates the possible types of notifications.
 */
export type NotificationType = 'message' | 'application' | 'project' | 'system'

/**
 * Represents the structure of a notification.
 */
export interface Notification {
  id: string
  userId: string
  type: NotificationType
  message: string
  read: boolean
  createdAt: Timestamp
}

/* =========================
   9. User Settings Types
   ========================= */

/**
 * Enumerates the available theme options.
 */
export type ThemeOption = 'light' | 'dark' | 'system'

/**
 * Represents a user's notification preferences.
 */
export interface NotificationPreferences {
  emailNotifications: boolean
  pushNotifications: boolean
  smsNotifications?: boolean
}

/**
 * Defines the structure for user settings.
 */
export interface UserSettings {
  userId: string
  notificationPreferences: NotificationPreferences
  theme: ThemeOption
}

/* =========================
   10. Admin Types
   ========================= */

/**
 * Represents an admin's dashboard statistics.
 */
export interface AdminDashboardStats {
  totalUsers: number
  totalProjects: number
  totalApplications: number
  activeProjects: number
  pendingApplications: number
}

/**
 * Defines the structure for admin-specific functionalities.
 */
export interface AdminControls {
  createProject: (project: Project) => Promise<void>
  updateProject: (projectId: string, updates: Partial<Project>) => Promise<void>
  deleteProject: (projectId: string) => Promise<void>
  manageUsers: (userId: string, role: UserRole) => Promise<void>
  moderateComments: (commentId: string, status: CommentStatus) => Promise<void>
}

/* =========================
   11. Common Types
   ========================= */

/**
 * Defines pagination options for queries.
 */
export interface PaginationOptions {
  page: number
  limit: number
}

/**
 * Standardizes the structure of API responses.
 */
export interface Response<T> {
  data: T
  error?: string
}

/* =========================
   12. Utility Types
   ========================= */

/**
 * Represents a generic key-value pair.
 */
export interface KeyValuePair<K, V> {
  key: K
  value: V
}

/**
 * Defines the structure for error handling.
 */
export interface AppError {
  code: string
  message: string
}

/* =========================
   13. Form Types
   ========================= */

/**
 * Represents the structure of a project creation form.
 */
export interface ProjectFormData {
  title: string
  description: string
  budget: number
  deadline: Date
  category?: string
  tags?: string[]
  attachments: File[] // Files to be uploaded as attachments
}

/**
 * Represents the structure of an application submission form.
 */
export interface ApplicationFormData {
  proposal: string
  attachments: File[] // Files to be uploaded as attachments
}

/**
 * Represents the structure of a comment submission form.
 */
export interface CommentFormData {
  content: string
  attachments: File[] // Files to be uploaded as attachments
}

/**
 * Represents the structure of a user profile editing form.
 */
export interface UserProfileFormData {
  displayName: string
  skills: string[]
  portfolio: string[]
  socialLinks?: SocialLinks
}

/* =========================
   14. Search and Filter Types
   ========================= */

/**
 * Represents the structure of search and filter criteria.
 */
export interface SearchFilter {
  keyword?: string
  category?: string
  budgetRange?: [number, number]
  deadlineBefore?: Date
  deadlineAfter?: Date
  tags?: string[]
}

/* =========================
   15. Activity Types
   ========================= */

/**
 * Enumerates the types of user activities.
 */
export type ActivityType =
  | 'login'
  | 'logout'
  | 'create_project'
  | 'apply_project'
  | 'comment'
  | 'update_profile'

/**
 * Represents a user activity log.
 */
export interface Activity {
  id: string
  userId: string
  type: ActivityType
  description: string
  createdAt: Timestamp
}
