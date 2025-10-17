// MIDDLEWARE COMPLETELY DISABLED
// Authentication is handled directly in components
export default defineNuxtRouteMiddleware(async (to) => {
  // Do nothing - completely skip middleware
  return
})
