<template>
	<div class="mainDiv">
    <div  class="header">
	    <ul>
           <li><a v-on:click="$parent.updateView('create-roles')" style="color:#4bc800">Create roles</a></li>
           <li><a v-on:click="$parent.updateView('modify-roles')">Modify Roles</a></li>
            <li><a v-on:click="$parent.updateView('view-roles')">View Roles</a></li>

        </ul>
      </div>  
		<p class="heading">Create Installer Roles</p>
		<form v-on:submit.prevent="onSubmit" id="form">
      <div class="row">
          <div class="col-md-6">
        			  <p class="input_heading">Role name</p>
            		<input  class="inputField" type="text" v-model.trim="installer_role_name">
          </div>
          <div class="col-md-6">
            		<p class="input_heading">Role weight</p>
            		<input  class="inputField" type="number" v-model.number="role_weight">
          </div>
      </div> 
      <div class="row"> 
          <div class="col-md-6">
            		<p class="input_heading">Minimum base</p>
            		<input  class="inputField" type="number" step="0.01" v-model.number="min_base">
          </div>
          <div class="col-md-6">      
            		<p class="input_heading">Maximum base</p>
            		<input  class="inputField" type="number" step="0.01" v-model.number="max_base">
          </div>
      </div>
      <div class="row">    
          <div class="col-md-6">      
            		<p class="input_heading">Individual bonus</p>
            		<input  class="inputField" type="number" step="0.01" v-model.number="individual_bonus">
          </div>
          <div class="col-md-6">
            		<p class="input_heading">Team bonus</p>
            		<input  class="inputField" type="number" step="0.01" v-model.number="team_bonus">
          </div>
      </div>
      <div class="row">    
          <div class="col-md-6">
            		<p class="input_heading">Bonus weight</p>
            		<input  class="inputField" type="number" step="0.01" v-model.number="bonus_weight">
          </div>
      </div>    
            		<button class="button" type="submit" value="Submit">Create</button>
            		<p style="text-align:center;" class="hidden input_heading" id="confirmation"><img src="/dist/assets/images/yes.png"  alt="Logo">Role added</p>
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
     margin-top: 7%;
     margin-right: 7%;
     margin-left: 18%;
     box-shadow: 0 5px 25px hsla(0,0%,10%,.7);
     height: 25%;
     background-color: #fff;
     font-size: 16px;
     padding: 20px;

}
.heading{
    color: #afaeb0;
    text-align: center;
    line-height: 3.5;
    font-size: 18px;

}
form{
  margin-top: 30px;
}
.header{
  border-bottom: 1px solid #ebebeb;
    
}
.input_heading{
    color: #afaeb0;
    margin-left: 18px;
    
 }   
.inputField{
    background-color: #fff;
    border: 0;
    box-shadow: 0 1px 5px hsla(0,0%,20%,.5);
    color: #222;
    display: block;
    font-size: 14px;
    margin: 15px;
    padding: 12px 18px 12px;
    width: 97%;
}
.inputField:focus{
  outline: none;
}
.button:focus{
  outline-color:  #4bc800;

}
.button{
    background: #4bc800!important;
    border: 0;
    box-shadow: inset 0 -2px 0 #45b900!important;
    color: #fff;
    font-size: 17px;
    font-weight: bold;
    margin: 15px;
    padding: 12px 18px 12px;
    margin-top: 10px;
    width: 15%;
}
.inputField{
    background-color: #fff;
    border: 0;
    box-shadow: 0 1px 5px hsla(0,0%,20%,.5);
    color: #222;
    display: block;
    font-size: 14px;
    margin: 15px;
    padding: 8px 18px 8px;
    width: 97%;
}
.inputField:focus{
  outline: none;
}
.button:focus{
  outline-color:  #4bc800;

}
ul{
  list-style-type:none;
  display: flex;
  justify-content: center;
}
li{
    padding-left: 6%;
    padding-right: 6%;
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
