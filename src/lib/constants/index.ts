/**
 * The base URL for the frontend.
 * If the process environment variable BASE_URL is defined, it will be used as the base URL.
 */
export const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

/**
 * The base URL for the backend.
 * If the process environment variable BACKEND_URL is defined, it will be used as the base URL.
 */
export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080'

/**
 * The default region for the app.
 * If the process environment variable DEFAULT_REGION is defined, it will be used as the default region.
 */
export const DEFAULT_REGION = process.env.DEFAULT_REGION || 'us'

/**
 * The Facebook Pixel ID used for tracking events.
 * If not provided in the environment variables, it defaults to null.
 */
export const NEXT_PUBLIC_FACEBOOK_PIXEL_ID =
	process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || null

/**
 * The Google Tag Manager ID used for tracking analytics.
 * If the `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID` environment variable is set, it will be used.
 * Otherwise, it will be set to `null`.
 */
export const GOOGLE_TAG_MANAGER_ID =
	process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || null
