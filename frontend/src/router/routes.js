const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'IndexPage'
      },
      {
        path: '/lessons',
        component: () => import('src/pages/LessonList.vue'),
        name: 'LessonList'
      },
      {
        path: '/lessons/:id/edit',
        component: () => import('src/pages/LessonForm.vue'),
        name: 'LessonEdit'
      },
      {
        path: '/lessons/new',
        component: () => import('src/pages/LessonForm.vue'),
        name: 'LessonNew'
      },
      {
        path: '/lessons/:id/view',
        component: () => import('src/pages/LessonView.vue'),
        name: 'LessonView'
      },
      {
        path: '/contact',
        component: () => import('src/pages/Contact.vue'),
        name: 'Contact'
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
