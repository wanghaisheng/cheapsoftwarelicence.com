export default defineNuxtRouteMiddleware(async (to, from) => {
    const { getSession } = useAuth()
    const session = await getSession()
   
       if (to.path.includes('confirm-email') && session?.user?.email ) {
        return navigateTo('/')
      }
  })