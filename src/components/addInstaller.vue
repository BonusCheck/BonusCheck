<template>
  <div class="mainDiv">
      <div  class="header">
         <ul>
            <li><a v-on:click="$parent.updateView('add-installer')"  style="color:#4bc800">Add installer</a></li>
            <li><a v-on:click="$parent.updateView('view-installer')"  >View installer</a></li>
            <li><a v-on:click="$parent.updateView('modify-installer')"  >Modify installer</a></li>
          </ul>
      </div>
   
          
          <form v-on:submit.prevent="onSubmit" id="form">
            <p class="input_heading">First Name</p>
            <input class="inputField" type="text" name="first_name" placeholder="First name" v-model.trim="first_name" required>
            <p class="input_heading">Last Name</p>
            <input class="inputField" type="text" name="last_name" placeholder="Last name" v-model.trim="last_name" required>
            <p class="input_heading">Current wage</p>
            <input class="inputField" type="number" name="current_wage" placeholder="Current wage" v-model.number="current_wage" required>
            <p class="input_heading">Installer Role Name</p>
            <select class="dropdown" v-model.number="fk_installer_role_id" required>
              <option class="option" v-for="role in roles" v-bind:value="role.installer_role_id">{{role.installer_role_name}}</option>
            </select>
            <p class="input_heading">User Name</p>
            <select class="dropdown" v-model="fk_user_id" required>
              <option class="option" v-for="user in users" v-bind:value="user.user_id">{{user.user_name}}</option>
            </select>
            <button class="button " type="submit" value="Submit">Submit</button>
            <p style="text-align:center;" class="hidden input_heading" id="confirmation"><img src="/dist/assets/images/yes.png"  alt="Logo">installer added successfully.</p>
          </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "add-installer",
  props: ["user"],
  data(){
    return {
      first_name: '',
      last_name: '',
      current_wage: '',
      fk_installer_role_id: '',
      fk_user_id: '',
      users: '',
      roles: ''
    }
  },
  methods: {
    onSubmit: function(){
      axios({
        method: 'post',
        url: '/installers/add',
        data: {
          created_by_id: this.user.userID,
          modified_by_id: this.user.userID,
          first_name: this.first_name,
          last_name: this.last_name,
          current_wage: this.current_wage,
          fk_installer_role_id: this.fk_installer_role_id,
          fk_user_id: this.fk_user_id
        }
      })
      .then(req => {
        console.log(req.data);
        // document.getElementById('confirmation').innerHTML = this.first_name + ' added';
        document.getElementById('confirmation').classList.remove('hidden');
        this.first_name = '',
        this.last_name = '',
        this.current_wage = '',
        this.fk_installer_role_id = '',
        this.fk_user_id = '';
      })
      .catch(err => {
        console.log(err);
      })
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

    //Get role list
    axios({
      method: 'get',
      url: '/installers/roles'
    })
    .then(req => {
      this.roles = req.data.roles;
    })
    .catch(err => {
      console.log(err);
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
     
     background-color: #fff;
     font-size: 16px;
     padding: 20px;

}
form{
  margin-top: 30px;
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
.dropdown{
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
.dropdown:focus{

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
    width: 20%;
    margin-top: 10px;
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
    padding-left: 7%;
    padding-right: 8%;
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
