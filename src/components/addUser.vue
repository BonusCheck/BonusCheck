<template>
  <div class="mainDiv">
   <div  class="header">
    <ul>
           <li><a v-on:click="$parent.updateView('add-user')" style="color:#4bc800">Add User</a></li>
           <li><a v-on:click="$parent.updateView('delete-user')">Delete User</a></li>
           <li v-if="user.roll === 'Admin' || 'Project-Cooridnator'"><a v-on:click="$parent.updateView('modify-project')">Modify project</a></li>
    </ul>
   </div> 
  	<!-- <p class="heading">Add User</p> -->
    <form v-on:submit.prevent="onSubmit">
      <p class="input_heading">Username</p>
    	<input class="inputField" type="text" name="user_name" v-model="user_name">
      <p class="input_heading">Password</p>
    	<input class="inputField" type="password" name ="password" v-model="password">
      <p class="input_heading">User role</p>
      <select class="inputField" v-model="fk_user_role_id" required>
        <option value='' placeholder="Choose a role"></option>
        <option v-for="role in roles" v-bind:value="role.user_role_id">
          {{role.user_role_name}}
        </option>
      </select>

    	<button class="button" type="submit" value="Submit">Add User</button>
      <p style="text-align:center;" class="hidden input_heading" id="confirmation"><img src="/dist/assets/images/yes.png"  alt="Logo">User added successfully.</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "add-user",
  props: ["user"],
  data(){
    return {
      user_name: '',
      password: '',
      fk_user_role_id: '',
      roles: ''
    }
  },
  methods: {
    onSubmit: function(){
      axios({
        method: 'post',
        url: '/users/add',
        data: {
        user_name: this.user_name,
        password: this.password,
        fk_user_role_id: this.fk_user_role_id
      }
      })
      .then(req => {
        if(req.data.ok){
          document.getElementById('confirmation').classList.remove('hidden');
        };
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  beforeMount(){
    axios({
      method: 'get',
      url: '/users/roles'
    })
    .then(req => {
      this.roles = req.data.roles;
      console.log(this.roles);
    })
    .catch(err => {
      console.log(err);
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
form{
  margin-top: 30px;
}

.input_heading{
    color: #afaeb0;
    margin-left: 18px;
    
}

.header{
  border-bottom: 1px solid #ebebeb;
    
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
    width: 20%;
    margin-top: 10px;
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

