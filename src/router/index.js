import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import User from '@/components/User'
import Welcome from '@/components/Welcome'
import Home from '@/components/Home'
import Right from '@/components/Right'
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld,
      redirect: '/User',
      children:[
        {
          path: '/User',
          component: User
        },
        {
          path: '/Home',
          component: Home
        },  
        {
          path: '/Welcome',
          component: Welcome
        },
        {
          path: '/Right',
          component: Right
        } 
      ]
    }
    
  ]
})
