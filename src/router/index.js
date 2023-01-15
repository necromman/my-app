import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MainComp from '@/components/MainComp.vue'
import LoginView from "@/views/LoginView.vue";
import { store } from "@/store"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: "/login"
    },
    {
      path: "/",
      name: "main",
      meta: {
        auth: true // A protected route
      },
      component: MainComp,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

router.beforeEach((to, from, next) => {    
  if(to.meta.auth && !store.state.token){
    next('/login')
  }    
  else {
    next()
  }    
})

export default router;
