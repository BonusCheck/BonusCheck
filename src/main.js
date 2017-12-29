import App from './App';
import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './Home';
import Login from './Login';
import Dash from './Dash';
import Joblist from './joblist'

Vue.use(VueRouter);

const routes = [
{
	name: 'home',
	component: Home,
	path: '/',
	alias: '/home'
},
{
	name: 'login',
	component: Login,
	path: '/login',
	meta: {auth: true}
},
{
	name: 'dash',
	component: Dash,
	path: '/dash'
},
{
	name: 'joblist',
	component: Joblist,
	path: '/jobs'
}
];

const router = new VueRouter({
	mode: 'history',
	routes
});

/* eslint-disable no-new */
new Vue({
  components: {
    App,
  },
  router,
  el: '#app',
  template: '<App/>'
});

