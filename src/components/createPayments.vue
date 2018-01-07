<template>
	<div class="mainDiv">
   <div  class="header">
    <ul>
            <li><a v-on:click="$parent.updateView('payment-history')">View Payment History</a></li>
            <li><a v-on:click="$parent.updateView('create-payments')">Create Payments</a></li>
            <li><a v-on:click="$parent.updateView('modify-payments')">Modify Payments</a></li>
            <li><a v-on:click="$parent.updateView('create-payment-types')">Create Payments</a></li>
            <li><a v-on:click="$parent.updateView('modify-payment-types')">Modify Payment Types</a></li>
          </ul>
      </div>    
		<h1>Create a Payment</h1>
		<form v-on:submit.prevent="onSubmit" id="form">
			 
		</form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'create-payments',
  data(){ 
  	return {
		  date_paid: '',
		  scheduled_pay_date: '',
		  payment_amount: '',
		  fk_installer_id: '',
		  fk_payment_type_id: '',
		  fk_job_id: ''
		}
  },
  methods: {
  	onSubmit: function(){
  		axios({
  			method: 'post',
  			url: 'installers/payments/add',
  			data: {

  			}
  		})
  	}
  }
};
</script>
<style scoped>

.mainDiv{
     margin:90px 50px 0 200px;
     box-shadow: 0 5px 25px hsla(0,0%,10%,.7);
     height: 25%;
     background-color: #fff;
     font-size: 16px;
     padding: 20px;

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
      padding: 0 27px;
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
}
</style>