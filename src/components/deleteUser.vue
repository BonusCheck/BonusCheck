<template>
	      <div class="mainDiv">
                  <div  class="header">
                     <ul>
                       <li><a v-on:click="$parent.updateView('add-user')">Add User</a></li>
                       <li><a v-on:click="$parent.updateView('delete-user')" style="color:#4bc800">Delete User</a></li>
                    </ul>
                  </div>
  	        <!-- <h1>Delete User</h1>
                	<form v-on:submit.prevent="onSubmit" id="form">
                		<p>Choose user to delete:</p>
                		<select v-model="fk_user_id" required>
                			<option v-for="user in users" v-bind:value="user.user_id">{{user.user_name}}</option>
                		</select>
                		<input type="submit" value="Submit">
                    <p class="hidden" id="confirmation">Added</p>
                	</form> -->
              	  <form v-on:submit.prevent="onSubmit" id="form"> 
                    <div class="row row1">
                     <div class="col-md-8">             		  
                		  <select class="dropdown" v-model="user_id" required>
                			 <option v-for="user in users" v-bind:value="user.user_id">{{user.user_name}}</option>
                		  </select>
                     </div>
                     <div class="col-md-3"> 
                		  <button class="button" type="submit" value="Submit">Delete</button>
                      </div>
                    </div>           
                  
                    <div class="row row2">
                      <p class="hidden" id="confirmation"><img src="/dist/assets/images/yes.png"  alt="Logo">User deleted successfully.</p>
                      <p class="paragraph">Choose user to delete.</p>
                    </div> 
                </form>       
        </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'delete-user',
  data(){
  	return {
  		user_id: '',
  		users: ''
  	}
  },
  methods: {
  	onSubmit: function(){
  		axios({
  			method: 'delete',
  			url: '/users/delete',
        data: {
          user_id: this.user_id
        }
  		})
  		.then(req => {
  			document.getElementById('confirmation').classList.remove('hidden');
        this.user_id = '';
        this.getData();
  		})
  		.catch(err => {
  			console.log(err);
  		})
  	},
    getData: function(){
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
    }
  },
  beforeMount(){
  	this.getData();
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
.dropdown:focus{
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
    width: 100%;
}

.header{
  border-bottom: 1px solid #ebebeb;
    
}
.paragraph{
    margin-top: 40px;
    color: #afaeb0;
    text-align: center;
    line-height: 1.5;
    margin-left: 3%;
    font-weight: bold;
    font-size: 17px;
}
.row1{
  margin-left: 10%;

}
.button{
    color: #fff;
    background: #4bc800!important;
    border: 0;
    box-shadow: inset 0 -2px 0 #45b900!important;
    padding: 11.5px;
    margin-left: -15px;
    width: 100%;
    margin-top: 14px;

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

