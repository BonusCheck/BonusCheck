<template>
	<div>
		<h1>Create Installer Roles</h1>
		<form v-on:submit.prevent="onSubmit" id="form">
			<p>Role name</p>
    		<input type="text" v-model.trim="installer_role_name">
    		<p>Role weight</p>
    		<input type="number" v-model.number="role_weight">
    		<p>Minimum base</p>
    		<input type="number" v-model.number="min_base">
    		<p>Maximum base</p>
    		<input type="number" v-model.number="max_base">
    		<p>Individual bonus</p>
    		<input type="number" v-model.number="individual_bonus">
    		<p>Team bonus</p>
    		<input type="number" v-model.number="team_bonus">
    		<p>Bonus weight</p>
    		<input type="number" v-model.number="bonus_weight">

    		<input type="submit" value="Submit">
    		<p class="hidden" id="confirmation">Role added</p>
		</form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'create-roles',
  props: ['user'],
  data(){
  	return {
  		installer_role_name: '',
  		role_weight: '',
  		min_base: '',
  		max_base: '',
  		individual_bonus: '',
  		team_bonus: '',
  		bonus_weight: ''
  	}
  },
  methods: {
  	onSubmit: function(){
  		axios({
  			method: 'post',
  			url: 'installers/roles/add',
  			data: {
  				created_by_id: this.user.userID,
  				modified_by_id: this.user.userID,
  				installer_role_name: this.installer_role_name,
  				role_weight: this.role_weight,
  				min_base: this.min_base,
  				max_base: this.max_base,
  				individual_bonus: this.individual_bonus,
  				team_bonus: this.team_bonus,
  				bonus_weight: this.bonus_weight
  			}
  		})
  		.then(req => {
  			document.getElementById('confirmation').classList.remove('hidden');
  			this.installer_role_name = '';
  			this.role_weight = '';
  			this.min_base = '';
  			this.max_base = '';
  			this.individual_bonus = '';
  			this.team_bonus = '';
  			this.bonus_weight = '';
  		})
  		.catch(err => {
  			console.log(err);
  		})
  	}
  }
};
</script>
