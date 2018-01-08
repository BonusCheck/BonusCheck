<template>
	<div class="mainDiv">
    <div  class="header">
	    <ul>
           <li><a v-on:click="$parent.updateView('create-roles')">Create roles</a></li>
           <li><a v-on:click="$parent.updateView('modify-roles')" style="color:#4bc800">Modify Roles</a></li>
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
      roles: ''
  	}
  },
  methods: {

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
     margin:90px 150px 0 300px;
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
