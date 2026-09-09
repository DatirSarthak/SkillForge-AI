/**
 * Admin-related frontend type definitions.
 *
 * This file intentionally contains JSDoc typedefs instead of
 * TypeScript types because the project uses JavaScript/JSX.
 */

/**
 * @typedef {"USER" | "ADMIN"} AdminUserRole
 */

/**
 * @typedef {"ACTIVE" | "INACTIVE" | "LOCKED"} AdminUserStatus
 */

/**
 * @typedef {Object} AdminUser
 * @property {number|string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {AdminUserRole} role
 * @property {AdminUserStatus} accountStatus
 * @property {boolean} emailVerified
 * @property {string|null} profileImageUrl
 * @property {string|null} createdAt
 */

/**
 * @typedef {Object} AdminUserDetails
 * @property {number|string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {AdminUserRole} role
 * @property {AdminUserStatus} accountStatus
 * @property {boolean} emailVerified
 * @property {string|null} profileImageUrl
 * @property {string|null} createdAt
 * @property {string|null} updatedAt
 */

/**
 * @typedef {Object} AdminDashboardStats
 * @property {number} totalUsers
 * @property {number} activeUsers
 * @property {number} inactiveUsers
 * @property {number} lockedUsers
 * @property {number} totalAdmins
 * @property {number} totalNotes
 * @property {number} totalQuizzes
 * @property {number} totalRoadmaps
 * @property {number} totalResumeReviews
 * @property {number} totalConversations
 */

/**
 * @typedef {Object} AdminUserFilters
 * @property {number} page
 * @property {number} size
 * @property {string} search
 * @property {string} role
 * @property {string} status
 * @property {string} sortBy
 * @property {"asc" | "desc"} direction
 */

export {};