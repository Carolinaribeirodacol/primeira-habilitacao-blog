import PostList from 'pages/PostList.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  { path: '/posts', component: PostList },
  // { path: '/posts/new', component: PostNew },
  // { path: '/posts/:id/edit', component: PostEdit },
  // { path: '/posts/:id/delete', component: PostDelete },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
