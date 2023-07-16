import { createRouter, createWebHashHistory } from 'vue-router'
import TableView from '@/views/TableView.vue'
import BoxView from '@/views/BoxView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'TableView',
      component: TableView
    },
    {
      path: '/boxes',
      name: 'BoxView',
      component: BoxView
    },
    
  ]
})

export default router
