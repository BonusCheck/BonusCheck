import App from './App';
import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Dash from './Dash';
import jQuery from 'jquery';
global.jQuery= jQuery;
let Bootstrap = require('bootstrap');
/*import 'bootstrap/dist/css/bootstrap.css';*/

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
	path: '/login'
},
{
    name: 'signup',
	component: Signup,
	path: '/signup'
},
{
	name: 'dash',
	component: Dash,
	path: '/dash'
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