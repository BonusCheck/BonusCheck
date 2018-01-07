<template>
	<div>
		<h1>Modify a Customer</h1>
    <p>Select customer to modify</p>
    <select v-model="role_id">
      <option v-for="customer in customers">
        {{customer.customer_name}}
      </option>
    </select>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'modify-customer',
  props: ['user'],
  data(){
    return {
      role_id: '',
      customers: ''
    }
  },
  beforeMount(){
  	axios({
  		method: 'get',
  		url: '/customers'
  	})
  	.then(req => {
  		this.customers = req.data.customers;
  	})
  	.catch(err => {
  		console.log(err);
  	})
  }
};
</script>