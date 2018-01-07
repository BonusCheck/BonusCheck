<template>
	<div>
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
