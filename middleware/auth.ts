export default defineNuxtRouteMiddleware(async (to, from) => {
    const { getSession } = useAuth()
    const session = await getSession()
    
    if (to.path.includes("account") && !session.user?.email ) {
      return navigateTo('/')
    }
  })