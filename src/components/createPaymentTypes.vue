<template>
	<div>
		<h1>Create Payment Types</h1>
		<form v-on:submit.prevent="onSubmit" id="form">
			<input type="text" v-model.trim="payment_type">
			<input type="submit" value="Submit">
			<p class="hidden" id="confirmation">Payment type added</p>
		</form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'create-payment-types',
  props: ['user'],
  data(){
  	return {
  		payment_type: ''
  	}
  },
  methods: {
  	onSubmit: function(){
  		axios({
  			method: 'post',
  			url: '/payments/add',
  			data: {
  				created_by_id: this.user.userID,
  				modified_by_id: this.user.userID,
  				payment_type: this.payment_type
  			}
  		})
  		.then(req => {
  			document.getElementById('confirmation').classList.remove('hidden');
  			this.payment_type = '';
  		})
  		.catch(err => {
  			console.log(err);
  		})
  	}
  }
};
</script>