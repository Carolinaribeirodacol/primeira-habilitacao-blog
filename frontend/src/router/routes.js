import LessonForm from 'src/pages/LessonForm.vue'
import LessonList from 'src/pages/LessonList.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/lessons', component: LessonList },
      // { path: '/lessons/new', component: LessonNew },
      { path: '/lessons/:id/edit', component: LessonForm, name: "LessonEdit", props: true },
      // { path: '/lessons/:id/delete', component: LessonDelete },
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
