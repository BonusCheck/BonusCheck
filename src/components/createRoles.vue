<template>
	<div class="mainDiv">
    <div  class="header">
	    <ul>
           <li><a v-on:click="$parent.updateView('create-roles')">Create roles</a></li>
           <li><a v-on:click="$parent.updateView('modify-roles')">Modify Roles</a></li>
        </ul>
      </div>  
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
