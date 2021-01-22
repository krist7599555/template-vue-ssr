export const SSR = process.env.SSR === 'true'
export const PROD = process.env.NODE_ENV === 'production'
export const PORT = parseInt(process.env.PORT ?? '3000')
export const HOST = process.env.HOST ?? '0.0.0.0'