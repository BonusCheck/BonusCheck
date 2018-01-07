<template>
	<div>
  	<h1>Delete User</h1>
	<form v-on:submit.prevent="onSubmit" id="form">
		<p>Choose user to delete:</p>
		<select v-model="user_id" required>
			<option v-for="user in users" v-bind:value="user.user_id">{{user.user_name}}</option>
		</select>
		<input type="submit" value="Submit">
      	<p class="hidden" id="confirmation">User deleted</p>
	</form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'delete-user',
  data(){
  	return {
  		user_id: '',
  		users: ''
  	}
  },
  methods: {
  	onSubmit: function(){
  		axios({
  			method: 'delete',
  			url: '/users/delete',
        data: {
          user_id: this.user_id
        }
  		})
  		.then(req => {
  			document.getElementById('confirmation').classList.remove('hidden');
        this.user_id = '';
  		})
  		.catch(err => {
  			console.log(err);
  		})
  	}
  },
  beforeMount(){
  	axios({
  		method: 'get',
  		url: '/users'
  	})
  	.then(req => {
  		this.users = req.data.users;
  	})
  	.catch(err => {
  		console.log(err);
  	})
  }
};
</script>
