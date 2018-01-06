<template>
  <div>
    <h1>Add Installer</h1>
    <form v-on:submit.prevent="onSubmit" id="form">
      <input type="text" name="first_name" placeholder="First name" v-model.trim="first_name" required>
      <input type="text" name="last_name" placeholder="Last name" v-model.trim="last_name" required>
      <input type="number" name="current_wage" placeholder="Current wage" v-model.number.trim="current_wage" required>
      <select name="fk_installer_role_id" placeholder="Role" v-model.number.trim="fk_installer_role_id" required>
        <option value=2001>Installer</option>
        <option value="Project Coordinator">Project Coordinator</option>
        <option value="Project Manager">Project Manager</option>
        <option value="Admin">Admin</option>
      </select>
      <select v-model="fk_user_id" placeholder="Select user">
        <option v-for="user in users" v-bind:value="user.user_id">{{user.user_name}}</option>
      </select>
      <input type="submit" value="Submit">
      <p class="hidden" id="confirmation">Added</p>
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
      users: ''
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
        document.getElementById('confirmation').innerHTML = this.first_name + ' added';
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
      console.log(this.users);
    })
    .catch(err => {
      console.log(err);
    })
  }
}; 
</script>
