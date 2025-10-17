export default defineEventHandler(async (event) => {
  return {
    success: true,
    message: 'Server is working!',
    timestamp: new Date().toISOString()
  }
})
