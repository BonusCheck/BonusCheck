<template>
	<div class="mainDiv">
    <div  class="header">
	    <ul>
           <li><a v-on:click="$parent.updateView('create-roles')">Create roles</a></li>
           <li><a v-on:click="$parent.updateView('modify-roles')">Modify Roles</a></li>
        </ul>
      </div>  
		<h1>Modify Roles</h1>
    <p>Select role to modify</p>
    <select v-model="role_id">
      <option v-for="role in roles" v-bind:value="role.installer_role_id">
        {{role.installer_role_name}}
      </option>
    </select>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'modify-roles',
  data(){
  	return {
      role_id: '',
      roles: ''
  	}
  },
  methods: {

  },
  beforeMount(){
  	axios({
  		method: 'get',
  		url: '/installers/roles'
  	})
  	.then(req => {
      this.roles = req.data.roles;
      console.log(req.data.roles);
  	})
  	.catch(err => {
  		
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
  font-weight: bold;
}
</style>
