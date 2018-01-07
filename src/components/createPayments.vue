<template>
	<div>
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