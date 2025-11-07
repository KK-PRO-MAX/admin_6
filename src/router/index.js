/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from '../pages/Home.vue'
import Account from '../pages/home_all/Account.vue' // 已正确导入
import Notifications from '../pages/Notifications/Notifications.vue' // 已正确导入
import add_account_management from '../pages/home_all/add_account_management.vue' // 已正确导入
import devices from '../pages/devices/devices.vue' // 已正确导入
import devices_edit from '../pages/devices/devices_edit.vue' // 已正确导入
import devices_types from '../pages/devices/devices_types.vue' // 已正确导入
import Device_Groups from '../pages/Device_Groups/Device_Groups.vue' // 已正确导入
import Device_Groups_add from '../pages/Device_Groups/Device_Groups_add.vue' // 已正确导入
import lockers from '../pages/lockers/lockers.vue' // 已正确导入
import lockers_all from '../pages/lockers/lockers_all.vue' // 已正确导入
import Users_1 from '../pages/users/Users_1.vue' // 已正确导入
import Users_all from '../pages/users/Users_all.vue' // 已正确导入
import BayManagement_1 from '../pages/BayManagement/BayManagement_1.vue' // 已正确导入
import Bay_Recent_Activities from '../pages/BayManagement/Bay_Recent_Activities.vue' // 已正确导入
import login_index from '../pages/login/login_index.vue' // 已正确导入


Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
      path: '/home',
      component: Home,
      children: [
        
      ]
    },
   
    // 修改这里：将redirect改为直接映射到Account组件
    {
      path: '/Notifications',
      component: Notifications // 关键修改：使用组件而不是重定向
    },
    {
      path: '/Account',
      component: Account // 关键修改：使用组件而不是重定向
    },
    {
      path: '/add_account_management',
      component: add_account_management // 关键修改：使用组件而不是重定向
    },
     {
       path: '/devices',
       component: devices,
       meta: {
         showExtraMenus: true
       } // 添加元信息，标识需要显示额外菜单
     },
    {
      path: '/devices_edit',
      component: devices_edit // 关键修改：使用组件而不是重定向
    },
    {
      path: '/devices_types',
      component: devices_types // 关键修改：使用组件而不是重定向
    },
    {
      path: '/Device_Groups',
      component: Device_Groups // 关键修改：使用组件而不是重定向
    },
    {
      path: '/Device_Groups_add',
      component: Device_Groups_add // 关键修改：使用组件而不是重定向
    },
    {
      path: '/lockers',
      component: lockers // 关键修改：使用组件而不是重定向
    },
    {
      path: '/lockers_all',
      component: lockers_all // 关键修改：使用组件而不是重定向
    },
    {
      path: '/Users_1',
      component: Users_1 // 关键修改：使用组件而不是重定向
    },
    {
      path: '/Users_all',
      component: Users_all // 关键修改：使用组件而不是重定向
    },
    {
      path: '/BayManagement_1',
      component: BayManagement_1 // 关键修改：使用组件而不是重定向
    },
    {
      path: '/Bay_Recent_Activities',
      component: Bay_Recent_Activities // 关键修改：使用组件而不是重定向
    },
    {
      path: '/login_index',
      component: login_index // 关键修改：使用组件而不是重定向
    }
  ]
})