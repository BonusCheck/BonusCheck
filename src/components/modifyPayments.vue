<template>
	<div class="mainDiv">
  <div  class="header">
    <ul>
            <li><a v-on:click="$parent.updateView('create-payment-types')">Create Payments Types</a></li>
            <li><a v-on:click="$parent.updateView('payment-history')">View Payment </a></li>
            
            <li><a v-on:click="$parent.updateView('modify-payments')" style="color:#4bc800">Modify Payments</a></li>
            
            <!-- <li><a v-on:click="$parent.updateView('modify-payment-types')">Modify Payment Types</a></li> -->
          </ul>
      </div>    
		
          <p class="input_heading">Select Payment type to modify</p>
              <select class="inputField" v-model="payment_type_id">
                <option v-for="payment in payments" v-bind:value="payment.payment_type_id">
                  {{payment.payment_type_id}}
                </option>
              </select>

          <form v-if="selectedRole.payment_type_id" v-on:submit.prevent="onSubmit">
                <input class="inputField" type="hidden" v-model="selectedRole.payment_type_id">
                <p class="input_heading">Payment type name</p>
                <input class="inputField" type="text" v-model.trim="selectedRole.payment_type" required>
                <button class="button" type="submit" value="Submit">Update</button>
                <p style="text-align:center;" class="hidden input_heading" id="confirmation"><img src="/dist/assets/images/yes.png"  alt="Logo">Payment type updated successfully.</p>
          </form>


	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'modify-payments',
  props: ['user'],
  data(){
    return {
      payment_type_id: '',
      payments: '',
      selectedRole: {}
    }
  },
  methods: {
    onSubmit: function(){
      axios({
        method: 'put',
        url: 'payment-types/update',
        data: {
          payment_type_id: this.selectedRole.payment_type_id,
          payment_type: this.selectedRole.payment_type,
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
    payment_type_id(id) {
      [this.selectedRole] = this.payments.filter(r => r.payment_type_id === id);
    }
  },
  beforeMount(){
    axios({
      method: 'get',
      url: '/payment-types'
    })
    .then(req => {
      this.payments = req.data.payment_types;
      console.log(this.payments);
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