import { route } from 'quasar/wrappers'
import routes from 'src/router/routes'
import { createRouter, createWebHistory } from 'vue-router'

export default route(function () {
  const Router = createRouter({
    history: createWebHistory(),
    routes
  })

  return Router
})
