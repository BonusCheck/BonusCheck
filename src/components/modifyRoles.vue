<template>
  <div class="mainDiv">
    <div  class="header">
      <ul>
           <li><a v-on:click="$parent.updateView('create-roles')">Create roles</a></li>
           <li><a v-on:click="$parent.updateView('modify-roles')" style="color:#4bc800">Modify Roles</a></li>
            <li><a v-on:click="$parent.updateView('view-roles')">View Roles</a></li>

        </ul>
      </div>  
    <div class="row">
        <div class="col-md-10">
            <select class="input" v-model="role_id">
              <option v-for="role in roles" v-bind:value="role.installer_role_id">
                {{role.installer_role_name}}
              </option>
            </select>
        </div>    
    </div>        
    <div class="row"> 
        <div class="col-md-12"> 
            <p class="paragraph">Select role to modify</p>
            <form v-if="selectedRole.installer_role_id" v-on:submit.prevent="onSubmit">
              <p>Role name</p>
              <input type ="hidden" v-model="selectedRole.installer_role_id">
              <input type="text" v-model.trim="selectedRole.installer_role_name" required>
              <p>Role weight</p>
              <input type="number" v-model.number="selectedRole.role_weight" required>
              <p>Minimum base</p>
              <input type="number" step="0.01" v-model.number="selectedRole.min_base" required>
              <p>Maximum base</p>
              <input type="number" step="0.01" v-model.number="selectedRole.max_base" required>
              <p>Individual bonus</p>
              <input type="number" step="0.01" v-model.number="selectedRole.individual_bonus" required>
              <p>Team bonus</p>
              <input type="number" step="0.01" v-model.number="selectedRole.team_bonus" required>
              <p>Bonus weight</p>
              <input type="number" step="0.01" v-model.number="selectedRole.bonus_weight" required>
              <button class="button" type="submit" value="Submit">Create</button>
            </form>    
        </div>  
     </div> 
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
        console.log(req);
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
     margin-top: 7%;
     margin-right: 7%;
     margin-left: 18%;
     box-shadow: 0 5px 25px hsla(0,0%,10%,.7);
     height: 25%;
     background-color: #fff;
     font-size: 16px;
     padding: 20px;

}

.header{
  border-bottom: 1px solid #ebebeb;
    
}
.paragraph{
    margin-top: 40px;
    color: #afaeb0;
    text-align: center;
    line-height: 1.5;
    font-weight: bold;
    font-size: 17px;
}
.input:focus{
  outline: none;
}
.input{
    background-color: #fff;
    border: 0;
    box-shadow: 0 1px 5px hsla(0,0%,20%,.5);
    color: #222;
    display: block;
    font-size: 14px;
    margin: 15px;
    padding: 12px 18px 12px;
    width: 100%;
    margin-left: 70px;
    margin-top: 40px;
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
