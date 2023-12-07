import { createRouter, createWebHistory } from 'vue-router';
import ToDoApp from './components/ToDo.vue';
import SavedLists from './components/SavedLists.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ToDoApp
  },
  {
    path: '/saved',
    name: 'SavedLists',
    component: SavedLists
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
