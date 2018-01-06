<template>
	<div>
		<h1>Modify a Customer</h1>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'modify-customer',
  beforeMount(){
  	axios({
  		method: 'get',
  		url: '/customers'
  	})
  	.then(req => {
  		console.log(req.data.customers);
  	})
  	.catch(err => {
  		console.log(err);
  	})
  }
};
</script>