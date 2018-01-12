<template>
  <div class="mainDiv">
    <div  class="header">
      <ul>
           <li><a v-on:click="$parent.updateView('create-roles')">Create roles</a></li>
           <li><a v-on:click="$parent.updateView('modify-roles')" style="color:#4bc800">Modify Roles</a></li>
            <li><a v-on:click="$parent.updateView('view-roles')">View Roles</a></li>

        </ul>
      </div>  
            <p class="input_heading">Select Role to modify</p>
            <select class="inputField" v-model="role_id">
              <option v-for="role in roles" v-bind:value="role.installer_role_id">
                {{role.installer_role_name}}
              </option>
            </select>
            
            <form v-if="selectedRole.installer_role_id" v-on:submit.prevent="onSubmit">              
                    <input class="inputField" type ="hidden" v-model="selectedRole.installer_role_id">
                    <p class="input_heading">Role name</p>
                    <input class="inputField" type="text" v-model.trim="selectedRole.installer_role_name" required>
                    <p class="input_heading">Role weight</p>
                    <input class="inputField" type="text" v-model.number="selectedRole.role_weight" required>
                    <p class="input_heading">Minimum base</p>
                    <input class="inputField" type="text" v-model.number="selectedRole.min_base" required>
                    <p class="input_heading">Maximum base</p>
                    <input class="inputField" type="text" v-model.number="selectedRole.max_base" required>
                    <p class="input_heading">Individual bonus</p>
                    <input class="inputField" type="text" v-model.number="selectedRole.individual_bonus" required>
                    <p class="input_heading">Team bonus</p>
                    <input class="inputField" type="text" v-model.number="selectedRole.team_bonus" required>
                    <p class="input_heading">Bonus weight</p>
                    <input class="inputField" type="text" v-model.number="selectedRole.bonus_weight" required>
                    <button class="button" type="submit" value="Submit">Update</button>
                    <p style="text-align:center;" class="hidden input_heading" id="confirmation"><img src="/dist/assets/images/yes.png"  alt="Logo">Installer updated successfully.</p>
            </form>    
         
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'modify-roles',
  data(){
    return {
      role_id: '',
      roles: '',
      selectedRole: {}
  	}
  },
  methods: {
    onSubmit: function(){
      axios({
        method: 'put',
        url: 'installers/roles/update',
        data: {
          installer_role_id: this.selectedRole.installer_role_id,
          installer_role_name: this.selectedRole.installer_role_name,
          role_weight: this.selectedRole.role_weight,
          min_base: this.selectedRole.min_base,
          max_base: this.selectedRole.max_base,
          individual_bonus: this.selectedRole.individual_bonus,
          team_bonus: this.selectedRole.team_bonus,
          bonus_weight: this.selectedRole.bonus_weight
        }
      })
      .then(req => {
        if(req.status===200){
          $('.inputField').val('');
        document.getElementById('confirmation').classList.remove('hidden');
      };
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  watch: {
    role_id(id) {
      [this.selectedRole] = this.roles.filter(r => r.installer_role_id === id);
    }
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
     margin-left: 12%;
     margin-top: 5%;
     margin-right: 5%;
     box-shadow: 0 5px 25px hsla(0,0%,10%,.7);
     
     background-color: #fff;
     font-size: 16px;
     padding: 20px;

}

.header{
  border-bottom: 1px solid #ebebeb;
    
}


form{
  margin-top: 30px;
}
.inputField{
    background-color: #fff;
    font-family: Open Sans,Arial,sans-serif;
    line-height: normal!important;
    border: 0;
    box-shadow: 0 1px 5px hsla(0,0%,20%,.5);
    color: #222;
    display: block;
    font-size: 14px;
    margin: 0;
    padding: 12px 18px 11px;
    width: 100%;
}
.inputField:focus{
  outline: none;
}
.input_heading{
    color: #afaeb0;
    
    margin-top: 30px;
    
    
   

}
.button{
    color: #fff;
    background: #4bc800!important;
    border: 0;
    box-shadow: inset 0 -2px 0 #45b900!important;
    padding: 9px;
    margin-top: 20px;
   

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
    padding-bottom: 2%;
    padding-top: 2%;
    text-align: center;
    border-bottom: 3px solid transparent;
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
