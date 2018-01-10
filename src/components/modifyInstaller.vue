<template>
  <div class="mainDiv">
      <div  class="header">
         <ul>
            <li><a v-on:click="$parent.updateView('add-installer')"  >Add installer</a></li>
            <li><a v-on:click="$parent.updateView('view-installer')"  >View installer</a></li>
            <li><a v-on:click="$parent.updateView('modify-installer')" style="color:#4bc800"  >Modify installer</a></li>
            
          </ul>
      </div>
       <h1>Modify installer</h1>
        <p class="input_heading">Select installer to modify</p>
              <select class="inputField" v-model="installer_id">
                <option v-for="installer in installers" v-bind:value="installer.installer_id">
                  {{installer.first_name}} {{installer.last_name}}
                </option>
              </select>

              <form v-if="selectedRole.installer_id" v-on:submit.prevent="onSubmit">
                <input class="inputField" type="hidden" v-model="selectedRole.installer_id">
                <p class="input_heading">Installer name</p>
                <input class="inputField" type="text" v-model.trim="selectedRole.first_name" required>
                <p class="input_heading">Installer lastName</p>
                <input class="inputField" type="text" v-model.trim="selectedRole.last_name" required>
                <button class="button" type="submit" value="Submit">Update</button>
                <p style="text-align:center;" class="hidden input_heading" id="confirmation"><img src="/dist/assets/images/yes.png"  alt="Logo">Installer updated successfully.</p>
              </form>
  </div>
 
</template>
<script>
import axios from 'axios';

export default {
  name: 'modify-installer',
  props: ['user'],
  data(){
    return {
      installer_id: '',
      installers: '',
      selectedRole: {}
    }
  },
  methods: {
    onSubmit: function(){
      axios({
        method: 'put',
        url: 'installers/update',
        data: {
          installer_id: this.selectedRole.installer_id,
          first_name: this.selectedRole.first_name,
          last_name: this.selectedRole.last_name,
          modified_by_id: this.user.userID
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
    installer_id(id) {
      [this.selectedRole] = this.installers.filter(r => r.installer_id === id);
    }
  },
  beforeMount(){
    axios({
      method: 'get',
      url: '/installers'
    })
    .then(req => {
      this.installers = req.data.installers;
      console.log(this.installers);
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
     height: 25%;
     background-color: #fff;
     font-size: 16px;
     padding: 20px;

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
.header{
  border-bottom: 1px solid #ebebeb;
    
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
