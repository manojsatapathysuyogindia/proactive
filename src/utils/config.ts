export const config = {
    isDevelopment: import.meta.env.VITE_ENV === 'development',
    isProduction: import.meta.env.VITE_ENV === 'production',
    api: {
      baseUrl: import.meta.env.VITE_API_BASE_URL
    },
    sentryDsn: import.meta.env.VITE_SENTRY_DSN,
    // Add other environment-specific configs here
  };