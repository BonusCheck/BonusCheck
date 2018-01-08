<template>
	<div>
		<h1>Delete Roles</h1>
    <form v-on:submit.prevent="onSubmit" id="form">
      <p>Select role to delete</p>
      <select v-model="installer_role_id">
        <option v-for="role in roles" v-bind:value="role.installer_role_id">
          {{role.installer_role_name}}
        </option>
      </select>

      <input type="submit" value="Submit">
      <p class="hidden" id="confirmation">Role deleted</p>
    </form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'delete-roles',
  data(){
  	return {
      installer_role_id: '',
      roles: ''
  	}
  },
  methods: {
    onSubmit: function(){
      axios({
        method: 'delete',
        url: '/installers/roles/delete',
        data: {
          installer_role_id: this.installer_role_id
        }
      })
      .then(req => {
        document.getElementById('confirmation').classList.remove('hidden');
        this.installer_role_id = '';
        this.getData();
      })
      .catch(err => {
        console.log(err);
      })
    },
    getData: function(){
      axios({
        method: 'get',
        url: '/installers/roles'
      })
      .then(req => {
        this.roles = req.data.roles;
        console.log(req.data.roles);
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  beforeMount(){
  	this.getData();
  }
};
</script>