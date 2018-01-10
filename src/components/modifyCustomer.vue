<template>
	 <div class="mainDiv"> 
    <!-- <h1>Create a Customer</h1> -->
          <div  class="header">
            <ul>
                  <li><a v-on:click="$parent.updateView('create-customer')"  >Add customer</a></li>
                  <li><a v-on:click="$parent.updateView('view-customer')"  >View customer</a></li>
                  <li><a v-on:click="$parent.updateView('modify-customer')" style="color:#4bc800" >Modify customer</a></li>
                </ul>
           </div> 
              <p class="input_heading">Select customer to modify</p>
              <select class="inputField" v-model="customer_id">
                <option v-for="customer in customers" v-bind:value="customer.customer_id">
                  {{customer.customer_name}}
                </option>
              </select>

              <form v-if="selectedRole.customer_id" v-on:submit.prevent="onSubmit">
                <input class="inputField" type="hidden" v-model="selectedRole.customer_id">
                <p class="input_heading">Customer name</p>
                <input class="inputField" type="text" v-model.trim="selectedRole.customer_name" required>
                <button class="button" type="submit" value="Submit">Create</button>
                <p style="text-align:center;" class="hidden input_heading" id="confirmation"><img src="/dist/assets/images/yes.png"  alt="Logo">Customer updated successfully.</p>
              </form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'modify-customer',
  props: ['user'],
  data(){
    return {
      customer_id: '',
      customers: '',
      selectedRole: {}
    }
  },
  methods: {
    onSubmit: function(){
      axios({
        method: 'put',
        url: 'customers/update',
        data: {
          customer_id: this.selectedRole.customer_id,
          customer_name: this.selectedRole.customer_name,
          modified_by_id: this.user.userID
        }
      })
      .then(req => {
        console.log(req);
        document.getElementById('confirmation').classList.remove('hidden');
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  watch: {
    customer_id(id) {
      [this.selectedRole] = this.customers.filter(r => r.customer_id === id);
    }
  },
  beforeMount(){
  	axios({
  		method: 'get',
  		url: '/customers'
  	})
  	.then(req => {
  		this.customers = req.data.customers;
      console.log(this.customers);
  	})
  	.catch(err => {
  		console.log(err);
  	})
  }
};
</script>

<style scoped>
 .mainDiv{
     margin-left: 18%;
     margin-top: 7%;
     margin-right: 7%;
     box-shadow: 0 5px 25px hsla(0,0%,10%,.7);
     background-color: #fff;
     font-size: 16px;
     padding: 40px;

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
    margin-left: 18px;
    
    
   

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