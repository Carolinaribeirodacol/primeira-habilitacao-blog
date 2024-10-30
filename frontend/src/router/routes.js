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
        component: () => import('src/pages/LessonsList.vue'),
        name: 'LessonsList'
      },
      {
        path: '/lessons/:id/edit',
        component: () => import('src/pages/LessonsForm.vue'),
        name: 'LessonsEdit'
      },
      {
        path: '/lessons/new',
        component: () => import('src/pages/LessonsForm.vue'),
        name: 'LessonsNew'
      },
      {
        path: '/lessons/:id/view',
        component: () => import('src/pages/LessonsSingle.vue'),
        name: 'LessonsSingle'
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
