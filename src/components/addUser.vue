<template>
  <div>
  	<h1>Add User</h1>
    <form v-on:submit.prevent="onSubmit">
      <p>Username</p>
    	<input type="text" name="user_name" v-model="user_name">
      <p>Password</p>
    	<input type="password" name ="password" v-model="password">
    	<input type="submit" value="Submit">
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "add-user",
  props: ["user"],
  data(){
    return {
      user_name: '',
      password: ''
    }
  },
  methods: {
    onSubmit: function(){
      console.log(this.user_name);
      axios({
        method: 'post',
        url: '/users/add',
        data: {
        user_name: this.user_name,
        password: this.password
      }
      })
      .then(req => {
        if(req.data.ok){
          console.log('User added!');
        };
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  beforeMount(){
  	console.log(this);
  }
}; 
</script>
