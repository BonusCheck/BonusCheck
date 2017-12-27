import App from './App';
import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './Home';
import Login from './Login';
import Jobs from './jobs';
import Jobs1 from './Jobpractice';
import Jobs2 from './jobpractice1';
import Jobs3 from './jobpractice2';

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
},
{
	name: 'jobs',
	components: {
		Jobs,
	}
	path: '/jobs',
	data: {
		jobList: ''
	},
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

