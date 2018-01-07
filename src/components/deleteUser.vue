<template>
	<div class="mainDiv">
     <div  class="header">
         <ul>
           <li><a v-on:click="$parent.updateView('add-user')">Add User</a></li>
           <li><a v-on:click="$parent.updateView('delete-user')">Delete User</a></li>
        </ul>
        </div>
  	    <h1>Delete User</h1>
      	<form v-on:submit.prevent="onSubmit" id="form">
      		<p>Choose user to delete:</p>
      		<select v-model="fk_user_id" required>
      			<option v-for="user in users" v-bind:value="user.user_id">{{user.user_name}}</option>
      		</select>
      		<input type="submit" value="Submit">
            	<p class="hidden" id="confirmation">Added</p>
      	</form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'delete-user',
  data(){
  	return {
  		fk_user_id: '',
  		users: ''
  	}
  },
  methods: {
  	onSubmit: function(){
  		
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
<style scoped>

.mainDiv{
     margin:90px 50px 0 200px;
     box-shadow: 0 5px 25px hsla(0,0%,10%,.7);
     height: 25%;
     background-color: #fff;
     font-size: 16px;
     padding: 20px;

}

.header{
  border-bottom: 1px solid #ebebeb;
    
}
ul{
  list-style-type:none;
  display: flex;
  justify-content: center;
}
li{
      padding: 0 90px;
    line-height: 4;
    border-bottom: 3px solid transparent;
    margin-bottom: -10px;
}
li:active{
  border-color:#4bc800; 
}

li:hover{
  border-color: #929292;
}
a{
  color: #adadad;
  text-decoration: none;
}
</style>

