<template>
	<div>
		<h1>Modify Payments</h1>
	</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'modify-payments',
  beforeMount(){
  	axios({
  		method: 'get',
  		url: '/payments'
  	})
  	.then(req => {
  		
  	})
  	.catch(err => {
  		console.log(err);
  	})
  }
};
</script>