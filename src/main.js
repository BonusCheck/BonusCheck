import App from './App';
import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './Home';
import Login from './Login';
import Jobs from './jobs';

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
	component: Jobs,
	path: '/jobs',
}
];

const router = new VueRouter({
	mode: 'history',
	routes
});

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  el: '#app',
  template: '<App/>'
});

new Vue({
		component: 'job-info',
	    props: ['job'],
	    template: '<li>{{job.text}}</li>'
	})

	var job = new Vue({
		el: '#job',
		data: {
			jobList: [
				{id: 0, text: 'Blow Me' },
				{id: 1, text: 'Bathe me' }
			]
		}
	})