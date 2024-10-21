import LessonForm from 'src/pages/LessonForm.vue'
import LessonList from 'src/pages/LessonList.vue'
import LessonView from 'src/pages/LessonView.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/lessons', component: LessonList },
      { path: '/lessons/:id/edit', component: LessonForm, name: "LessonEdit", props: true },
      { path: '/lessons/new', component: LessonForm, name: "LessonNew" },
      { path: '/lessons/:id/view', component: LessonView },
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
